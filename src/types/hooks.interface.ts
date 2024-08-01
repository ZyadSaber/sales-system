import { API_ID } from "@/global";
import { RecordWithAnyData } from "./general.interface";

export interface useFetchProp {
  apiId: keyof typeof API_ID;
  fetchOnFirstRun?: boolean;
  refreshTimeout?: number;
  params?: RecordWithAnyData;
  noAuthorization?: boolean;
  checkForParams?: boolean;
  onResponse?: any;
  runQueryWhenLanguageChanged?: boolean;
  skipQuery?: boolean;
}

interface DataResponseType {
  error?: string;
  errorCode?: string;
  response?: RecordWithAnyData;
}

export interface useMutationProps {
  apiId: keyof typeof API_ID;
  onResponse?: (dataResponse?: DataResponseType) => void;
  method?: string;
}

export interface postFunctionProps {
  data: RecordWithAnyData;
  cb?: (dataResponse: DataResponseType) => void;
}

export interface fetchFunParamType {
  params?: RecordWithAnyData;
}

export type UseBasicRunQueryFnType = (nextParams?: RecordWithAnyData) => void;
