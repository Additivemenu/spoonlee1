// InputComponent.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputComponent from "./InputComponent";

describe("InputComponent", () => {
  it("1: should allow entering text in the input field", () => {
    // arrange
    render(<InputComponent />);
    // act
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    // assert
    expect(input.value).toBe("Hello");
  });

  it("2: should submit the form with the input value", () => {
    // arrange
    const onSubmit = jest.fn();
    render(<InputComponent onSubmit={onSubmit} />);

    // act
    const input = screen.getByPlaceholderText("Enter text");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(submitButton);

    // assert
    expect(onSubmit).toHaveBeenCalledWith({ example: "Hello" });
  });
});
