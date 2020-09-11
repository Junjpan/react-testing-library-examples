import React from 'react';
import './App.css';
import Button from './components/button/button';

function App() {
  const sayHello=()=>{
    console.log('hello')
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing</h1>
       <Button label='Click' sayHello={sayHello}></Button>
      </header>
    </div>
  );
}

export default App;
