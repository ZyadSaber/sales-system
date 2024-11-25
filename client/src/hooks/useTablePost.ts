import { useCallback, useState } from "react";
import alert from "../components/alert";
import usePost from "./usePost";
import { API_ID } from "../constants";
import { RecordWithAnyValue } from "../types";

const useTablePost = ({
  apiId,
  refreshTableData,
}: {
  apiId: keyof typeof API_ID;
  refreshTableData?: () => void;
}) => {
  const [record, setRecord] = useState<RecordWithAnyValue>();

  const { loading, handlePost } = usePost({
    apiId,
  });

  const handleSelectRecord = useCallback((record: RecordWithAnyValue) => {
    setRecord(record);
  }, []);

  const handleSaveOrUpdateRecord = useCallback(
    ({
      recordToUpdateOrSave,
      cb,
    }: {
      recordToUpdateOrSave?: RecordWithAnyValue;
      cb?: () => void;
    }) => {
      const recordToSave = recordToUpdateOrSave ? recordToUpdateOrSave : record;
      handlePost({
        data: {
          data: [
            {
              ...recordToSave,
              record_status: recordToSave?.record_status === "q" ? "u" : "n",
            },
          ],
        },
        cb: ({ error, hasError }) => {
          alert(hasError ? "error" : "success", error?.message || "Success");
          cb?.();
          refreshTableData?.();
        },
      });
    },
    [handlePost, record, refreshTableData]
  );

  const handleSaveOrUpdateMultiRecords = useCallback(
    ({ records, cb }: { records: RecordWithAnyValue[]; cb?: () => void }) => {
      records &&
        handlePost({
          data: { data: records },
          cb: ({ error, hasError }) => {
            alert(hasError ? "error" : "success", error?.message || "Success");
            cb?.();
            refreshTableData?.();
          },
        });
    },
    [handlePost]
  );

  const handleDeleteRecord = useCallback(
    ({
      recordToDelete,
      cb,
    }?: {
      recordToDelete: RecordWithAnyValue;
      cb?: () => void;
    }) => {
      handlePost({
        data: {
          data: [
            {
              ...(recordToDelete ? recordToDelete : record),
              record_status: "d",
            },
          ],
        },
        cb: ({ error, hasError }) => {
          alert(hasError ? "error" : "success", error?.message || "Success");
          cb?.();
          refreshTableData?.();
        },
      });
    },
    [handlePost, record, refreshTableData]
  );

  return {
    handleSelectRecord,
    record,
    loading,
    handleSaveOrUpdateRecord,
    handleSaveOrUpdateMultiRecords,
    handleDeleteRecord,
  };
};

export default useTablePost;
