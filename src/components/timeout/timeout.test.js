import React from "react";
import TimeOut from "./TimeOut";
import { fireEvent, render, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";



afterEach(cleanup);
jest.useFakeTimers();

    
  test("Should render a message", () => {
   
    const { getByText,getByTestId ,queryByTestId } = render(<TimeOut />);
    const button = getByText("Click to trigger timeout");

    //can not use getByTestId because the component is not in the DOM yet
    expect(queryByTestId ("timeout-message")).toBeNull() 
    fireEvent.click(button);
    expect(getByTestId("timeout-message").textContent).toBe("This will Timeout in 5 seconds");
    expect(setTimeout).toHaveBeenCalledTimes(2);
    // When testing, code that causes React state updates should be wrapped into act(...):
    act(()=>jest.runAllTimers())
    expect(getByTestId("timeout-message").textContent).toBe("Time Out");
  });

 

  test("clicking on button makes it disabled", () => {
    const { getByText } = render(<TimeOut />);
    const button = getByText("Click to trigger timeout");
    fireEvent.click(button);
    expect(button.disabled).toBeTruthy()
  });

