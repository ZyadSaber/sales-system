import { RecordWithAnyValue } from "../types";

const sortObjectByKeysAndStringify = (params?: RecordWithAnyValue) => {
  let result = {};

  if (params) {
    const keys = Object.keys(params);
    if (keys.length) {
      result = keys.sort().reduce(
        (acc: any, key: string) => ({
          ...acc,
          [key]: params[key],
        }),
        {}
      );
    }
  }

  return JSON.stringify(result);
};

export default sortObjectByKeysAndStringify;
