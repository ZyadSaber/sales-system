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

export interface fetchFunParamType {
  params?: RecordWithAnyData;
}

export type UseBasicRunQueryFnType = (nextParams?: RecordWithAnyData) => void;
