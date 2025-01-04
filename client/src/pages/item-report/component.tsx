import { memo } from "react"
import { QueryTable } from "../../components/table"
import { tableColumns } from "./constants"

const ItemReport = () => (
    <QueryTable
        apiId="GET_ITEM_SUMMARY_DATA"
        columns={tableColumns}
        rowKey="rowKey"
        hideTableHeader
    />
)

export default memo(ItemReport)