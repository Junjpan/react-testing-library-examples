import React from 'react';
import { fireEvent,render,cleanup,wait } from '@testing-library/react';
import MultipleFetches from './multipleFetches';




afterEach(cleanup);

test('Start without any posts',()=>{
    const {queryByTestId}=render(<MultipleFetches />);
    expect(queryByTestId('fetch-post')).toBeNull();
})

test('after clicking on the button, displays loading message',()=>{
    const {getByTestId,getByText}=render(<MultipleFetches />);
    fireEvent.click(getByText('Fetch post and comments'));
    expect(getByTestId('fetch-loading-post').textContent).toBe('Loading post...');
})

describe('API test',()=>{
    afterEach(()=>{global.fetch.mockClear()});

    test('display post if API success',async ()=>{
        //mock api,mockImplementationOnce to have more control over mulitple API calls
        jest.spyOn(global,'fetch')
            .mockImplementationOnce(()=>Promise.resolve({
                status:200,
                json:()=>Promise.resolve({
                    title:"Testing"
                })
            }))
            .mockImplementationOnce(()=>Promise.resolve({
                status:200,
                json:()=>Promise.resolve([
                    {id:1,name:"June"},
                    {id:2,name:"Mary"}
                ])
            }));

        const {getByTestId,getByText,getAllByTestId}=render(<MultipleFetches />);
        fireEvent.click(getByText('Fetch post and comments'));
        await wait();
        expect(getByTestId('fetch-post').textContent).toBe("Testing");

        /**
         *  [
        [ 'https://jsonplaceholder.typicode.com/posts/1', { method: 'GET' } ],
        [
          'https://jsonplaceholder.typicode.com/posts/1/comments',
          { method: 'GET' }
        ]
      ]
         */
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch.mock.calls[0][0]).toBe('https://jsonplaceholder.typicode.com/posts/1');
        expect(global.fetch.mock.calls[1][0]).toBe('https://jsonplaceholder.typicode.com/posts/1/comments')
        expect(getByText('All Fetched!')).toBeTruthy();
        let authors=getAllByTestId('comment-author');
        expect(authors[0].textContent).toBe("June");
        expect(authors[1].textContent).toBe('Mary');

    });

    test('Display comments error if API fails',async()=>{
        jest.spyOn(global,'fetch')
            .mockImplementationOnce(()=>Promise.resolve({
                status:200,
                json:()=>{return ({
                    title:"Testing"
                })
            }}))
            .mockImplementationOnce(()=>Promise.resolve({
                status:500
            }))
        
    const {getByTestId,getByText,queryByText}=render(<MultipleFetches />);
    fireEvent.click(getByText('Fetch post and comments'))
    await wait();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toBe('https://jsonplaceholder.typicode.com/posts/1');
   expect(global.fetch.mock.calls[1][0]).toBe('https://jsonplaceholder.typicode.com/posts/1/comments')
    expect(getByTestId('fetch-post').textContent).toBe('Testing');
    expect(getByTestId('fetch-error-comments').textContent).toBe('Failed to Fetch');
    expect(queryByText('All Fetched!')).toBeNull();
    });

    test('displays post error if API failes',async()=>{
        jest.spyOn(global,'fetch')
            .mockImplementation(()=>{
              return ({
                    status:500
     })});
    
            const {getByTestId,getByText,queryByText}=render(<MultipleFetches />);
            fireEvent.click(getByText('Fetch post and comments'));
            await wait(); //await wait(()=>getByTestId('fetch-error-post)) also work
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(getByTestId('fetch-error-post').textContent).toBe('Failed to Fetch');
            expect(global.fetch.mock.calls[0][0]).toBe('https://jsonplaceholder.typicode.com/posts/1')
            expect(queryByText('All fetched!')).toBeFalsy()
    
        })

})