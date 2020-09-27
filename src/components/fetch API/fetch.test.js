import React from "react";
import Fetch from "./Fetch";
import {
  fireEvent,
  render,
  wait,
} from "@testing-library/react";

test("starts without any joke", () => {
  const { queryByTestId } = render(<Fetch />);
  const div = queryByTestId("fetch-joke");
  expect(div).toBeNull();
});

test("when clicking on button, display loading message", () => {
  const { getByText, getByTestId } = render(<Fetch />);
  const button = getByText("Get a Chuck Norris joke");
  fireEvent.click(button);
  const loadingDiv = getByTestId("fetch-loading");
  expect(loadingDiv.textContent).toBe("Loading...");
});

test("when clicking on button display joke if API success", async () => {
  // jest.setTimeout(10000)
  //mock API
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () =>
       Promise.resolve({
          value: "Chuck Norris counted to infinity",
        }),
    })
  );

  const { getByTestId, getByText } = render(<Fetch />);
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  await wait(() => getByTestId("fetch-joke")); //you can use await waitForElement or await wait() as well
  expect(getByTestId("fetch-joke").textContent).toBe(
    "Chuck Norris counted to infinity"
  );
  console.log(global.fetch.mock.calls);
  //[
  //  [ 'https://api.chucknorris.io/jokes/random', { method: 'GET' } ],
  //]
  
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch.mock.calls[0][0]).toBe('https://api.chucknorris.io/jokes/random')

  //global.fetch.mockClear() //clear mock after test

});

test('After clicking on button,display an error if API failes',async()=>{
  jest.spyOn(global,'fetch')
      .mockImplementation(()=>Promise.resolve({
        status:500
      }));

 const {getByTestId,getByText}=render(<Fetch />);  
 fireEvent.click(getByText("Get a Chuck Norris joke")) ;
 await wait(() => getByTestId("fetch-error"));
 expect(getByTestId('fetch-error').textContent).toBe("Failed to Fetch");
 
 expect(global.fetch).toHaveBeenCalledTimes(2); // because the test above's glbal.fetch.mockClear() has never been called
  expect(global.fetch.mock.calls[0][0]).toBe('https://api.chucknorris.io/jokes/random');

  global.fetch.mockClear();
})



