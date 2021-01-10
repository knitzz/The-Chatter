import React, {useRef} from 'react'
import {v4 as uuidv4} from 'uuid'
import '../css/login.scss'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import {useUserInfo} from '../contexts/UserInfoProvider'
export default function Login() {
    const {userInfo} = useUserInfo()
    const {setUserInfo} = useUserInfo()
    const onSubmit = () => {
       setUserInfo({"id":uuidv4(),"name":nameRef.current.value})
    }
    const nameRef = useRef("");
    return (
        <div className='login'>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>Type a Friendly Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl ref={nameRef}/>
            </InputGroup>
            <div id='button'>
                <Button  onClick = {onSubmit} variant="primary">Let's Chat</Button>
            </div>
        </div>
    )
}
