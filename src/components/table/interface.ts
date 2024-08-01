import { MutableRefObject, Dispatch, SetStateAction } from "react";
import { API_ID } from "@/global";
import { RecordWithAnyData, ChangeEvent } from "@/types";

export interface Columns {
  width?: string;
  dataIndex: string;
  title?: string;
  inputProps?: {
    type: "text" | "number" | "checkBox";
    placeHolder?: "page name";
  };
}

export interface TableHeaderProps {
  editableTable?: boolean;
  infoHidden?: boolean;
  deleteHidden?: boolean;
  editHidden?: boolean;
  addHidden?: boolean;
  printHidden?: boolean;
  pdfHidden?: boolean;
  excelHidden?: boolean;
  SaveHidden?: boolean;
  infoDisabled?: boolean;
  deleteDisabled?: boolean;
  editDisabled?: boolean;
  addDisabled?: boolean;
  printDisabled?: boolean;
  pdfDisabled?: boolean;
  excelDisabled?: boolean;
  saveDisabled?: boolean;
  onInfo?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onAdd?: () => void;
  onPrint?: () => void;
  onPdf?: () => void;
  onExcel?: () => void;
  onSave?: () => void;
}

export interface BaseTableProps extends SharedTableProps {
  dataSource: RecordWithAnyData[];
  loading?: boolean;
  totalRecords: number;
}

export interface SharedTableProps extends TableHeaderProps {
  columns: Columns[];
  rowKey: string;
  width?: string;
  margin?: string;
  padding?: string;
  height?: string;
  noPagination?: boolean;
  pagination?: number;
  hideTableHeader?: boolean;
  onSelectRow?: (record: RecordWithAnyData) => void;
  onDoubleClick?: (record: RecordWithAnyData) => void;

  onTableChange?: (ChangeEvent: {
    index: number;
    record: RecordWithAnyData;
    changeProps: ChangeEvent;
  }) => void;
}

export interface TablePaginationProps {
  totalRecords: number;
  noPagination?: boolean;
  pagination: number;
  currentActivePage: number;
  setCurrentActivePage: (idx: number) => void;
}

export interface UseTablePaginationProps {
  dataSource: RecordWithAnyData[];
  pagination: number;
  noPagination?: boolean;
}

export interface TableForwardedValuesForRef {
  runFetch: any;
  setTableData: Dispatch<SetStateAction<RecordWithAnyData[]>>;
  getCurrentDataSource: () => RecordWithAnyData[];
  resetTableData: () => void;
}

export type TableForwardedRefType = MutableRefObject<
  TableForwardedValuesForRef | undefined
>;

export interface TableWithApiProps extends SharedTableProps {
  apiId: keyof typeof API_ID;
  params?: RecordWithAnyData;
}
