import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../button';
import { render, cleanup,fireEvent } from '@testing-library/React';


afterEach(cleanup) 


it('Button Render without crashing',()=>{
const div=document.createElement('div');
ReactDOM.render(<Button />,div) //this render using from ReactDOM
});

it('render button correctly',()=>{
    //using the render from react testing library
 const {getByTestId}=render(<Button label="click" />);
  expect(getByTestId('button')).toHaveTextContent('click')

})

it('calls correct function on click',()=>{
 const Hello=jest.fn();
 const {getByTestId}=render(<Button label="click" sayHello={Hello}/>);
fireEvent.click(getByTestId('button'));
expect(Hello).toHaveBeenCalled()
 

})


it('matches snapshot1',()=>{
    const {asFragment}=render(<Button label="save" />);
    expect(asFragment()).toMatchSnapshot();
})

it('matches snapshot2',()=>{
    const {asFragment}=render(<Button label="Hello" />);
    expect(asFragment()).toMatchSnapshot();
})



