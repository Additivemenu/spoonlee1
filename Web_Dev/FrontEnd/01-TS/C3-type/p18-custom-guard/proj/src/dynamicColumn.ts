const dummyBackendData: Record<string, string[][]> = {
  merge: [
    ["Name", "Age", "Location"],
    ["John", "25", "New York"],
  ],
  union: [
    ["Product", "Price"],
    ["Phone", "$299"],
    ["Laptop", "$999"],
  ],
  textCase: [["Country", "Capital"]],
  regex: [["Name", "Email"]],
};

{
  async function getDynamicColumns(
    node_type: string,
  ): Promise<string[] | string[][]> {
    // Simulate API response delay
    const fetchBackendData = (): Promise<string[][]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulating fetching data from backend based on node_type
          const data = dummyBackendData[node_type] || [];
          resolve(data);
        }, 1000); // Simulating 1 second delay
      });
    };

    const data = await fetchBackendData();

    // If node_type is "merge" or "union", return string[][]
    if (node_type === "merge" || node_type === "union") {
      return data;
    }

    // Otherwise, return string[] (just the first array if available)
    const otherNodesData = data.length > 0 ? data[0] : [];
    return otherNodesData;
  }

  (async () => {
    // use as to assert the type of the result
    const result1 = (await getDynamicColumns("merge")) as string[][]; // Simulates fetching for "merge", returns string[][]
    const result2 = (await getDynamicColumns("union")) as string[][]; // Simulates fetching for "union", returns string[][]
    const result3 = (await getDynamicColumns("regex")) as string[]; // Simulates fetching for "other", returns string[]

    console.log(result1); // Logs the 2D array for "merge"
    console.log(result2); // Logs the 2D array for "union"
    console.log(result3); // Logs the first array for "other"
  })();
}

{
  // functional overloads (or you would need to use `as` to manually assert the type of the result returning from the function):
  function getDynamicColumns(node_type: "merge" | "union"): Promise<string[][]>;
  function getDynamicColumns(node_type: string): Promise<string[]>;

  async function getDynamicColumns(
    node_type: string,
  ): Promise<string[] | string[][]> {
    // Simulate API response delay
    const fetchBackendData = (): Promise<string[][]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulating fetching data from backend based on node_type
          const data = dummyBackendData[node_type] || [];
          resolve(data);
        }, 1000); // Simulating 1 second delay
      });
    };

    const data = await fetchBackendData();

    // If node_type is "merge" or "union", return string[][]
    if (node_type === "merge" || node_type === "union") {
      return data;
    }

    // Otherwise, return string[] (just the first array if available)
    const otherNodesData = data.length > 0 ? data[0] : [];
    return otherNodesData;
  }

  (async () => {
    // use as to assert the type of the result
    const result1 = await getDynamicColumns("merge"); // Simulates fetching for "merge", returns string[][]
    const result2 = await getDynamicColumns("union"); // Simulates fetching for "union", returns string[][]
    const result3 = await getDynamicColumns("regex"); // Simulates fetching for "other", returns string[]

    console.log(result1); // Logs the 2D array for "merge"
    console.log(result2); // Logs the 2D array for "union"
    console.log(result3); // Logs the first array for "other"
  })();
}
