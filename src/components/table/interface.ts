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
  infoHidden?: boolean;
  deleteHidden?: boolean;
  editHidden?: boolean;
  addHidden?: boolean;
  printHidden?: boolean;
  pdfHidden?: boolean;
  excelHidden?: boolean;
  infoDisabled?: boolean;
  deleteDisabled?: boolean;
  editDisabled?: boolean;
  addDisabled?: boolean;
  printDisabled?: boolean;
  pdfDisabled?: boolean;
  excelDisabled?: boolean;
  onInfo?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onAdd?: () => void;
  onPrint?: () => void;
  onPdf?: () => void;
  onExcel?: () => void;
}

export interface BaseTableProps extends TableHeaderProps {
  dataSource: RecordWithAnyData[];
  columns: Columns[];
  loading?: boolean;
  rowKey: string;
  width?: string;
  margin?: string;
  padding?: string;
  height?: string;
  totalRecords: number;
  noPagination?: boolean;
  pagination?: number;
  hideTableHeader?: boolean;
  onSelectRow?: (record: RecordWithAnyData) => void;
  onDoubleClick?: (record: RecordWithAnyData) => void;
  editableTable?: boolean;
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

export interface TableDataRecord {
  data: RecordWithAnyData[] | [];
  count: number;
}
