import Form from './Form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it("it should render the form", () => {
    //1. Arrange
    render(<Form />);

    //2. Act
    const form = screen.getByRole("form")
    //name attribute of the form tag 

    //3. Assert
    expect(form).toBeInTheDocument();
})

it("it should render the basic input fields", () => {

    //1.Arrange
    render(<Form />);

    //2. Act
    //getBy
    const nameInput = screen.getByRole("textbox", { name: /name/i })
    //getting it from lable "Name"
    //accesible name, that will be always name:
    const emailInput = screen.getByPlaceholderText(/e.g. test@test.com/i);


    //3.Expect
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeTruthy();

    //getAllBy...
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => {
        expect(input).toBeInTheDocument();
    })

})




//queryBy - if it does not find the element, it returns queryBy
it("should not render error message on load", () => {
    render(<Form />)
    const errorMessage = screen.queryByText(/Sorry something went wrong/i);
    expect(errorMessage).toBeFalsy();
    expect(errorMessage).not.toBeInTheDocument();

})

it("should not show the success message on page load", () => {
    render(<Form />)
    const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i);
    expect(successMessage).toBeFalsy();
})

it("should not submit the form with invalid fields", () => {
    //Arrange
    render(<Form />);
    // const inputs = screen.getAllByRole("textbox");
    // inputs.forEach(input => {
    //     expect(input).toBeInTheDocument();
    // })


    //Act
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    userEvent.type(nameInput,"");

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    userEvent.type(emailInput,"notValidEmail");

    const buttonInput = screen.getByRole("button", { name: /sign in/i });
    userEvent.click(buttonInput);


    //Assert
    //expect the error text to be displayed
    //expect success text not to be displayed

    const errorMessage = screen.queryByText(/Sorry something went wrong/i);
    expect(errorMessage).toBeInTheDocument();

    const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i);
    expect(successMessage).not.toBeInTheDocument();
    
    
})

//FindBy


