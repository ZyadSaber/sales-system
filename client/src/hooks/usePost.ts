import { useState } from "react";
import axios from "axios";
import { useGetAccessToken } from "../context/auth";
import { API_ID } from "../constants";
import { RecordWithAnyValue } from "../types";

interface usePostProps {
  apiId: keyof typeof API_ID;
}

interface CallbackType {
  response?: RecordWithAnyValue;
  error?: RecordWithAnyValue;
  hasError?: boolean;
}

interface PostFunctionProp {
  data: RecordWithAnyValue | RecordWithAnyValue[] | any[];
  cb: (data: CallbackType) => void;
}

const usePost = ({ apiId }: usePostProps) => {
  const [loading, setLoading] = useState(false);
  const accessToken = useGetAccessToken();
  const API_TEXT = API_ID[apiId];

  const handlePost = ({ data, cb }: PostFunctionProp) => {
    setLoading(true);
    if (!API_TEXT) return setLoading(false);
    axios
      .post(`/api/${API_TEXT}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        cb?.({ response: response.data });
      })
      .catch((error) => {
        cb?.({ error: error.response.data, hasError: true });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    handlePost,
    loading,
  };
};

export default usePost;
