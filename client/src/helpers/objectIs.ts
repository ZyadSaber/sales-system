import { RecordWithAnyValue } from "../types";
import sortObjectByKeysAndStringify from "./sortObjectByKeysAndStringify";

const objectIs = (
  firstObject: RecordWithAnyValue,
  secondObject: RecordWithAnyValue
) => {
  return (
    sortObjectByKeysAndStringify(firstObject) ===
    sortObjectByKeysAndStringify(secondObject)
  );
};

export default objectIs;
