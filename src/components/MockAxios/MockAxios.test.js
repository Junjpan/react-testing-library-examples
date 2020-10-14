import React from "react";
import { userEvent } from "@testing-library/user-event";
import { render, screen ,fireEvent, act} from "@testing-library/react";
import MockAxios from "./MockAxios";
import axios from 'axios'

jest.mock("axios");//make sure jest.mock is in the same scope with import


describe("MockAxios component", () => {
  beforeEach(() => {
    render(<MockAxios />);
  });
  

  test("should render without a crash ", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should displays stories after successfully fetching", async () => {
   
    const stories = [
      {
        objectID: "1",
        title: "react1",
      },
      { objectID: "2", title: "react2" },
    ];

   
    axios.get.mockImplementationOnce(()=>Promise.resolve({data:{hits:stories}}));
    fireEvent.click(screen.getByRole('button'));

    const items=await screen.findAllByRole('listitem');
    //this show you how to await a promise in a more explicity way, act always return either undefined or promise
    await act(()=>Promise.resolve({data:{hits:stories}}));
    expect(items).toHaveLength(2)

  });

  test('fetches stories from an API and fails',async()=>{
    axios.get.mockImplementationOnce(()=>Promise.reject(new Error()));

    fireEvent.click(screen.getByRole('button'));
    const error= await screen.findByText('Something went wrong...');
    expect(error).toBeInTheDocument()
  })
});
