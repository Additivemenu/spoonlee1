import { fetchData } from "./fetch-data";

it("fetchData calls callback with correct data", (done) => {
  const mockCallback = jest.fn((data) => {
    expect(data).toBe("data");
    done();
  });

  fetchData(mockCallback);

  expect(mockCallback).not.toHaveBeenCalled(); // Not called immediately

  setTimeout(() => {
    expect(mockCallback).toHaveBeenCalled(); // Called after 1 second
  }, 1000);
});
