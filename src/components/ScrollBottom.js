import React, { useRef,useEffect } from 'react'

export default function ScrollBottom() {
    const scrollRef = useRef(null)
    useEffect(() => {
        scrollRef.current.scrollIntoView();
    })
    return (
        <div ref={scrollRef}>
            
        </div>
    )
}
