import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";

import { RecipeForm } from "./RecipeForm";
import { fetchData } from "./fetch-data";
import { Recipe } from "./types";

// setup userEvent
function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent,
    ...render(jsx),
  };
}

it("should render the basic fields", () => {
  const mockSave = jest.fn();
  render(<RecipeForm saveData={mockSave} />);

  // ! note we are mostly using getByRole queries here
  expect(
    screen.getByRole("heading", { name: "New recipe" })
  ).toBeInTheDocument();

  expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();

  expect(
    screen.getByRole("textbox", { name: /description/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("spinbutton", { name: /servings/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /add ingredient/i })
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
});

it("should validate form fields", async () => {
  // arrange
  const mockSave = jest.fn();
  const { user } = setup(<RecipeForm saveData={mockSave} />);

  // act & assert
  await user.type(
    screen.getByRole("textbox", { name: /description/i }),
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );
  await user.type(screen.getByRole("spinbutton", { name: /servings/i }), "110");

  await user.click(screen.getByRole("button", { name: /save/i }));

  // ! note we use findAllByRole queries here, because alert takes time to appear
  expect(await screen.findAllByRole("alert")).toHaveLength(3);
  expect(mockSave).not.toBeCalled();
});

it("should handle ingredient fields adding and removing", async () => {
  const { user } = setup(<RecipeForm saveData={jest.fn()} />);
  const addButton = screen.getByRole("button", { name: /add ingredient/i });

  await user.click(addButton);
  // Ingredient name + recipe name
  expect(screen.getAllByRole("textbox", { name: /name/i })).toHaveLength(2);
  expect(screen.getAllByRole("textbox", { name: /amount/i })).toHaveLength(1);

  await user.click(addButton);
  expect(screen.getAllByRole("textbox", { name: /name/i })).toHaveLength(3);
  expect(screen.getAllByRole("textbox", { name: /amount/i })).toHaveLength(2);

  await user.click(
    screen.getByRole("button", { name: /remove ingredient 1/i })
  );
  // Recipe name and ingredient name fields
  expect(screen.getAllByRole("textbox", { name: /name/i })).toHaveLength(2);
  expect(screen.getAllByRole("textbox", { name: /amount/i })).toHaveLength(1);
});

it("should submit correct form data", async () => {
  // arrange -----------------------
  const mockSave = jest.fn();
  const { user } = setup(<RecipeForm saveData={mockSave} />);

  // act & assert ------------------
  // Enter recipe name
  await user.type(
    screen.getByRole("textbox", { name: /name/i }),
    "Test recipe"
  );
  // Enter recipe description
  await user.type(
    screen.getByRole("textbox", { name: /description/i }),
    "Delicious recipe"
  );
  // Specify the number of servings
  await user.type(screen.getByRole("spinbutton", { name: /servings/i }), "4");
  // Add an ingredient
  await user.click(screen.getByRole("button", { name: /add ingredient/i }));
  // Provide the ingredient's name
  await user.type(
    screen.getAllByRole("textbox", { name: /name/i })[1],
    "Flour"
  );
  // Specify the ingredient's amount
  await user.type(screen.getByRole("textbox", { name: /amount/i }), "100 gr");
  // Save the form
  await user.click(screen.getByRole("button", { name: /save/i }));

  // Assert the form data
  // setTimeout or waitFor, because the saveData function is called asynchronously
  await waitFor(() => {
    expect(mockSave).toHaveBeenCalledWith({
      name: "Test recipe",
      description: "Delicious recipe",
      amount: 4,
      ingredients: [{ name: "Flour", amount: "100 gr" }],
    });
  });
});
