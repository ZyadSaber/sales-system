import { memo, useCallback } from "react"
import { useTablePost } from "../../hooks"
import { QueryTable, useCreateTableActionRef } from "../../components/table"
import { tableColumns } from "./constants"

const UsersPage = () => {

    const {
        tableRef,
        fetchTableData,
        getTableData
    } = useCreateTableActionRef()

    const {
        handleSelectRecord,
        handleDeleteRecord,
        handleSaveOrUpdateMultiRecords
    } = useTablePost({
        apiId: "POST_USERS_DATA",
        refreshTableData: fetchTableData
    })

    const handleSave = useCallback(() => {
        handleSaveOrUpdateMultiRecords({
            records: getTableData(),
        })
    }, [handleSaveOrUpdateMultiRecords, getTableData])

    return (
        <QueryTable
            ref={tableRef}
            apiId="GET_USERS_DATA"
            callOnFirstRender
            columns={tableColumns}
            rowKey="user_id"
            showSaveIcon
            onClick={handleSelectRecord}
            onPressDelete={handleDeleteRecord}
            onPressEditOrSave={handleSave}
        />
    )
}

export default memo(UsersPage)