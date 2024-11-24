import { memo, useCallback, useState } from "react"
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingOverlay from "../loading-overlay"
import TableCellRow from "./partials/TableCellRow"
import TableHeader from "./partials/TableHeader";
import { RecordWithAnyValue, ChangePropType } from "../../types";
import { BaseTableProps } from "./interface";

const BaseTable = ({
    dataSource,
    rowKey,
    columns,
    width = "100%",
    margin = "10px 0",
    padding,
    loading = false,
    noPagination,
    onDoubleClick,
    onClick,
    paginationCount,
    rowsPerPage,
    currentPage,
    onPageChange,
    onRowsPerPageChange,
    hideTableHeader,
    editDisabled,
    deleteDisabled,
    onTableInputChange,
    ...props
}: BaseTableProps) => {

    const [selectedIndex, setSelectedIndex] = useState<number>()

    const handleClickRow = useCallback((record: RecordWithAnyValue, index: number) => () => {
        setSelectedIndex(index)
        onClick?.(record)
    }, [onClick])

    const handleDoubleClickRow = useCallback((record: RecordWithAnyValue, index: number) => () => {
        setSelectedIndex(index)
        onDoubleClick?.(record)
    }, [onDoubleClick])

    const handleInputChange = useCallback((record: RecordWithAnyValue, rowKeyOfTheRecord: string) => (inputData: ChangePropType) => {
        onTableInputChange?.({
            rowKeyOfTheRecord,
            record,
            inputData
        })
    }, [onTableInputChange])

    return (
        <LoadingOverlay loading={loading}>
            <TableContainer component={Paper} style={{
                width,
                margin,
                padding
            }}>
                {!hideTableHeader && <TableHeader
                    {...props}
                    editDisabled={editDisabled || !selectedIndex}
                    deleteDisabled={deleteDisabled || !selectedIndex}
                />}
                <Table sx={{ minWidth: 650 }} stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column: RecordWithAnyValue, index: number) => (
                                <TableCell className="bg-slate-800 text-white font-semibold " key={index} style={{
                                    width: column.width
                                }}>{column.title}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataSource?.map((record: RecordWithAnyValue) => (
                                <TableRow
                                    key={record[rowKey]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={`even:bg-gray-100 hover:bg-slate-600 transition duration-0 ${record[rowKey] === selectedIndex && "bg-slate-400"}`}
                                    onClick={handleClickRow(record, record[rowKey])}
                                    onDoubleClick={handleDoubleClickRow(record, record[rowKey])}
                                >
                                    {columns.map((column: RecordWithAnyValue, index: number) => (
                                        <TableCellRow
                                            key={index}
                                            value={record[column.field]}
                                            column={column}
                                            onInputChange={handleInputChange(record, record[rowKey])}
                                        />
                                    ))}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                hidden={noPagination}
                rowsPerPageOptions={[5, 10, 15, 20, paginationCount]}
                component="div"
                count={paginationCount || dataSource?.length}
                rowsPerPage={rowsPerPage || dataSource?.length || paginationCount}
                page={currentPage || 0}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </LoadingOverlay>
    );
};

export default memo(BaseTable);
