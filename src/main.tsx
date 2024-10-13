import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/global.css";
import "atropos/css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Root } from "./components/Root.tsx";
import HomePage from "./components/pages/homePage/HomePage.tsx";
import ProductCatalogContainer from "./components/pages/catalogProduct/ProductCatalogContainer.tsx";

import {
  otherLoader,
  loader3,
  allSkinsLoader,
  loaderSearch,
} from "./lib/loaders/productCatalogLoader.ts";

import { loader as skinDetailsLoader } from "./lib/loaders/urlParamsLoader.ts";
// import { loader as rootLoader } from "./lib/utils.ts";
import { loader as homePageLoader } from "./lib/loaders/homepageLoader.ts";
import { ItemDeatils } from "./components/pages/productView/ItemDetails.tsx";
import { LoadingFallback } from "./components/pages/homePage/loadingFallback.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      // loader={rootLoader}
      element={<Root />}
      errorElement={<ErrorBoundary />}
    >
      <Route index loader={homePageLoader} element={<HomePage />} />
      <Route
        path="weapon/:category/:weaponName"
        loader={loader3}
        element={<ProductCatalogContainer />}
      />
      <Route
        path="weapon/:category/:subcategory/:weaponName"
        loader={loader3}
        element={<ProductCatalogContainer />}
      />
      <Route
        path="view/:weaponId"
        loader={skinDetailsLoader}
        element={<ItemDeatils />}
      />
      <Route
        path="search/"
        loader={loaderSearch}
        element={<ProductCatalogContainer />}
      />
      <Route
        path="skins"
        loader={allSkinsLoader}
        element={<ProductCatalogContainer />}
      />
      <Route
        path=":category/:itemName"
        loader={otherLoader}
        // element={<Carousel />}
        element={<ProductCatalogContainer />}
      />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
  </React.StrictMode>,
);
