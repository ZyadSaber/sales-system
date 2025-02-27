import { memo, useCallback } from "react"
import { useFormManager, useTablePost, useVisibleState } from "../../hooks"
import InputField from "../../components/input-field"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import { QueryTable, useCreateTableActionRef } from "../../components/table"
import ModalView from "./partials/ModalView"
import { tableColumns } from "./constants"

const CustomersPage = () => {

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
        apiId: "POST_CUSTOMERS_TABLE_DATA",
        refreshTableData: fetchTableData
    })

    const {
        values: {
            customer_name,
            phone_number
        }, handleChange,
        resetValues
    } = useFormManager({
        initialValues: {
            customer_name: "",
            phone_number: ""
        }
    })

    const handleSearch = () => {
        fetchTableData({
            customer_name,
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
                    value={customer_name}
                    name="customer_name"
                    handleChange={handleChange}
                    label="Customer Name"
                    variant="outlined"
                    className="w-[20%]"
                />
                <InputField
                    value={phone_number}
                    name="phone_number"
                    handleChange={handleChange}
                    label="Customer phone"
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
                apiId="GET_CUSTOMERS_TABLE_DATA"
                callOnFirstRender
                columns={tableColumns}
                rowKey="customer_id"
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

export default memo(CustomersPage)