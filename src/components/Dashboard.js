import React,{useState} from 'react'
import {useUserInfo} from '../contexts/UserInfoProvider'
import {Button} from 'react-bootstrap'
import ChatWindow from './ChatWindow'
import '../css/Dashboard.scss'
import { faSignOutAlt, faSync } from '@fortawesome/free-solid-svg-icons'
import { SocketProvider } from '../contexts/SocketProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Dashboard() {
    const {userInfo} = useUserInfo()
    const [isChat,setIsChat] = useState(false)
    return (
        <div className="Dashboard">
            <div className={isChat?"exitButton":"chatButton"}>
            <Button onClick={()=>{
                setIsChat(!isChat)}}> 
            {isChat?<FontAwesomeIcon icon={faSignOutAlt}/>:<></>}
            {isChat?"Exit":"Chat now"}
            </Button>
            </div>
            {
               isChat?
               <ChatWindow/>:
               <div className="welcomeText">
                    Welcome to The Chatter {userInfo.name} 
                </div>
            }
        </div>
    )
}
