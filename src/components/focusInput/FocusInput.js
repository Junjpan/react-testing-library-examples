import React from 'react';

const FocusInput=()=>{

    const inputRef=React.useRef(null);
    return(
        <div>
            <input type="text" arial-label='focus-input' ref={inputRef} placeholder="Focus"/>
            <button onClick={()=>inputRef.current.focus()} >Click to focus </button>
        </div>
    )
}

export default FocusInput