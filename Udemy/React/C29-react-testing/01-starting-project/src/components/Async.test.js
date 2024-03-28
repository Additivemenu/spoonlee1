import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async Component", () => {
  test("renders posts if request succeed", async () => {
    //!  mock the fetch function
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First Post" }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");       // ! should not use getAllByRole as it instantly look at DOM
    expect(listItemElements).not.toHaveLength(0);
  });
});
