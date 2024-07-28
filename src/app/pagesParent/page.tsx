'use client'

import { memo } from "react"
import { TableWithApi } from "@/components/table"
import { columns } from "./constants"

const PagesParent = () => {
    return (
        <>
            <TableWithApi
                columns={columns}
                rowKey="page_parent_id"
                apiId="QUERY_AND_POST_PAGES_PARENT_TABLE_DATA"
                editableTable
            />
        </>
    )
}

export default memo(PagesParent)