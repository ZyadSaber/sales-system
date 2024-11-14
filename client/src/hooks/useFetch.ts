import { useState, useEffect } from "react";
import axios from "axios";

interface useFetchProp {
  callOnFirstRender?: boolean;
}

const useFetch = ({ callOnFirstRender }: useFetchProp) => {
  const [loading, setLoading] = useState(false);

  const runQuery = () => {
    setLoading(true);
    axios
      .get("/api/auth/validate_token")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
