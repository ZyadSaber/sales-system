import { useState, useCallback } from "react";
import { API_ID } from "@/global";
import {
  useMutationProps,
  postFunctionProps,
  RecordWithAnyData,
} from "@/types";

const usePost = ({ apiId, onResponse, method = "POST" }: useMutationProps) => {
  const url = `/api/${API_ID[apiId]}`;
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = useCallback(
    async ({ data, cb }: postFunctionProps) => {
      setLoading(true);
      let dataResponse: RecordWithAnyData = {};
      try {
        const requestOptions = {
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        const result = await fetch(url, requestOptions);
        const jsonData = await result.json();
        const { ok, status } = result;
        if (!ok) {
          dataResponse = {
            error: jsonData,
            errorCode: status,
            response: undefined,
          };
        } else {
          dataResponse = {
            error: undefined,
            errorCode: undefined,
            response: jsonData,
          };
        }
      } catch (error) {
        throw error;
      } finally {
        onResponse && onResponse(dataResponse);
        cb && cb(dataResponse);
        setLoading(false);
      }
    },
    [method, onResponse, url]
  );

  return { loading, mutate };
};

export default usePost;
