import { useState, useEffect } from "react";
import axios from "axios";
import { API_ID } from "../constants";
import { useGetAccessToken } from "../context/auth";
import { RecordWithAnyValue } from "@/types";

interface useFetchProp {
  callOnFirstRender?: boolean;
  onResponse?: (response: RecordWithAnyValue) => void;
  apiId: keyof typeof API_ID;
}

const useFetch = ({ callOnFirstRender, onResponse, apiId }: useFetchProp) => {
  const [loading, setLoading] = useState(false);
  const accessToken = useGetAccessToken();

  const API_TEXT = API_ID[apiId];

  const runQuery = () => {
    setLoading(true);
    if (!API_TEXT) return setLoading(false);
    axios
      .get(`/api/${API_TEXT}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (callOnFirstRender) {
      runQuery();
    }
  }, []);

  return {
    runQuery,
    loading,
  };
};

export default useFetch;
