C20 build SPA using React Router



4hrs content, 可单独看



# Key takeaways

+ what is SPA ? why we need SPA
  + react router  watches for URL changes. when URL changes, it prevents it from sending request(prevent browser default refresh), but render the components conditionally on the page so that it looks likes navigation but just a single page

+ defining routes & navigation header
  + nested pages: if multiple pages share a common component

+ navigate programmatically
  + in react  navigation for react native, screens are registered and identified by screen name; parameters are passed into that screen when navigate programmatically 
  + Similarly,  in react router for react web, <span style="color: yellow">a page is registered and identified by a url path</span>, parameters are passed into that page through the url's parameter




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



## Layouts & nested routes

307

实现一个常见的navigation header

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



```js
useNavigate() // this hook works just like react navigation in react native
```

e.g. 

```js
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate("/products");
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





## Dynamic Routes

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



# 2.5 :gem: practice

456 

:gem: 02-adv-starting-project



app.js

+ register pages with url 
+ nested: 使得多个page可以共享某个组件 

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



# 3. Dive deeper 

接着2.5的practice做

:gem: 03-dive-deeper-projects

## 3.1 Loader 

459-

看到这里





## 3.2 Data Submission

472-