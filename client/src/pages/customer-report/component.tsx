import { memo } from "react"
import { QueryTable } from "../../components/table"
import { tableColumns } from "./constants"

const CustomerReport = () => (
    <QueryTable
        apiId="GET_CUSTOMER_SUMMARY_DATA"
        columns={tableColumns}
        rowKey="item_id"
        hideTableHeader
    />
)

export default memo(CustomerReport)