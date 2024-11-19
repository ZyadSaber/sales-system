import useAppConfigStore from "./useAppConfig";

const useGetAccessToken = () => {
  const { state } = useAppConfigStore();

  return state?.access_token;
};

export default useGetAccessToken;
