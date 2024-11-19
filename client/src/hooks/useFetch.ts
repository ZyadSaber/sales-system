import {useState, useEffect, useRef} from "react";
import axios from "axios";
import {API_ID} from "../constants";
import {useGetAccessToken} from "../context/auth";
import {RecordWithAnyValue} from "@/types";
import usePrevious from "./usePrevious";

interface useFetchProp {
    callOnFirstRender?: boolean;
    onResponse?: (response: RecordWithAnyValue) => void;
    apiId: keyof typeof API_ID;
    params?: RecordWithAnyValue
}

const useFetch = ({
                      callOnFirstRender,
                      onResponse,
                      apiId,
                      params
                  }: useFetchProp) => {
    const [loading, setLoading] = useState(false);
    const accessToken = useGetAccessToken();
    const baseNextParams = params || {};
    const [actualParams, setActualParams] = useState(baseNextParams)
    const previousParams = usePrevious(actualParams);

    const API_TEXT = API_ID[apiId];

    const runQuery = (_params?: RecordWithAnyValue) => {
        setLoading(true);
        if (!API_TEXT) return setLoading(false);
        _params && setActualParams(_params);
        axios
            .get(`/api/${API_TEXT}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: _params ? _params : previousParams
            })
            .then((response) => {
                onResponse?.({
                    apiValues: response.data,
                    status: response.status,
                    statusText: response.statusText,
                });
            })
            .catch((error) => {
                onResponse?.({
                    error: error.response.data,
                    status: error.response.status,
                    statusText: error.response.statusText,
                    hasError: true,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (callOnFirstRender) {
            runQuery(params);
        }
    }, []);

    return {
        runQuery,
        loading,
    };
};

export default useFetch;
