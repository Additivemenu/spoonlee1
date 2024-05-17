import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FetchForm from "./FetchForm";
import "@testing-library/jest-dom";

// Mocking fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Success" }),
  })
) as jest.Mock;

// ! test suite for the form component
describe("FetchForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ! 1.
  it("submits the form data correctly", async () => {
    render(<FetchForm />);

    await userEvent.type(screen.getByLabelText(/Name:/), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/Email:/), "jane@example.com");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Ensure the fetch API is called correctly
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "Jane Doe", email: "jane@example.com" }),
      });
    });
  });

  // ! 2.
  it("displays error messages if fields are submitted empty", async () => {
    render(<FetchForm />);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText("Name field is required")
    ).toBeInTheDocument();
    
    expect(
      await screen.findByText("Email field is required")
    ).toBeInTheDocument();
  });
});
