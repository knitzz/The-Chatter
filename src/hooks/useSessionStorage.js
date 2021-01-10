import {useEffect,useState} from 'react';

const PREFIX = "THE-CHATTER"
export default function useSessionStroage (key,valueExtractor) {
    const prefixKey = PREFIX + key 
    const [value,setValue] = useState(()=>{
        const jsonValue = sessionStorage.getItem(prefixKey)
        if(jsonValue != null) {
            return JSON.parse(jsonValue)
        }
        if(typeof valueExtractor == 'function')
            return valueExtractor()
        else 
            return valueExtractor;
    })

    const setter = (val) => {
        setValue(val)
        sessionStorage.setItem(prefixKey,JSON.stringify(val))
    }
    return [value,setter];
}