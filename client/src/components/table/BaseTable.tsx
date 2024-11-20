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
import { RecordWithAnyValue } from "../../types";

const BaseTable = ({
    dataSource,
    rowKey,
    columns,
    width = "100%",
    margin,
    padding,
    loading,
    noPagination,
    onDoubleClick,
    onCLick,
    paginationCount,
    rowsPerPage,
    currentPage,
    onPageChange,
    onRowsPerPageChange
}: any) => {

    const [selectedIndex, setSelectedIndex] = useState<number>()

    const handleClickRow = useCallback((record: RecordWithAnyValue, index: number) => () => {
        setSelectedIndex(index)
        onCLick?.(record)
    }, [onCLick])

    const handleDoubleClickRow = useCallback((record: RecordWithAnyValue, index: number) => () => {
        setSelectedIndex(index)
        onDoubleClick?.(record)
    }, [onDoubleClick])

    return (
        <LoadingOverlay loading={loading}>
            <TableContainer component={Paper} style={{
                width,
                margin,
                padding
            }}>
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
                            dataSource.map((record: RecordWithAnyValue, index: number) => (
                                <TableRow
                                    key={record[rowKey]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={`even:bg-gray-100 hover:bg-slate-600 transition duration-0 ${index === selectedIndex && "bg-slate-400"}`}
                                    onClick={handleClickRow(record, index)}
                                    onDoubleClick={handleDoubleClickRow(record, index)}
                                >
                                    {columns.map((column: RecordWithAnyValue, index: number) => (
                                        <TableCell key={index}>{record[column.field]}</TableCell>
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
                count={paginationCount || dataSource.length}
                rowsPerPage={rowsPerPage || dataSource.length || paginationCount}
                page={currentPage || 0}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </LoadingOverlay>
    );
};

export default memo(BaseTable);
