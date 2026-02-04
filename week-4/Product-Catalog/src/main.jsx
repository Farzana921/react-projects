import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductsLayout from "./pages/ProductsLayout";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* child routes will render below navbar */}
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Home will render here */}
        </div>
      </div>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          { index: true, element: <ProductsList /> },
          { path: ":id", element: <ProductDetails /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
