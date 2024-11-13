import { useState } from "react";
import axios from "axios";

/**
 * usePost is a custom hook that provides functionality to make POST requests.
 *
 * @returns {object} An object with the following properties:
 *   - `handlePost`: A function that takes an object containing `data` and `cb` (callback).
 *     It performs a POST request to the "/api/auth/sign_in" endpoint with the provided data.
 *     The callback is invoked with the response or error data.
 *   - `loading`: A boolean indicating the loading state of the POST request.
 */
const usePost = () => {
  const [loading, setLoading] = useState(false);

  const handlePost = ({ data, cb }: any) => {
    setLoading(true);
    axios
      .post("/api/auth/sign_in", {
        ...data,
      })
      .then((response) => {
        cb?.({ response: response.data });
      })
      .catch((error) => {
        cb?.({ error: error.response.data });
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
