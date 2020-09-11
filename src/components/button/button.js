import React from 'react';
import './button.css';

function Button({label,sayHello}){
   
    return <div data-testid='button' className="button-style" onClick={sayHello}>{label}</div>
}

export default Button