import { memo } from "react"
import { QueryTable } from "../../components/table"
import { tableColumns } from "./constants"

const SupplierReport = () => (
    <QueryTable
        apiId="GET_SUPPLIER_SUMMARY_DATA"
        columns={tableColumns}
        rowKey="item_id"
        hideTableHeader
    />
)

export default memo(SupplierReport)