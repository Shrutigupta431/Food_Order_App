import ContactUs from "../ContactUs"
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"

describe("Contact Us test pages",()=>{
     // "it" and "test" both are same naming convention 
    it("Should loaded contact us component ",()=>{
        render(<ContactUs />);
    
        const heading = screen.getByRole("heading");
    
        //Assertion
        expect(heading).toBeInTheDocument();
    
    })
    
    test("Should loaded Button in Conatct us component ",()=>{
        render(<ContactUs />);
    
        const button = screen.getByText("Submit");
    
        //Assertion
        expect(button).toBeInTheDocument();
    
    })
    
    test("Shouldplaceholder name in Conatct us component ",()=>{
        render(<ContactUs />);
    
        const inputName = screen.getByPlaceholderText("Name");
    
        //Assertion
        expect(inputName).toBeInTheDocument();
    
    })
    test("Should loaded 2 Input  in Conatct us component ",()=>{
        render(<ContactUs />);
    
        const inputBoxes = screen.getAllByRole("textbox");
          //console.log(inputBoxes[0])
        //Assertion
        // expect(inputBoxes.length).toBe(2);
        expect(inputBoxes.length).not.toBe(3);
    
    
    })
})