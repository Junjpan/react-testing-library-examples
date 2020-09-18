import React from 'react';
import Counter from './Counter';
import { render,fireEvent,cleanup } from '@testing-library/react';



afterEach(cleanup);
test('count start with 0',()=>{

    const {getByTestId}=render(<Counter />);
    expect(getByTestId('count').textContent).toBe('Clicked 0 times');
})

test('count will be added by one for each click',()=>{
   const {getByTestId}=render(<Counter />)

   let button=getByTestId('button')
   fireEvent.click(button);
   expect(getByTestId('count').textContent).toBe('Clicked 1 time');
   fireEvent.click(button);
   expect(getByTestId('count').textContent).toBe('Clicked 2 times');

})

test('window title changes after every increment if checkbox is checked',()=>{
//you also can do global.window.document.title
    document.title="Testing title"
   const {getByTestId}=render(<Counter />);
 
   let button=getByTestId('button');
   let checkbox=getByTestId('checkbox');
   fireEvent.click(button);
   expect(document.title).toBe('Testing title');

   fireEvent.click(checkbox);
   expect(document.title).toBe('Total number of clicks:1');

   fireEvent.click(button);
   expect(document.title).toBe('Total number of clicks:2');

   fireEvent.click(checkbox);
   expect(document.title).toBe('Testing title');
})