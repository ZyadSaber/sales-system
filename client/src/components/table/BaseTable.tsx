import React from "react";
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingOverlay from "../loading-overlay"
import {RecordWithAnyValue} from "@/types";

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
                       totalPages,
                       rowsPerPage,
                       currentPage
                   }: any) => {

    // @ts-ignore
    return (
        <LoadingOverlay loading={loading}>
            <TableContainer component={Paper} style={{
                width,
                margin,
                padding
            }}>
                <Table sx={{minWidth: 650}} stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell className="bg-slate-800 text-white font-semibold " key={index} style={{
                                    width: column.width
                                }}>{column.title}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataSource.map((record: RecordWithAnyValue) => (
                                <TableRow
                                    key={record[rowKey]}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    className="even:bg-gray-100 hover:bg-slate-600 transition duration-0"
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
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    totalPages={totalPages || undefined}
                    count={paginationCount || dataSource.length}
                    rowsPerPage={rowsPerPage || dataSource.length || paginationCount}
                    page={currentPage || 0}
                    onPageChange={()=>{}}
                    onRowsPerPageChange={()=>{}}
                />
        </LoadingOverlay>
    );
};

export default BaseTable;
