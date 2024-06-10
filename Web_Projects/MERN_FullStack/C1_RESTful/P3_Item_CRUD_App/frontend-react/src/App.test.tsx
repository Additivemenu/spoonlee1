// src/App.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { Item } from "./interface/Items";
import {
  createItem,
  deleteItem,
  fetchItemList,
  updateItem,
} from "./utils/http";

// Mock the HTTP functions
jest.mock("./utils/http");

const mockFetchItemList = fetchItemList as jest.MockedFunction<
  typeof fetchItemList
>;
const mockCreateItem = createItem as jest.MockedFunction<typeof createItem>;
const mockDeleteItem = deleteItem as jest.MockedFunction<typeof deleteItem>;
const mockUpdateItem = updateItem as jest.MockedFunction<typeof updateItem>;

// describe("App Component", () => {
//   beforeEach(() => {
//     // Clear all mocks before each test
//     jest.clearAllMocks();
//   });

//   test("renders item list and allows creating a new item", async () => {
//     const mockItems: Item[] = [
//       { id: "1", title: "Item 1", description: "Description 1" },
//       { id: "2", title: "Item 2", description: "Description 2" },
//     ];
//     mockFetchItemList.mockResolvedValueOnce({ data: mockItems });

//     render(<App />);

//     // Verify initial items are rendered
//     expect(await screen.findByText("Item 1")).toBeInTheDocument();
//     expect(screen.getByText("Item 2")).toBeInTheDocument();

//     // Fill out the form to create a new item
//     userEvent.type(screen.getByLabelText(/title/i), "New Item");
//     userEvent.type(screen.getByLabelText(/description/i), "New Description");
//     userEvent.click(screen.getByText(/create/i));

//     const newItem: Item = {
//       id: "3",
//       title: "New Item",
//       description: "New Description",
//     };
//     mockCreateItem.mockResolvedValueOnce({ data: newItem });

//     // Wait for the new item to be added to the list
//     await waitFor(() =>
//       expect(screen.getByText("New Item")).toBeInTheDocument()
//     );
//     expect(screen.getByText("New Description")).toBeInTheDocument();
//   });

//   test("allows deleting an item", async () => {
//     const mockItems: Item[] = [
//       { id: "1", title: "Item 1", description: "Description 1" },
//       { id: "2", title: "Item 2", description: "Description 2" },
//     ];
//     mockFetchItemList.mockResolvedValueOnce({ data: mockItems });

//     render(<App />);

//     // Verify initial items are rendered
//     expect(await screen.findByText("Item 1")).toBeInTheDocument();
//     expect(screen.getByText("Item 2")).toBeInTheDocument();

//     // Mock delete item
//     mockDeleteItem.mockResolvedValueOnce({});

//     // Delete the first item
//     userEvent.click(screen.getAllByText(/delete me/i)[0]);

//     // Wait for the item to be removed from the list
//     await waitFor(() =>
//       expect(screen.queryByText("Item 1")).not.toBeInTheDocument()
//     );
//     expect(screen.getByText("Item 2")).toBeInTheDocument();
//   });

//   test("allows updating an item", async () => {
//     const mockItems: Item[] = [
//       { id: "1", title: "Item 1", description: "Description 1" },
//       { id: "2", title: "Item 2", description: "Description 2" },
//     ];
//     mockFetchItemList.mockResolvedValueOnce({ data: mockItems });

//     render(<App />);

//     // Verify initial items are rendered
//     expect(await screen.findByText("Item 1")).toBeInTheDocument();
//     expect(screen.getByText("Item 2")).toBeInTheDocument();

//     // Mock prompt return values
//     window.prompt = jest
//       .fn()
//       .mockReturnValueOnce("Updated Title")
//       .mockReturnValueOnce("Updated Description");

//     // Mock update item
//     const updatedItem: Item = {
//       id: "1",
//       title: "Updated Title",
//       description: "Updated Description",
//     };
//     mockUpdateItem.mockResolvedValueOnce({ data: updatedItem });

//     // Update the first item
//     userEvent.click(screen.getAllByText(/update me/i)[0]);

//     // Wait for the item to be updated
//     await waitFor(() =>
//       expect(screen.getByText("Updated Title")).toBeInTheDocument()
//     );
//     expect(screen.getByText("Updated Description")).toBeInTheDocument();
//   });
// });
