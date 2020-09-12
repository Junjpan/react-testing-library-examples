import React from 'react';
import './App.css';
import Button from './components/button/button';
import NameInput from './components/Input/NameInput';

function App() {
  const sayHello=()=>{
    console.log('hello')
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing</h1>
       <NameInput />
       <Button label='Click' sayHello={sayHello}></Button>
      </header>
    </div>
  );
}

export default App;
