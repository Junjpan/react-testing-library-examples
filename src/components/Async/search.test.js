import React from 'react';
import Search from './Search';
import { fireEvent,render,screen,act, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('Search component',()=>{
    beforeEach(()=>{
        render(<Search />);
       })
 
    test('should render h1b',()=>{    
        expect(screen.getByText(/Search a User/)).toBeInTheDocument();
    })

    test('should show Search for ... if there are no value is enter',()=>{
        expect(screen.getByText(/Search for .../)).toBeInTheDocument()
    })

    test('render button correctly',()=>{
        expect(screen.getByRole('button').textContent).toBe('Search')
    })

    test('input is focus after butter is clicked',()=>{
        let searchInput=screen.getAllByRole('textbox')[0];
        let button=screen.getByRole('button');
        fireEvent.click(button);
        expect(document.activeElement).toBe(searchInput)
    })

    test('search value will be updated',async ()=>{
        let searchInput=screen.getAllByRole('textbox')[0];
        await fireEvent.change(searchInput,{target:{value:"Tom Smith"}})
        expect(screen.queryByText('Search for ...')).toBeNull();
        expect(screen.getByTestId('searchvalue').textContent).toBe('Search for Tom Smith')
        //we use userEvent as replacement for fireEvent.change here.because the userEvent API mimics the actual
        //browser behavior more closely than the fireEvent API.fireEvent.change() triggers only a change event whereas
        //userEvent.type triggers a change event,but also keyDown,keyPress and keyUp events.
        await userEvent.type(searchInput,"Javascript");
        expect(screen.getByText('Search for Javascript')).toBeInTheDocument()
    })

    test('user should be "Jack"',async()=>{
        expect(await screen.findByText('User: Jack')).toBeInTheDocument()
    })

})

//integration testing
test('Calls the onChange callback handler',()=>{
    const changeValue=jest.fn();
  
    const {getByTestId,getByLabelText}=render(<SearchInput value="" onChange={changeValue}>Testing Search:</SearchInput>);
    fireEvent.change(getByTestId('search'),{target:{value:"SAP"}});
    expect(changeValue).toHaveBeenCalledTimes(1);
    expect(getByLabelText('Testing Search:')).toBeInTheDocument()
    userEvent.type(getByTestId('search'),"Hi!");
    //userEvent trigger the changeValue function for every key stroke.
    expect(changeValue).toHaveBeenCalledTimes(4);
})
