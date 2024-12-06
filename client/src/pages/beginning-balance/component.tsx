import { memo, useCallback } from "react"
import { useFormManager, useTablePost } from "../../hooks"
import InputField from "../../components/input-field"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import { QueryTable, useCreateTableActionRef } from "../../components/table"
import { tableColumns } from "./constants"
import { RecordWithAnyValue } from "../../types"

const BeginningBalancePage = () => {

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
        apiId: "POST_ITEMS_OPENING_BALANCE_TABLE_DATA",
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
            records: getTableData().filter(({ record_status }: RecordWithAnyValue) => record_status !== "d"),
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
                apiId="GET_ITEMS_OPENING_BALANCE_TABLE_DATA"
                callOnFirstRender
                columns={tableColumns}
                rowKey="item_id"
                onClick={handleSelectRecord}
                onPressDelete={handleDeleteRecord}
                onPressEditOrSave={handleSave}
                canAdd={true}
                canEdit={true}
                canDelete={true}
                showSaveIcon
            />
        </>
    )
}

export default memo(BeginningBalancePage)