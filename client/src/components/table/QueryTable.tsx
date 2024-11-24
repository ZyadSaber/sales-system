import {
    useImperativeHandle,
    forwardRef,
    useMemo,
    memo,
    useCallback,
} from "react";
import { useFetch, useFormManager } from "../../hooks";
import BaseTable from "./BaseTable";
import { RecordWithAnyValue, } from "../../types"
import { TableWithApiProps, TableChangeInputProps } from "./interface"

const TableWithApi = (
    {
        apiId,
        callOnFirstRender = false,
        params: _params,
        disableCheckFormParams,
        rowKey,
        onTableInputChange,
        onPressAdd,
        ...tableProps
    }: TableWithApiProps,
    ref: any
) => {

    const {
        values: {
            dataSource,
            rowCount,
            currentPage,
            limit
        },
        handleChange,
        handleMultipleChange,
        resetValues
    } = useFormManager({
        initialValues: {
            dataSource: [],
            rowCount: 0,
            limit: 10,
            currentPage: 0
        }
    })

    const handleNextPage = useCallback((_: unknown, newPage: number) => {
        handleChange({
            name: "currentPage",
            value: newPage
        })
    }, [handleChange])

    const handleRowsPerPage = useCallback((_: unknown, { props: { children } }: any) => {
        handleChange({
            name: "limit",
            value: children
        })
    }, [handleChange])

    const paginationProp = {
        limit,
        offset: currentPage,
    }

    const { runQuery, loading } = useFetch({
        apiId,
        callOnFirstRender,
        disableCheckFormParams,
        params: {
            ...paginationProp,
            ..._params,
        },
        onResponse: ({ apiValues, hasError }) => {
            !hasError && handleMultipleChange({
                dataSource: apiValues?.data,
                rowCount: apiValues?.total_records,
            })
        }
    });

    const foundDataSource = useMemo(() => dataSource, [dataSource]);

    const handleRequestQuery = (params: RecordWithAnyValue) => {
        resetValues()
        runQuery({
            ...params,
            ...paginationProp,
        })
    }

    useImperativeHandle(ref, () => ({
        runQuery: handleRequestQuery,
        resetTableData: resetValues,
        getCurrentDataSource: () => foundDataSource,
    }));

    const handleInputChange = useCallback((event: TableChangeInputProps) => {
        handleChange({
            name: "dataSource",
            value: dataSource.map((item: RecordWithAnyValue) =>
                item[rowKey] === event.rowKeyOfTheRecord ?
                    {
                        ...item,
                        [event.inputData.name]: event.inputData.value,
                        record_status: item.record_status === "q" ? "u" : "n",
                    } :
                    item
            )
        })
    }, [handleChange, dataSource, rowKey])

    const handleAdd = useCallback(() => {
        handleChange({
            name: "dataSource",
            value: [
                {
                    record_status: "n",
                    [rowKey]: `${rowKey}_${Date.now()}`
                },
                ...dataSource,
            ]
        })
    }, [handleChange, dataSource, rowKey])

    return (
        <BaseTable
            {...tableProps}
            onTableInputChange={onTableInputChange || handleInputChange}
            dataSource={dataSource || []}
            loading={loading}
            paginationCount={rowCount}
            currentPage={currentPage}
            onPageChange={handleNextPage}
            onRowsPerPageChange={handleRowsPerPage}
            rowKey={rowKey}
            onPressAdd={onPressAdd || handleAdd}
        />
    );
};
export default memo(forwardRef(TableWithApi));
