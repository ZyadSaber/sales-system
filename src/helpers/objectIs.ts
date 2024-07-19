import sortObjectByKeysAndStringify from "./sortObjectByKeysAndStringify";

const objectIs = (firstObject: any, secondObject: any) => {
  return (
    sortObjectByKeysAndStringify(firstObject) ===
    sortObjectByKeysAndStringify(secondObject)
  );
};

export default objectIs;
