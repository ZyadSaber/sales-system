import { RecordWithAnyValue } from "../../../types";
import useAppConfigStore from "./useAppConfig";

const useSetAuthConfigData = () => {
  const { setAuthProviderContextData } = useAppConfigStore();

  return (values: RecordWithAnyValue) => {
    setAuthProviderContextData((prev) => ({
      ...prev,
      ...values,
    }));
  };
};

export default useSetAuthConfigData;
