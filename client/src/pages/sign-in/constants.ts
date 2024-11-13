import { RecordWithAnyValue } from "../../types";

export const validate = ({ user_name, password }: RecordWithAnyValue) => {
  let obj: RecordWithAnyValue = {};

  (user_name === "" || user_name === undefined) &&
    (obj.user_name = "Username is required");
  (password === "" || password === undefined) &&
    (obj.password = "Password is required");
  return obj;
};
