import { useState, useCallback, useEffect, useRef } from "react";
import { RecordWithAnyData } from "@/types";
import usePrevious from "./usePrevious";

interface useFormManagerProps {
  initialValues: RecordWithAnyData;
}

const useFormManager = ({ initialValues }: useFormManagerProps) => {
  const [state, setState] = useState<typeof initialValues>(initialValues);

  const hasAnyFieldChangedRef = useRef(false);
  const preValues = usePrevious(initialValues);

  const areInitialValuesChanged = useCallback(
    () => !Object.is(JSON.stringify(preValues), JSON.stringify(initialValues)),
    [initialValues, preValues]
  );

  useEffect(() => {
    if (areInitialValuesChanged()) {
      setState({ ...initialValues });
    }
  }, [areInitialValuesChanged, initialValues]);

  const resetForm = useCallback(() => {
    hasAnyFieldChangedRef.current = false;
    setState(() => initialValues);
    // @ts-ignore
  }, [initialValues]);

  useEffect(
    () => {
      return resetForm;
    },
    // eslint-disable-next-line
    []
  );

  const onChange = useCallback(
    (eventData: { name: string; value: string | number | any[] }) => {
      const { name, value } = eventData;
      const computedValue =
        typeof value === "number" ? +value.toFixed(2) : value;
      setState({ ...state, [name]: computedValue });
    },
    [state]
  );

  const handleMultiInput = useCallback(
    (e: RecordWithAnyData) => {
      setState({
        ...state,
        ...e,
      });
    },
    [state]
  );

  return {
    values: state,
    onChange,
    resetForm,
    setState,
    handleMultiInput,
  };
};

export default useFormManager;
