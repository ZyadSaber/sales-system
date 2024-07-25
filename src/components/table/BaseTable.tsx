import { memo, useMemo } from "react"
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    // TableFooter
} from "@/components/ui/table"
import { useBoundingClientRect } from "@/hooks"
import { RecordWithAnyData } from "@/types"
import TablePagination from "./partials/TablePagination"
import generateFixedColumns from "./helpers/generateFixedColumns"

const BaseTable = ({
    dataSource,
    columns,
    loading,
    rowKey,
    width,
    margin,
    padding,
    height,
    totalRecords,
    noPagination
}: any) => {
    const [elementRef, rect] = useBoundingClientRect([
        columns.length,
        loading,
    ]);

    const { adjustedColumns } = useMemo(
        () =>
            generateFixedColumns({
                containerWidthNumber: rect?.width ?? 200,
                columnsFromProps: columns,
            }),
        [columns, rect?.width]
    );

    return (
        <div className="relative m-0 p-0 box-border" style={{ width, margin, padding }} ref={elementRef}>
            <Table >
                <TableHeader>
                    <TableRow>
                        {adjustedColumns.map(({ title, width }, index) => (
                            <TableHead key={index} style={{ width }}>
                                <p>{title}</p>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataSource.map((record: RecordWithAnyData) => (
                        <TableRow key={record[rowKey]}>
                            {adjustedColumns.map(({ width, dataIndex }, index) => (
                                <TableCell key={index} style={{ width }}>
                                    <p>{record?.[dataIndex].toString()}</p>
                                </TableCell>
                            )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
            <TablePagination
                totalRecords={302}
                noPagination={noPagination}
                pagination={10}
                currentActivePage={31}
            />
        </div>
    )
}

export default memo(BaseTable)