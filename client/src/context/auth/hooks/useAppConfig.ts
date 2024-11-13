import { useContext } from "react";
import Store from "../helper/store";

const useAppConfig = () => useContext(Store);

export default useAppConfig;
