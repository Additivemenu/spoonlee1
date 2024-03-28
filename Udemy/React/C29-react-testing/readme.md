1



Automate React testing 







# Key takeaways

we use Jest, react-test-lib to do unit testing on react component, very similar to the unit testing in backend

+ these testing lib are provided by `create-react-app` out of box



# 1. Intro

P535-537



Why automate react testing?

+ Given a use case: when you add a new feature into your application, it may introduce bugs within other parts of your app, while manual testing cannot guanrantee early detection of these kinds of bugs 
+ But Manual testing is still and always important! Automating testing doesn't mean we reject manual testing



types of testing

unit tests

+ test the individual building blocks (functions, components) in isolation
+ Project typically contains dozens or hundreds of unit tests
+ the most common/important test



integration test

+ test the combination of multiple building tests
+ project typically contain a couple of integration tests
+ Also important, but focus on unit tests in most cases



End-to-End(E2E) test

+ test complete scenarios / user flows in your app, just like manual testing
+ project typically contain only a few E2E tests
+ important but can be done manually (partially)



what to test & how to test

unit test: the smallest building blocks that make up your app

test success and error cases, also test rare (but possible) resu;ts



Tech setup

we need a tool for running our tests and asserting the resutls

+ e.g. Jest 

we also need a tool for 'simulating' (rendering) our React app / components

+ React Testing Lib

these libs are provided by `create react app` out of box





# 2. Hands-on

在脚手架里: 

App.test.js 

```ts
import { render, screen } from '@testing-library/react';
import App from './App';


// contains testing logic
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);   // regex to match case insensitive
  expect(linkElement).toBeInTheDocument();
});
```





given App.js

```ts
import "./App.css";
import Greeting from "./components/Greeting";

function App() {
  return (
    <div className="App">
      <Greeting />
    </div>
  );
}

export default App;
```

a dummy component: 

```ts
import React, { useState } from "react";

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h2>Hello, World</h2>
      {!changedText && <p>It's good to see you!</p>}
      {changedText && <p>Changed!</p>}
      <button onClick={changeTextHandler}>Change Text</button>
    </div>
  );
};

export default Greeting;

```





## Test Suite & Testing User Interaction & State

+ use `describe()` to group tests together

```ts
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
```



Testing Connected Components

P543

if the componnet A under test has nested other components B, 

+ if that nested component B is quite simple, we can still just do unit test on component A
+ if that nested component B is becoming more complex, we need to have a seperate unit test on component B









## Testing Astnchonous code

P544

Async.js

```ts
import { useEffect, useState } from 'react';

const Async = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Async;
```

Async.test.js

```ts
import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async Component", () => {
  test("renders posts if request succeed", async () => {
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");       // ! should not use getAllByRole as it instantly look at DOM
    expect(listItemElements).not.toHaveLength(0);
  });
});
```





### Working with Mocks

P545

with the same Async component, if we really run the fetch method to make http request, this could lead to network traffic and even issue changes to the assets in database.  It is better that if we could mock the api calling: 

```ts
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
```









# 3​.​ :bangbang: ​Dive deeper

this is just an introductory course on testing, learn more at

jest: https://jestjs.io/docs/getting-started

react testing lib: https://testing-library.com/docs/react-testing-library/intro

how to test react hook: https://blog.logrocket.com/test-react-hooks/

``

