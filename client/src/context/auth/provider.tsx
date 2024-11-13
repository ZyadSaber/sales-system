import React, { useState } from "react";
import { useInterval } from "../../hooks";
import Store from "./helper/store";
import { initialContextValues } from "./constants";

const AppConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setContext] =
        useState<typeof initialContextValues>(initialContextValues);

    // useInterval(incrementCount, 2000);

    return (
        <Store.Provider
            value={{ state: state, setAuthProviderContextData: setContext }}
        >
            {children}
        </Store.Provider>
    );
};

export default AppConfigProvider;