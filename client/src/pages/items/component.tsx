import { memo, useCallback } from "react"
import { useFormManager, useTablePost } from "../../hooks"
import InputField from "../../components/input-field"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import { QueryTable, useCreateTableActionRef } from "../../components/table"
import { tableColumns } from "./constants"

const ItemsPage = () => {

    const {
        tableRef,
        fetchTableData,
        resetTableData,
        getTableData
    } = useCreateTableActionRef()

    const {
        handleSelectRecord,
        handleDeleteRecord,
        handleSaveOrUpdateMultiRecords
    } = useTablePost({
        apiId: "POST_ITEMS_TABLE_DATA",
        refreshTableData: fetchTableData
    })

    const {
        values: {
            item_name,
        }, handleChange,
        resetValues
    } = useFormManager({
        initialValues: {
            item_name: "",
        }
    })

    const handleSearch = () => {
        fetchTableData({
            item_name,
        })
    }

    const handleReset = () => {
        resetTableData()
        resetValues()
    }

    const handleSave = useCallback(() => {
        handleSaveOrUpdateMultiRecords({
            records: getTableData(),
        })
    }, [handleSaveOrUpdateMultiRecords, getTableData])

    return (
        <>
            <div
                className="flex border flex-wrap p-3 gap-3"
            >
                <InputField
                    value={item_name}
                    name="item_name"
                    handleChange={handleChange}
                    label="Item Name"
                    variant="outlined"
                    className="w-[20%]"
                />

                <SearchAndClearIcon
                    onPressClear={handleReset}
                    onPressSearch={handleSearch}
                />
            </div>

            <QueryTable
                ref={tableRef}
                apiId="GET_ITEMS_TABLE_DATA"
                callOnFirstRender
                columns={tableColumns}
                rowKey="item_id"
                showSaveIcon
                onClick={handleSelectRecord}
                onPressDelete={handleDeleteRecord}
                onPressEditOrSave={handleSave}
            />
        </>
    )
}

export default memo(ItemsPage)