import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch, useInterval } from "../../hooks";
import Store from "./helper/store";
import { initialContextValues } from "./constants";

const AppConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setContext] =
        useState<typeof initialContextValues>(initialContextValues);
    const navigate = useNavigate()

    const {
        runQuery,
    } = useFetch({
        apiId: "GET_VALIDATE_TOKEN",
        callOnFirstRender: true,
        onResponse: ({ apiValues, error }) => {
            !error ? setContext(apiValues) : navigate("/")
        },
    })

    useInterval(runQuery, 890000);

    return (
        <Store.Provider
            value={{ state, setAuthProviderContextData: setContext }}
        >
            {children}
        </Store.Provider>
    );
};

export default AppConfigProvider;