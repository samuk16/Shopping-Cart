import { createContext } from "react";
import { ObjCart } from "./types";

type contextType = {
  setCartProducts: React.Dispatch<React.SetStateAction<Map<string, ObjCart>>>;
  cartProducts: Map<string, ObjCart>;
};

const DataContext = createContext<contextType>({
  setCartProducts: () => {},
  cartProducts: new Map(),
});

export default DataContext;
