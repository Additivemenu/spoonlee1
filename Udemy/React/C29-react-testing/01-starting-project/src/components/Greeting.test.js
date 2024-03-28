import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("test suite: Greeting Component", () => {
  test("renders Hello World as a text", () => {
    // Arrange: set up the test data, test conditions, and test env
    render(<Greeting />);

    // Act: run logic that should be tested (e.g. execute function that should be tested)
    // Nothing to do here

    // Assert compare the actual result to the expected result
    const helloWorldElement = screen.getByText("Hello, World"); // exact: false to match partial text
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see you" if the button was NOT clicked', () => {
    // arrange
    render(<Greeting />);

    // act

    // assert
    const paragraphElement = screen.getByText("It's good to see you!", {
      exact: false,
    });
    expect(paragraphElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    // arrange
    render(<Greeting />);

    // act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // assert
    const paragraphElement = screen.getByText("Changed!");
    expect(paragraphElement).toBeInTheDocument();
  });


  test('does not render good to see you text if the button is clicked', ()=>{
        // arrange
        render(<Greeting />);

        // act
        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement);
    
        // assert
        const paragraphElement = screen.queryByText("good to see you", {exact: false});
        expect(paragraphElement).toBeNull();
  })

});
