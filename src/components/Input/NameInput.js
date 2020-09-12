import React, { useState } from "react";
import "./nameinput.css";

const NameInput = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <span data-testid='change-input-greeting'>
        Welcome, {name}
      </span>
      <br/>
      <input
        type='text'
        className='input'
        placeholder='Please enter your name'
        aria-label='nameinput'
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
    </div>
  );
};

export default NameInput;
