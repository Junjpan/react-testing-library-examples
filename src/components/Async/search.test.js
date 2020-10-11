import React from 'react';
import Search from './Search';
import { fireEvent,render,screen,act } from '@testing-library/react';

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
        let searchInput=screen.getByRole('textbox');
        let button=screen.getByRole('button');
        fireEvent.click(button);
        expect(document.activeElement).toBe(searchInput)
    })

    test('search value will be updated',()=>{
        let searchInput=screen.getByRole('textbox');
        fireEvent.change(searchInput,{target:{value:"Tom Smith"}})
        expect(screen.queryByText('Search for ...')).toBeNull();
        expect(screen.getByTestId('searchvalue').textContent).toBe('Search for Tom Smith')
    })

    test('user should be "Jack"',async()=>{
        expect(await screen.findByText('User: Jack')).toBeInTheDocument()
    })

})
