import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AxiosForm from "./AxiosForm";
import "@testing-library/jest-dom";
import axios from "axios";

// !Mocking Axios, but there is a problem with importing axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("FormComponent", () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ data: { message: "Success" } });
  });

  // 
  // ! 1.
  it("submits the form data correctly", async () => {
    render(<AxiosForm />);
    await userEvent.type(screen.getByLabelText(/Name:/), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/Email:/), "jane@example.com");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Ensure Axios is called correctly
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://api.example.com/submit",
        {
          name: "Jane Doe",
          email: "jane@example.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
  });

  // ! 2.
  it("displays error messages if fields are submitted empty", async () => {
    render(<AxiosForm />);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText("Name field is required")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Email field is required")
    ).toBeInTheDocument();
  });
});
