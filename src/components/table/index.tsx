import { memo, useMemo } from "react"
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useBoundingClientRect } from "@/hooks"
import generateFixedColumns from "./helpers/generateFixedColumns"
import { RecordWithAnyData } from "@/types"

const StyledTable = ({ dataSource, columns, loading, tableCaption, rowKey, width, margin, padding, height }: any) => {
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
            <div style={{ height }} className="w-full relative overflow-x-auto">
                <Table className="border-separate table-auto border-spacing-0 max-w-full" >
                    <TableHeader>
                        <tr>
                            {adjustedColumns.map(({ title, width }, index) => (
                                <TableHead key={index} style={{ width }}>
                                    <p>{title}</p>
                                </TableHead>
                            ))}
                        </tr>
                    </TableHeader>
                    {dataSource.map((record: RecordWithAnyData) => (
                        <tbody key={record[rowKey]}>
                            <TableRow className="transition-all bg-gray-50">
                                {adjustedColumns.map(({ width, dataIndex }, index) => (
                                    <TableCell key={index} style={{ width }}>
                                        <p className="text-center">{record?.[dataIndex].toString()}</p>
                                    </TableCell>
                                )
                                )}
                            </TableRow>
                        </tbody>
                    ))}
                </Table>
            </div>
        </div>
    )
}

export default memo(StyledTable)