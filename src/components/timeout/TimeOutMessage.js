import React,{useState,useEffect} from 'react';

export default function TimeOutMessage(){
    const [message,setMessage]=useState('This will Timeout in 5 seconds');

    useEffect(()=>{
        console.log('hello')
        setTimeout(()=>{
            setMessage('Time Out')
        },5000)
    },[])

    return <p data-testid='timeout-message'>{message}</p>
}