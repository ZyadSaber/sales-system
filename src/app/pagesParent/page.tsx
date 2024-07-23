'use client'

import { memo, useCallback, useState } from "react"
import Table from "@/components/table"
import { useFetch } from "@/hooks"

const PagesParent = () => {

    const [data, setData] = useState([])
    const handleResponse = useCallback((e: any) => {
        setData(e)
    }, [])

    useFetch({
        apiId: "QUERY_AND_POST_PAGES_PARENT_TABLE_DATA",
        fetchOnFirstRun: true,
        onResponse: handleResponse
    })

    const columns = [
        {
            title: "id",
            dataIndex: "page_parent_id",
            width: "5%"
        },
        {
            title: "Parent Name",
            dataIndex: "page_parent_name",
            width: "30%"
        },
        {
            title: "Hidden",
            dataIndex: "hidden",
            width: "10%"
        },
        {
            title: "Index",
            dataIndex: "page_parent_index",
            width: "5%"
        },
    ]

    return (
        <>
            <p>pagesParent</p>

            <Table
                dataSource={data}
                columns={columns}
                rowKey="page_parent_id"
                tableCaption="Table Caption and will be the pagination"
            />
        </>
    )
}

export default memo(PagesParent)