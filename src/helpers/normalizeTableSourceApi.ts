import { format } from "date-fns";
import { RecordWithAnyData } from "@/types";

const normalizeTableSourceApi = (data: RecordWithAnyData[]) => {
  return data.map((record) => ({
    ...record,
    created_at: format(record?.created_at, "yyyy-MM-dd hh:mm aa"),
    updated_at: format(record?.updated_at, "yyyy-MM-dd hh:mm aa"),
    record_status: "q",
  }));
};

export default normalizeTableSourceApi;
