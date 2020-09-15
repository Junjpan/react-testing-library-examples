import React,{useState,useRef,useEffect} from 'react';
import Button from '../button/button';

const Counter=()=>{

    const [count,setCount]=useState(0);
    const [checked,setChecked]=useState(false);
    const initialTitleRef=useRef(document.title);
   // console.log(initialTitleRef) //{ current: "React App" }
    useEffect(()=>{
        document.title=checked?`Total number of clicks:${count}`:initialTitleRef.current
    })


    return (
        <div>
                <span data-testid="count">Clicked {count} time{count===1?'':'s'}</span>
                <Button label="Add count" sayHello={()=>setCount(count+1)}  />
                <input data-testid="checkbox" type="checkbox" id="checkbox-title" checked={checked} onChange={(e)=>setChecked(e.target.checked)}></input>
                <label htmlFor="checkbox-title">Check to display count in the document title</label>
        </div> 
    )

}

export default Counter