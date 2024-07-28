import { useState, useMemo, useCallback } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useBoundingClientRect } from "@/hooks";
import { RecordWithAnyData, ChangeEvent } from '@/types';
import TableHeader from "./partials/TableHeader";
import generateFixedColumns from "./helpers/generateFixedColumns";
import createTableInput from "./helpers/createTableInput"
import { BaseTableProps } from "./interface";

const BaseTable = ({
    dataSource,
    columns,
    loading,
    rowKey,
    width = "100%",
    margin,
    padding,
    height,
    totalRecords,
    noPagination,
    pagination = 10,
    onSelectRow,
    onDoubleClick,
    infoHidden, deleteHidden,
    editHidden,
    addHidden,
    printHidden,
    pdfHidden,
    excelHidden,
    infoDisabled,
    deleteDisabled,
    editDisabled,
    addDisabled,
    printDisabled,
    pdfDisabled,
    excelDisabled,
    onInfo,
    onDelete,
    onEdit,
    onAdd,
    onPrint,
    onPdf,
    onExcel,
    editableTable,
    onTableChange,
    hideTableHeader = true
}: BaseTableProps) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pagination);
    const [selectedRow, setSelectedRow] = useState<number>();
    const [elementRef, rect] = useBoundingClientRect([columns.length, loading]);

    const handleTableChange = useCallback((index: number, record: RecordWithAnyData) => (changeProps: ChangeEvent) => {
        onTableChange?.({ index, record, changeProps });
    }, [onTableChange]);

    const { adjustedColumns } = useMemo(() => generateFixedColumns({
        containerWidthNumber: rect?.width ?? 200,
        columnsFromProps: columns,
    }), [columns, rect?.width]);

    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }, []);

    const handleSelectRow = useCallback((index: number, row: RecordWithAnyData) => () => {
        setSelectedRow(index);
        onSelectRow?.(row);
    }, [onSelectRow]);

    const handleDoubleClick = useCallback((index: number, row: RecordWithAnyData) => () => {
        setSelectedRow(index);
        onDoubleClick?.(row);
    }, [onDoubleClick]);

    return (
        <Paper sx={{ width, overflow: 'hidden', margin, padding }}>
            {!hideTableHeader && <TableHeader
                {...{
                    infoHidden, deleteHidden, editHidden, addHidden, printHidden, pdfHidden, excelHidden,
                    infoDisabled, deleteDisabled, editDisabled, addDisabled, printDisabled, pdfDisabled,
                    excelDisabled, onInfo, onDelete, onEdit, onAdd, onPrint, onPdf, onExcel
                }}
            />}
            <TableContainer sx={{ maxHeight: height }} ref={elementRef}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {adjustedColumns.map(({ width, className, title }: any, index: number) => (
                                <TableCell key={index} style={{ minWidth: width }} className={className}>
                                    {title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSource.slice(noPagination ? undefined : page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((record, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={record[rowKey]}
                                    onClick={handleSelectRow(index, record)}
                                    onDoubleClick={handleDoubleClick(index, record)}
                                    className={`p-2 ${index === selectedRow && "bg-gray-100"}`}
                                >
                                    {columns.map(({ dataIndex, inputProps }, idx) => {
                                        const recordValue = record?.[dataIndex]
                                        return (
                                            <TableCell key={idx} className='py-2'>
                                                {editableTable && inputProps ?
                                                    <span>{createTableInput({
                                                        ...inputProps,
                                                        recordValue,
                                                        dataIndex,
                                                        onChange: handleTableChange(record[rowKey], record)
                                                    })}</span> :
                                                    recordValue.toString()}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!noPagination && (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 75, 100]}
                    component="div"
                    count={totalRecords}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
};

export default BaseTable;
