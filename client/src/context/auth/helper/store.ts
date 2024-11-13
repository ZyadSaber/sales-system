import { createContext } from "react";
import { initialContextValues } from "../constants";

const Store = createContext({
  state: initialContextValues,
  setAuthProviderContextData: (state: typeof initialContextValues) => state,
});

export default Store;
