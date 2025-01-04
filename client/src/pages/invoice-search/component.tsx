import { memo, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useFormManager } from "../../hooks"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import { QueryTable, useCreateTableActionRef } from "../../components/table"
import SelectWithApiQuery from "../../components/select-with-api-query"
import { tableColumns, initialValues } from "./constants"

const InvoiceMaster = () => {
    const { search_type } = useParams()

    const { tableRef, fetchTableData, resetTableData } = useCreateTableActionRef()

    const {
        values: {
            item_id,
        },
        handleChange,
        resetValues
    } = useFormManager({
        initialValues
    })

    const handleSearch = useCallback(() => {
        fetchTableData({
            search_type,
            item_id
        })
    }, [fetchTableData, search_type, item_id])

    const handleReset = useCallback(() => {
        resetTableData()
        resetValues()
    }, [resetValues, resetTableData])

    return (
        <>
            <div
                className="flex border flex-wrap p-3 gap-3"
            >
                <SelectWithApiQuery
                    value={item_id}
                    name="item_id"
                    handleChange={handleChange}
                    label="Item Name"
                    className="w-[30%]"
                    apiId="GET_ITEMS_LIST"
                />

                <SearchAndClearIcon
                    onPressSearch={handleSearch}
                    onPressClear={handleReset}
                />
            </div>

            <QueryTable
                ref={tableRef}
                apiId="GET_SALES_PURCHASE_INVOICE_SEARCH_DATA"
                columns={tableColumns}
                rowKey="rowKey"
                hideTableHeader
                params={{
                    search_type
                }}
            />
        </>
    )
}

export default memo(InvoiceMaster)