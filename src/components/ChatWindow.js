import React, { useEffect, useState,useRef } from 'react'
import { Button, Form  } from 'react-bootstrap'
import {useUserInfo} from '../contexts/UserInfoProvider'
import {socket} from '../socket'
import '../css/chatWindow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt,faSync,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import ScrollBottom from './ScrollBottom'
export default function ChatWindow() {
     const {userInfo} = useUserInfo()
     const [isChat,setIsChat] = useState(false)
     const [iswait,setIsWait] = useState(false)
     const [statusMessage,setStatusMessage] = useState("")
     const [messageList,setMessageList] = useState([])
     const message =  useRef("")
     const registerUser = () => {
          socket.emit('registerUser',userInfo)
     } 
    useEffect(()=>{

         socket.on('connection',()=>{
              console.log("connected to server")
         })

         socket.on('createChat',(resp)=>{
              console.log(resp);
              if(resp.code == 201) {
                    setIsWait(true)
                   setStatusMessage("Please wait you are in the queue")
              }
              else{
                   setIsChat(true)
                   setStatusMessage("you are talking to "+resp.userName)
              }
         })

        socket.on('chat', (resp)=>{
             if(resp.code==202){
               setMessageList(prev=>[...prev,[1,resp.message]])
               console.log("list ",messageList)
          }
             else{
                    setIsWait(false)
                  setIsChat(false);
                  setStatusMessage("userLeft")
             }
        })

        registerUser()

        return ()=>disconnect()
    },[])


     const createChat = () => {
          console.log("trying")
          setIsWait(true)
     setMessageList([])
     socket.emit('createChat')     
     }


     const sendMessage = (e) => {
          e.preventDefault()
          console.log("here sending..",message.current.value)
          const m = message.current.value;
          setMessageList(prev=>{
              return [...prev,[0,m]]
          })
          socket.emit('chat',message.current.value)
          message.current.value = ""
          console.log("list ",messageList)
     }


     const endChat = () =>{
          socket.emit('endChat')
          setIsWait(false)
          setIsChat(false)
          setStatusMessage("You Left")
     }


     const disconnect = () =>{
          socket.disconnect()
     }
    return (
        <div className='chatBox'>

          {isChat?
               <div className="chatHeader">
                    <span className="statusText">{statusMessage}</span>
                    <Button className="leave" onClick={()=>endChat()}><FontAwesomeIcon icon={faSignOutAlt} />Leave Chat</Button>
               </div>:
               <div className="chatHeader">
                    <Button onClick={createChat} id="searchButton">
                         <span className="searchHover"><FontAwesomeIcon icon={faSyncAlt} /> </span>
                         <span className="search"><FontAwesomeIcon icon={faSync} /> </span>
                         New Chat
                    </Button>
               </div>
          }
           <div className="messages">
                     {messageList.map((ele,i)=>{
                          if(ele[0] == 0)
                              return <div className="messageText you" key={i}>{ele[1]}</div>
                         else 
                         return <div className="messageText other" key={i}>{ele[1]}</div> 
                     })}
                     <ScrollBottom/>
                    {!isChat?<span className="leave">{statusMessage}</span>:<></>}
          </div>
          <div className="messageBox">
          <Form onSubmit={sendMessage}>
          <Form.Group controlId="formBasicMessage">
               <Form.Control ref={message} type="text" placeholder="Enter your message" />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!isChat || message==""}>Send</Button>
          </Form>
          </div>
           
        </div>
    )
}
