import React from 'react';
import ReactDOM from 'react-dom';
import NameInput from './NameInput';
import {render,fireEvent,cleanup} from '@testing-library/react';

test('Should render without a crash',()=>{
    const div=document.createElement('div');
    ReactDOM.render(<NameInput />,div)
})

test('Should display correct greeting',()=>{
    const {getByLabelText,getByTestId}=render(<NameInput />)
    const input=getByLabelText('nameinput');
    const greeting=getByTestId('change-input-greeting');
    expect(input.placeholder).toBe('Please enter your name');
    expect(input.value).toBe('');
    expect(greeting.textContent).toBe('Welcome, ')
    fireEvent.change(input,{target:{value:"testing"}});
    expect(input.value).toBe('testing');
    expect(greeting.textContent).toBe('Welcome, testing');

})

test('it match the snapshot',()=>{
    const {asFragment}=render(<NameInput />);
    expect(asFragment()).toMatchSnapshot()
})