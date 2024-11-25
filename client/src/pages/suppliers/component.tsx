import { memo, useCallback } from "react"
import { useFormManager, useTablePost, useVisibleState } from "../../hooks"
import InputField from "../../components/input-field"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import { QueryTable, useCreateTableActionRef } from "../../components/table"
import ModalView from "./partials/ModalView"
import { tableColumns } from "./constants"

const SuppliersPage = () => {

    const { visible, handleOpen, handleClose } = useVisibleState()

    const {
        tableRef,
        fetchTableData,
        resetTableData
    } = useCreateTableActionRef()

    const {
        handleSelectRecord,
        handleDeleteRecord,
        handleSaveOrUpdateRecord,
        record,
    } = useTablePost({
        apiId: "POST_SUPPLIERS_TABLE_DATA",
        refreshTableData: fetchTableData
    })

    const {
        values: {
            supplier_name,
            phone_number
        }, handleChange,
        resetValues
    } = useFormManager({
        initialValues: {
            supplier_name: "",
            phone_number: ""
        }
    })

    const handleSearch = () => {
        fetchTableData({
            supplier_name,
            phone_number
        })
    }

    const handleReset = () => {
        resetTableData()
        resetValues()
    }

    const handleOpenModal = useCallback(() => {
        handleOpen()
        handleSelectRecord({
            record_status: "n"
        })
    }, [handleOpen, handleSelectRecord])

    return (
        <>
            <div
                className="flex border flex-wrap p-3 gap-3"
            >
                <InputField
                    value={supplier_name}
                    name="supplier_name"
                    handleChange={handleChange}
                    label="supplier Name"
                    variant="outlined"
                    className="w-[20%]"
                />
                <InputField
                    value={phone_number}
                    name="phone_number"
                    handleChange={handleChange}
                    label="supplier phone"
                    variant="outlined"
                    className="w-[15%]"
                />

                <SearchAndClearIcon
                    onPressClear={handleReset}
                    onPressSearch={handleSearch}
                />
            </div>

            <QueryTable
                ref={tableRef}
                apiId="GET_SUPPLIERS_TABLE_DATA"
                callOnFirstRender
                columns={tableColumns}
                rowKey="supplier_id"
                onClick={handleSelectRecord}
                onPressDelete={handleDeleteRecord}
                onPressAdd={handleOpenModal}
                onPressEditOrSave={handleOpen}
            />

            <ModalView
                visible={visible}
                onClose={handleClose}
                record={record}
                handleSaveOrUpdateRecord={handleSaveOrUpdateRecord}
            />
        </>
    )
}

export default memo(SuppliersPage)