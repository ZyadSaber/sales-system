import useAppConfigStore from "./useAppConfig";

const useGetAccessToken = () => {
  const {
    state: { access_token },
  } = useAppConfigStore();

  return access_token;
};

export default useGetAccessToken;
