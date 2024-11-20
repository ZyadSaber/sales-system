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
  const [actualParams, setActualParams] = useState(baseNextParams);
  const previousParams = usePrevious(actualParams);
  const latestQueryParamsRef = useRef<RecordWithAnyValue>(baseNextParams);

  const hasParamsChanged = useCallback(
    () => !objectIs(baseNextParams, previousParams),
    [baseNextParams, previousParams]
  );

  const runQuery = (_params?: RecordWithAnyValue) => {
    setLoading(true);
    if (!API_TEXT) return setLoading(false);
    setActualParams(_params || {});
    axios
      .get(`/api/${API_TEXT}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: _params ? _params : previousParams,
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

  console.log(
    "hasParamsChanged",
    hasParamsChanged(),
    baseNextParams,
    actualParams
  );

  useEffect(() => {
    const canRunQueryForFirstRender =
      !!callOnFirstRender && !queryCalledOnFirstRender.current;
    if (
      canRunQueryForFirstRender ||
      (!disableCheckFormParams && hasParamsChanged())
    ) {
      queryCalledOnFirstRender.current = canRunQueryForFirstRender;
      runQuery({
        ...actualParams,
      });
    }
  }, []);

  return {
    runQuery,
    loading,
  };
};

export default useFetch;
