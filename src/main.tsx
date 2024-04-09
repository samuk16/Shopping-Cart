import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routes.tsx";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
