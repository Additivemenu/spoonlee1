C20 build SPA using React Router



4hrs content, 可单独看



# Key takeaways

+ what is SPA ? why we need SPA
  + react router  watches for URL changes. when URL changes, it prevents it from sending request(prevent browser default refresh), but render the components conditionally on the page so that it looks likes navigation but just a single page

+ :bangbang: defining routes & navigation header
  + layout component & page component -> very similar to next.js file-based navigation concept
  + nested pages: if multiple pages share a common component - see e.g. in [3.0 practice](#3.0 :bangbang::gem: practice)
  
+ navigate programmatically
  + in `react navigation` for `react native`, screens are registered and identified by screen name; parameters are passed into that screen when navigate programmatically 
  + :bangbang: Similarly,  in `react router` for `react` web, <span style="color: yellow">a page is registered and identified by a url path</span>, parameters are passed into that page through the url's parameter

+ data fetching with react router
  + `useLoader()` hook: use case - fetch data before navigating to and render target page






# 1. React Route basics

multiple page in single-page application



React Router is a standard library for routing in React applications. It enables the navigation among views of various components in a React Application, managing the browser history, and keeping the UI in sync with the URL.

Here's a more detailed explanation:

- **Watches for URL Changes**: React Router listens for changes in the browser's URL. It uses the HTML5 history API (or falls back to hash-based routing in older browsers) to keep the UI in sync with the URL.

- **Prevents Default Browser Refresh**: When the URL changes (either due to a user clicking a link or programmatically), React Router intercepts this event and prevents the default behavior of the browser, which would be to send a new request to the server and reload the page.

- **Renders Components Conditionally**: Based on the current URL, React Router renders certain components and not others. This is typically done using a `<Route>` component that renders a particular component when its path matches the current URL.

- **Single Page Application (SPA) Navigation**: This conditional rendering creates the effect of navigating between different pages, but it's actually just the same single web page where different React components are being rendered. This is a key feature of Single Page Applications (SPAs), where a single HTML page is loaded, and navigation between views (components) is handled client-side without additional server requests for pages.

- **Maintains Browser History**: React Router updates the browser’s history, so the forward and back buttons work as expected, giving the user a natural browsing experience.

In summary, React Router enhances the user experience in a React application by enabling navigation among different components without reloading the entire page, creating an efficient, seamless web application.



React-Router

Data-fetching & Submission



what is routing

+ different URL path loads different UI 
  + traditioanlly,  a URL corresponds to a html file => multiple-page application
    + when URL change, need re-request html file, bad performance
+ So to build more complex webpage, we use single-page application
  + only one initial html request & response
  + <span style="color: yellow">URL (page) changes are handled by <u>client-side (React) code</u> => chages the visible content without fetching  a new HTML file</span>



:pencil: [SPA](./sub_topics/SPA.md)





Prepare

---

project setup

[Home v6.15.0 | React Router](https://reactrouter.com/en/main)





## Define Routes

303-304

app.js

```js
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import HomePage from './pages/Home';
import ProductPage from './pages/Products';

//https://example.com/products
// register pages here
const router = createBrowserRouter([
  {path: '/',  element: <HomePage />},
  {path: '/products', element: <ProductPage />},
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
```





an anternative way of defining routes: 

305 

+ but we are not using below way in following section

```js
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'

import HomePage from './pages/Home';
import ProductPage from './pages/Products';


const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<ProductPage />} />
  </Route>
)
const router = createBrowserRouter(routeDefinitions)

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
```



## navigate between pages using `<Link/>`

306

Home.js

+ use `<Link />` for react router page navigation, as it hinders unnecessary re-request of html file. `<Link />` essentially uses `<a/>` internally
  + use `<a>` will also work, but there are unnecessary overhead and not authentic to react router

```js
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">the list of products </Link>
      </p>
    </>
  );
}

export default HomePage;

```



## :bangbang: Layouts & nested routes

307

实现一个常见的navigation header

+ 这个结构和next.js的结构类似

```js
App
	|-- RootLayout
				|-- MainNavigation
				|-- pages ...
```





app.js

+ define nested routes to make "navigation header" (I called it)  available to pages

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import ProductPage from "./pages/Products";
import RootLayout from "./pages/Root";

//https://example.com/products
// register pages here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

Root.js

+ 

```js
import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import classes from "./Root.module.css";

function RootLayout() {
  return (
    <>
      {/* the component that shared by all children component */}
      <MainNavigation />

      {/* Outlet is where the child component should be rendered to */}
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
```

MainNavigation.js

+ the nav bar component

```js
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="products"> Products </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
```



showing error pages with errorElement

+ config a`errorElement` for a BrowerRouter obj, when error is throw by that page, display errorElement instead

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import ProductPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

//https://example.com/products
// register pages here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

```

Error.js

```js
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <MainNavigation />

      <main>
        <h1>An error occured!</h1>
        <p>Could not find the page!</p>
      </main>
    </>
  );
}

export default ErrorPage;
```









## `NavLink`

309-310



MainNavigation.js

+ `NavLink` can further have visual effect indicating which page you are currently at. 

```js
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              // style={({ isActive }) => ({
              //   textAlign: isActive ? "center" : "left",
              // })}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              {" "}
              Products{" "}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
