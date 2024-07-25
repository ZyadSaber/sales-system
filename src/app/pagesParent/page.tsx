'use client'

import { memo, useCallback, useState } from "react"
import { BaseTable } from "@/components/table"
import { useFetch } from "@/hooks"
import { columns } from "./constants"
import { RecordWithAnyData } from "@/types"

const PagesParent = () => {

    const [data, setData] = useState<RecordWithAnyData>({
        data: []
    })
    const handleResponse = useCallback((e: any) => {
        setData(e)
    }, [])

    useFetch({
        apiId: "QUERY_AND_POST_PAGES_PARENT_TABLE_DATA",
        fetchOnFirstRun: true,
        onResponse: handleResponse
    })

    return (
        <>
            <BaseTable
                dataSource={data?.data}
                columns={columns}
                rowKey="page_parent_id"
                totalRecords={data?.count}
            />
        </>
    )
}

export default memo(PagesParent)