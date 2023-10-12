C20 build SPA using React Router



4hrs content, 可单独看



# Key takeaways

+ what is SPA ? why we need SPA
+ defining routes & navigation header



# Intro

multiple page in single-page application



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





## Dynamic Routes

311-