```





# 2. Navigating programmatically



## `useNavigate()`

```js
useNavigate() // this hook works just like react navigation in react native
```

e.g. 

```js
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate("/products");			// navigate programmatically
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">the list of products </Link>
      </p>
      <p>
        <button onClick={navigateHandler}>navigate</button>
      </p>
    </>
  );
}

export default HomePage;
```





## Dynamic Routes: `useParams()`

311-

```js
useParams() // this hook works similar to useRoute in react navigation for react native
```



App.js

+ register the path for `ProductDetails` page. the URL contains the parameters 

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import ProductPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetail from "./pages/ProductDetail";

//https://example.com/products
// register pages here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/products/:productId", element: <ProductDetail /> },     // ! dynamic route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

Products.js

+ craft dynamic route URL path

```js
import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product 1" },
  { id: "p2", title: "Product 2" },
  { id: "p3", title: "Product 3" },
];

function ProductPage() {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
    			// dynamic routes here
            <Link to={`/products/${prod.id}`}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductPage;
```

ProductDetail.js

+ `useParams` to extract parameter within the route path defined when registering the page

```js
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();

  // params.productId;

  return (
    <>
      <h1>Product Details</h1>
      <p>{params.productId}</p>			
    </>
  );
};

export default ProductDetail;
```





## Relative vs. absolute path

+ absolute path: a path starts with '/'
  + 感觉这个在多人协作编程时更不容易出歧义? 
+ relative path: a path not starts with '/'
  + `..` 也算relative path, 回到之前的path



App.js

+ 以下path改为relative path

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/:productId", element: <ProductDetail /> },     // ! dynamic route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```



alternatively, we can also use 'index route' to define the default route

```js
//https://example.com/products
// register pages here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: "", element: <HomePage /> },
      { index: true, element: <HomePage /> },     // *********** index route (default route) ******
      { path: "products", element: <ProductPage /> },
      { path: "products/:productId", element: <ProductDetail /> },     // ! dynamic route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```



# 3. Dive deeper 



## 3.0 :bangbang::gem: practice

456 

:gem: 02-adv-starting-project



app.js

+ register pages with url 
+ nested: 使得多个page可以共享某个组件 

```ts
// represent following hierarchical tree, 
"/": RootLayout  // its children will share some common comopments in Layout component
	|--- index: HomePage
	|--- "/events": EventRootLayout		// its children will share some common components in Layout 
  			|--- index: EventPage
				|--- ":eventId": EventDetailPage
        |--- "new": NewEventPage
        |--- ":eventId/edit": EditEventPage
```

```js
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage /> },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
```



EventsRootLayout.js

+ 由app.js中route的register知道, 以"/evnets"为开头的url对应的page共享`EventNavigation`组件

```js
import React from "react";
import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

const EventsRootLayout = () => {
  return (
    <>
      <EventsNavigation />
    	// Outlet represents the children when register this page
      <Outlet /> 
    </>
  );
};

export default EventsRootLayout;
```







接下来接着3.0的practice做

:gem: 03-dive-deeper-projects

## 3.1 Data fetching with `loader()`

460-461



before using `loader()`

---



src > pages > Event.js

+ what we fetch data tranditionally in previous learning - we leave the data fetching logic inside the page, the problem is that the page will firstly rendered without the data then fetch the data and then re-render the page with fetched data. 
  + how about we firstly fetch data, when the fetched data is ready, then we render the component? => that is to use `loader()`

````js
import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';

function EventsPage() {
  // hooks ==========================================
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/events');   // send to dummy backend 

      if (!response.ok) {
        setError('Fetching events failed.');
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);

  // jsx ============================================
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

export default EventsPage;
````





after using `laoder()`

---

App.js

+ we define a loader function when registering the `<EventPage/>`, everytime just before we navigate to that page, the loader function will get run and return data to that component. This will makes data fetching code cleaner and improve the performance

```js
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: async () => {
              const response = await fetch("http://localhost:8080/events"); // send to dummy backend

              if (!response.ok) {
                // ... we will look at error handling later
              } else {
                const resData = await response.json();
                return resData.events;   // this is the data that will be passed to the EventsPage component by react router
              }

            },
          },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

src > pages > `Event.js` 

+ modified version, we just use `useLoaderData()` to extract the data passed by loader, this time we don't need to manage loading state and code gets cleaner!

```js
import {useLoaderData} from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // hooks ==========================================

  const events = useLoaderData();   // here react router will automatically resolve the promise returned by the loader function

  // jsx ============================================
  return <>{<EventsList events={events} />}</>;
}

export default EventsPage;

```



where can `useLoader()` be used ? 

P462

+ 在register page component时, 绑定上loader的page component, e.g. 上面例子里的`<EventsPage>`
+ 以及这个page component内部的sub-component. e.g. 上面例子里的`<EventsList>`



where should the loader function be store?

P463

+ to keep the registering page code clean, simply store the loader function code inside the page component file, and export it 



when are loader() function executed?

p464

+ before navigating to target page component. Only when load() function completed can the page component be rendered => so there will be stagnent page when user click on a Link, but we will discuss how to relieve this later



reflecting the current navigation state in the UI

p465

+ one way of workaround is to use `navigation ` 's  state porperty (returned by `useNavigation()` ) to check if there is ongoing navigation action occuring, and then use this state info to conditionally render a popup message in  a layout component 

```ts
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
	
  const navigation = useNavigation();
  
  return (
    <>
     <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p>loading...</p>} 
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
```





### returning responses in loader()

p466

看到这里







## 3.2 Data Submission

p473-