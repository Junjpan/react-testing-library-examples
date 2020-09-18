import React, { useState } from "react";
import TimeOutMessage from './TimeOutMessage';

const TimeOut = () => {
  const [click, setClick] = useState(false);

  return (
    <div>
      <button  disabled={click} onClick={() => setClick(true)}>
        Click to trigger timeout
      </button>
      {click&&<TimeOutMessage />}
    </div>
  );
};

export default TimeOut
