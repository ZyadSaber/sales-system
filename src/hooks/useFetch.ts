import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { API_ID } from "@/global";
import usePrevious from "./usePrevious";
import { objectIs } from "@/helpers";
import { useFetchProp, RecordWithAnyData, fetchFunParamType } from "@/types";

const useFetch = ({
  apiId,
  fetchOnFirstRun,
  checkForParams = false,
  params,
  onResponse,
  skipQuery,
}: useFetchProp) => {
  const [data, setData] = useState<RecordWithAnyData | RecordWithAnyData[]>();
  const [loading, setLoading] = useState(false);
  const baseNextParams = params || {};
  const previousParams = usePrevious(baseNextParams);
  const queryCalledOnFirstRender = useRef<boolean>(false);
  const hasParamsChanged = !objectIs(baseNextParams, previousParams);

  const url = `/api/${API_ID[apiId]}`;

  const generateBasicRequest = useCallback(
    async ({ params }: fetchFunParamType) => {
      try {
        setLoading(true);
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
          headers,
        });
        if (!response.ok) {
          setLoading(false);
          // If the response status is not ok (e.g., 404 or 500), throw an error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setLoading(false);
        const apiResponse = await response.json();
        setData(apiResponse);
        onResponse && onResponse(apiResponse);
        return apiResponse;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [onResponse, url]
  );

  const resetData = useCallback(() => {
    setData(undefined);
  }, []);

  const runFetch = (e?: RecordWithAnyData) => {
    if (e) {
      !skipQuery && generateBasicRequest({ params: e });
    } else {
      !skipQuery &&
        generateBasicRequest({
          params: previousParams,
        });
    }
  };

  useEffect(() => {
    if (true) {
      const canRunQueryForFirstRender =
        !!fetchOnFirstRun && !queryCalledOnFirstRender.current;

      if (canRunQueryForFirstRender || (checkForParams && hasParamsChanged)) {
        queryCalledOnFirstRender.current = canRunQueryForFirstRender;
        const computedParams = {
          ...baseNextParams,
        };
        generateBasicRequest({
          params: computedParams,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseNextParams, checkForParams, fetchOnFirstRun]);

  return {
    data,
    runFetch,
    setData,
    loading,
    resetData,
    previousParams,
  };
};

export default useFetch;
