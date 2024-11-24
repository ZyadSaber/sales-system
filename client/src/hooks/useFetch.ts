import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useGetAccessToken } from "../context/auth";
import { objectIs } from "../helpers";
import usePrevious from "./usePrevious";
import { API_ID } from "../constants";
import { RecordWithAnyValue } from "../types";

interface useFetchProp {
  callOnFirstRender?: boolean;
  onResponse?: (response: RecordWithAnyValue) => void;
  apiId: keyof typeof API_ID;
  params?: RecordWithAnyValue;
  disableCheckFormParams?: boolean;
}
1;
const useFetch = ({
  callOnFirstRender,
  onResponse,
  apiId,
  params,
  disableCheckFormParams,
}: useFetchProp) => {
  const [loading, setLoading] = useState(false);
  const accessToken = useGetAccessToken();
  const baseNextParams = params || {};
  const API_TEXT = API_ID[apiId];
  const queryCalledOnFirstRender = useRef<boolean>(false);
  const previousParams = usePrevious(baseNextParams);
  const latestQueryParamsRef = useRef<RecordWithAnyValue>(baseNextParams);

  const hasParamsChanged = useCallback(
    () => !objectIs(baseNextParams, previousParams),
    [baseNextParams, previousParams]
  );

  const buildQueryParams = useCallback((nextParams?: RecordWithAnyValue) => {
    let finalParams: RecordWithAnyValue = latestQueryParamsRef.current;

    if (nextParams) {
      finalParams = { ...finalParams, ...nextParams };
    }

    finalParams = Object.keys(finalParams).reduce((acc, key) => {
      const paramValue = finalParams[key];

      return {
        ...acc,
        [key]: typeof paramValue === "undefined" ? "" : paramValue,
      };
    }, {});

    latestQueryParamsRef.current = finalParams;
    return finalParams;
  }, []);

  const runQuery = async (_params?: RecordWithAnyValue) => {
    setLoading(true);

    const allParams = buildQueryParams(_params);
    latestQueryParamsRef.current = allParams;

    if (!API_TEXT) return setLoading(false);
    // setActualParams(allParams || {});
    await axios
      .get(`/api/${API_TEXT}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: _params ? allParams : previousParams,
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
    latestQueryParamsRef.current = {
      ...latestQueryParamsRef.current,
      ...(hasParamsChanged() ? baseNextParams : null),
    };
  }, [params, hasParamsChanged]);

  useEffect(() => {
    const canRunQueryForFirstRender =
      !!callOnFirstRender && !queryCalledOnFirstRender.current;
    if (
      canRunQueryForFirstRender ||
      (!disableCheckFormParams && hasParamsChanged())
    ) {
      queryCalledOnFirstRender.current = canRunQueryForFirstRender;
      runQuery(latestQueryParamsRef.current);
    }
  }, [params]);

  return {
    runQuery,
    loading,
  };
};

export default useFetch;
