import Header from "./Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet, ScrollRestoration } from "react-router-dom";
import DataContext from "@/lib/dataContext";
import { useState } from "react";
import { ObjCart } from "@/lib/types";
import { Toaster } from "./ui/toaster";

function Root() {
  const [cartProducts, setCartProducts] = useState<Map<string, ObjCart>>(
    new Map(),
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header cartProducts={cartProducts} setCartProducts={setCartProducts} />
      <DataContext.Provider
        value={{
          setCartProducts,
          cartProducts,
        }}
      >
        <Outlet />
      </DataContext.Provider>
      <Toaster />
      <ScrollRestoration />
    </ThemeProvider>
  );
}

export { Root };
