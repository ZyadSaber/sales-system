import { RecordWithAnyValue, ChangePropType } from "../../types";
import { API_ID } from "../../constants";

export interface ColumnType {
  width: string;
  title: string;
  field: string;
}

export interface TableHeaderProps {
  onPressAdd?: () => void;
  addDisabled?: boolean;
  canAdd?: boolean;
  onPressEditOrSave?: () => void;
  editDisabled?: boolean;
  canEdit?: boolean;
  onPressDelete?: () => void;
  deleteDisabled?: boolean;
  canDelete?: boolean;
  showSaveIcon?: boolean;
}

export type TableChangeInputProps = {
  record: RecordWithAnyValue;
  inputData: ChangePropType;
  rowKeyOfTheRecord: string | number;
};

export interface BaseTableProps extends TableHeaderProps {
  dataSource?: RecordWithAnyValue[];
  hideTableHeader?: boolean;
  rowKey: string;
  columns: ColumnType[];
  width?: string;
  margin?: string;
  padding?: string;
  loading?: boolean;
  noPagination?: boolean;
  onDoubleClick?: (record: RecordWithAnyValue) => void;
  onClick?: (record: RecordWithAnyValue) => void;
  paginationCount?: number;
  rowsPerPage?: number;
  currentPage?: number;
  onPageChange?: (_: unknown, newPage: number) => void;
  onRowsPerPageChange?: (
    _: unknown,
    {
      props: { children },
    }: RecordWithAnyValue
  ) => void;
  onTableInputChange?: (params: TableChangeInputProps) => void;
}

export interface TableWithApiProps extends BaseTableProps {
  apiId: keyof typeof API_ID;
  callOnFirstRender?: boolean;
  params?: RecordWithAnyValue;
  disableCheckFormParams?: boolean;
}
