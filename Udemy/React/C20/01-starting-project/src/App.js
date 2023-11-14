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
      // { path: "", element: <HomePage /> },
      { index: true, element: <HomePage /> },     // index route (default route)
      { path: "products", element: <ProductPage /> },
      { path: "products/:productId", element: <ProductDetail /> },     // ! dynamic route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
