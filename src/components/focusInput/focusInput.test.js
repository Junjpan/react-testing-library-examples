import React from 'react';
import FocusInput from './FocusInput';
import {render,fireEvent,cleanup} from '@testing-library/react';

test('FocusInput match snapshop',()=>{
    const {container}=render(<FocusInput />);
    expect(container.firstChild).toMatchSnapshot()
})

test('Clicking on button trigger focus on input',()=>{
    const {getByPlaceholderText,getByText}=render(<FocusInput />);
    const button=getByText('Click to focus');
    const focusInput=getByPlaceholderText('Focus');
    fireEvent.click(button);
    expect(document.activeElement).toBe(focusInput);
})