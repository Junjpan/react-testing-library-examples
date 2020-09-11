import React from 'react';
import ReactDOM from 'react-dom';
import { render} from '@testing-library/react';
import App from './App';



test('testing should be inside the H1 tag ', () => {
  //you also can use queryByTest
  const { getByText } = render(<App  />);
  const linkElement = getByText(/Testing/i);
 
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeTruthy()
});


test('renders without crashing',()=>{
  const div=document.createElement('div');
  ReactDOM.render(<App />,div);
  ReactDOM.unmountComponentAtNode(div)//to test if it unmount the component

})