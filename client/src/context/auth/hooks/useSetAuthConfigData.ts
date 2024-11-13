import { RecordWithAnyValue } from "../../../types";
import useAppConfigStore from "./useAppConfig";

const useSetAuthConfigData = () => {
  const { setAuthProviderContextData, state } = useAppConfigStore();

  const setAuthConfigData = (values: RecordWithAnyValue) => {
    setAuthProviderContextData((prev) => ({
      ...prev,
      ...values,
    }));
  };
  return { setAuthConfigData };
};

export default useSetAuthConfigData;
