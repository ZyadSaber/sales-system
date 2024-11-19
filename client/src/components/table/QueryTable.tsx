import React, {
    useImperativeHandle,
    forwardRef,
    useMemo,
    useState,
} from "react";
import {useFetch} from "../../hooks";
import BaseTable from "./BaseTable";

const TableWithApi = (
    {
        apiId,
        callOnFirstRender = false,
        params,
        ...tableProps
    }: any,
    ref: any
) => {

    const [{dataSource, rowCount}, setDataSource] = useState({
        dataSource: [],
        rowCount: 0,
    })

    const {runQuery, loading} = useFetch({
        apiId,
        callOnFirstRender,
        params,
        onResponse: ({apiValues, hasError}) => {
            !hasError && setDataSource({
                dataSource: apiValues?.data,
                rowCount: apiValues?.total_records,
            })
        }
    });

    const foundDataSource = useMemo(() => dataSource, [dataSource]);

    const resetTableData = () => {
        setDataSource({
            dataSource: [],
            rowCount: 0,
        })
    }

    useImperativeHandle(ref, () => ({
        runQuery,
        resetTableData,
        getCurrentDataSource: () => foundDataSource,
    }));

    return (
        <BaseTable
            dataSource={dataSource}
            loading={loading}
            paginationCount={rowCount}
            {...tableProps}
        />
    );
};
export default forwardRef(TableWithApi);
