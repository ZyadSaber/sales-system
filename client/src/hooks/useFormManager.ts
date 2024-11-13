import { useCallback, useState, useEffect } from "react";
import usePrevious from "./usePrevious";
import { RecordWithAnyValue, ChangePropType } from "../types";

interface UseFormManagerProps {
  initialValues: RecordWithAnyValue;
  onSubmit?: () => void;
  validate?: (values: RecordWithAnyValue) => void;
}

/**
 * useFormManager is a hook that manages form state and validation.
 *
 * @param {object} [props.initialValues] - The initial values of the form.
 * @param {function} [props.onSubmit] - The callback to call when the form is submitted.
 * @param {function} [props.validate] - A function that takes in the current form values and
 *   returns an object with the same shape as the form values, where the values are the
 *   error messages.
 *
 * @return {object} An object with the following properties:
 *
 *   - `values`: The current form values.
 *   - `handleChange`: A function that takes in an object with a single property, where the
 *     key is the name of the input element and the value is the new value of the input
 *     element.
 *   - `handleMultipleChange`: A function that takes in an object with multiple properties,
 *     where each key is the name of an input element and the value is the new value of the
 *     input element.
 *   - `resetValues`: A function that resets the form values to the initial values.
 *   - `submit`: A function that submits the form and calls the onSubmit callback if there
 *     are no errors. Otherwise, sets the errors and returns.
 *   - `errors`: An object with the same shape as the form values, where the values are the
 *     error messages.
 *   - `setRootState`: A function that sets the form values to the given object.
 */

const useFormManager = ({
  initialValues,
  onSubmit,
  validate,
}: UseFormManagerProps) => {
  const [values, setValues] = useState<
    typeof initialValues | RecordWithAnyValue
  >(initialValues);

  const [errors, setErrors] = useState<RecordWithAnyValue>({});

  const preValues = usePrevious(initialValues);

  const areInitialValuesChanged = useCallback(
    () => !Object.is(JSON.stringify(preValues), JSON.stringify(initialValues)),
    [initialValues, preValues]
  );

  useEffect(() => {
    if (areInitialValuesChanged()) {
      setValues(initialValues);
    }
  }, [areInitialValuesChanged, initialValues]);

  const handleChange = useCallback(({ name, value }: ChangePropType) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleMultipleChange = useCallback((record: RecordWithAnyValue) => {
    setValues((prev) => ({
      ...prev,
      ...record,
    }));
  }, []);

  const resetValues = useCallback(() => setValues(initialValues), []);

  /**
   * Submits the form and calls the onSubmit callback if there are no errors.
   * Otherwise, sets the errors and returns.
   */
  const submit = useCallback(() => {
    const __errors = validate?.(values) || {};
    const hasErrors = Object.keys(__errors).length !== 0;
    if (hasErrors) {
      setErrors(__errors);
      return;
    } else {
      setErrors({});
      onSubmit?.();
    }
  }, [values, validate, onSubmit]);

  return {
    values,
    handleChange,
    handleMultipleChange,
    resetValues,
    submit,
    errors,
    setRootState: setValues,
  };
};

export default useFormManager;
