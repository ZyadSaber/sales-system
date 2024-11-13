import { useEffect, useRef } from "react";

type UseIntervalFn = () => void;

function useInterval(fn: UseIntervalFn, duration?: number | null): void {
  const savedCallback = useRef<UseIntervalFn>();

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  // Set up the interval.
  useEffect(() => {
    const runTheCallback = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(runTheCallback, duration || 2000);
    return () => clearInterval(id); // Clear interval on component unmount
  }, [duration]);
}

export default useInterval;
