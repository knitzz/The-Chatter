import React, {useContext, userContext} from 'react'
import useSessionStorage from '../hooks/useSessionStorage'
const UserInfoContext = React.createContext()

export function useUserInfo(){
    return useContext(UserInfoContext)
}

export  function UserInfoProvider({children}) {
    const [value,setter] = useSessionStorage("userInfo")
    const userInfo = value
    const setUserInfo = setter
    return (
        <UserInfoContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserInfoContext.Provider>
    )
}
