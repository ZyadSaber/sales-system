import { memo, useCallback } from "react"
import { useFormManager, useTablePost } from "../../hooks"
import InputField from "../../components/input-field"
import Checkbox from "../../components/checkbox"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import { QueryTable, useCreateTableActionRef } from "../../components/table"
import { tableColumns } from "./constants"

const PagesSetupPage = () => {

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
        apiId: "POST_PAGE_SETUP_TABLE_DATA",
        refreshTableData: fetchTableData
    })

    const {
        values: {
            parent_name,
            is_active
        }, handleChange,
        resetValues
    } = useFormManager({
        initialValues: {
            parent_name: "",
            is_active: true
        }
    })

    const handleSearch = () => {
        fetchTableData({
            parent_name,
            is_active
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
                    value={parent_name}
                    name="parent_name"
                    handleChange={handleChange}
                    label="parent name"
                    variant="outlined"
                    className="w-[20%]"
                />

                <Checkbox
                    checked={is_active}
                    name="is_active"
                    handleChange={handleChange}
                    label="is active"
                />

                <SearchAndClearIcon
                    onPressClear={handleReset}
                    onPressSearch={handleSearch}
                />
            </div>

            <QueryTable
                ref={tableRef}
                apiId="GET_PAGE_SETUP_TABLE_DATA"
                callOnFirstRender
                columns={tableColumns}
                rowKey="page_id"
                showSaveIcon
                onClick={handleSelectRecord}
                onPressDelete={handleDeleteRecord}
                onPressEditOrSave={handleSave}
            />
        </>
    )
}

export default memo(PagesSetupPage)