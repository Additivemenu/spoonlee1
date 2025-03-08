// Simulated API that returns different data each time
const simulatedAPI = (() => {
  const responses = [
    "Breaking news: Stock market reaches all-time high.",
    "Weather update: Sunny with a high of 75°F expected today.",
    "Traffic alert: Construction on Main Street causing delays.",
    "Sports update: Local team wins championship game 3-2.",
    "Tech news: New smartphone model announced for next quarter.",
    "Health alert: Flu season approaching, get vaccinated soon.",
    "Entertainment: Award-winning movie released this weekend.",
    "Business: New startup receives $10M in funding.",
    "Science: Researchers discover new species in Amazon rainforest.",
  ];

  let index = 0;

  // Simulate an API call that returns different data each time
  return async function fetchData() {
    // Simulate network delay (200-500ms)
    await new Promise((resolve) =>
      setTimeout(resolve, 200 + Math.random() * 300),
    );

    // Get next response and increment index
    const response = responses[index];
    index = (index + 1) % responses.length;

    return response;
  };
})();
