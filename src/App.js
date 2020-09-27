import React from 'react';
import './App.css';
import Button from './components/button/button';
import NameInput from './components/Input/NameInput';
import FocusInput from './components/focusInput/FocusInput';
import Counter from './components/Effects/Counter';
import TimeOut from './components/timeout/TimeOut';
import Fetch from './components/fetch API/Fetch';
import MultipleFetches from './components/multipleFetch/multipleFetches'

function App() {
  const sayHello=()=>{
    console.log('hello')
  }
  return (
    <div className="App">
      <header className="App-header">

        <h1>Testing</h1>
       <NameInput />
       <FocusInput />
       <Counter />
       <Button label='Click' sayHello={sayHello}></Button>
       <hr/>
       <Fetch />
       <TimeOut />
       <MultipleFetches />
       </header>

    </div>
  );
}

export default App;
