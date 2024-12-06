import { memo, useCallback } from "react"
import { useFormManager, usePost } from "../../hooks"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import InputNumber from "../../components/input-number"
import { BaseTable } from "../../components/table"
import { tableColumns } from "./constants"
import alert from "../../components/alert"
import SelectWithApiQuery from "../../components/select-with-api-query"
import { ChangePropType, RecordWithAnyValue } from "../../types"

const BeginningBalancePage = () => {

    const { handlePost } = usePost({
        apiId: "POST_NEW_PURCHASE_INVOICE_ITEMS"
    })

    const {
        values: {
            supplier_id,
            phone_number,
            address,
            note,
            currentDataSource,
            invoice_total,
            net_total,
            invoice_discount
        },
        handleChange,
        handleMultipleChange,
        resetValues
    } = useFormManager({
        initialValues: {
            supplier_id: "",
            phone_number: "",
            address: "",
            note: "",
            currentDataSource: [],
            invoice_total: 0,
            net_total: 0,
            invoice_discount: 0
        }
    })

    const handleChangeSelectCustomer = useCallback(({ name, value, record }: ChangePropType) => {
        const { phone_number, address, note } = record || {}
        handleMultipleChange({
            [name]: value,
            phone_number,
            address,
            note
        })
    }, [handleMultipleChange])

    const onPressAdd = useCallback(() => {
        handleChange({
            name: "currentDataSource",
            value: [
                {
                    rowKey: Date.now(),
                    qty: 1,
                    price: 0,
                    total: 0
                },
                ...currentDataSource
            ]
        })
    }, [currentDataSource, handleChange])

    const handleInputChange = useCallback(({ rowKeyOfTheRecord, inputData }: any) => {
        const computedDataSource = currentDataSource.map((record: RecordWithAnyValue) => {

            if (record.rowKey !== rowKeyOfTheRecord) return record

            let obj = record

            if (inputData.name === "item_id") {
                obj.item_unit = inputData.record.item_unit
            } else if (inputData.name === "qty") {
                obj.total = record.price * inputData.value
            } else if (inputData.name === "price") {
                obj.total = record.qty * inputData.value
            }

            obj[inputData.name] = inputData.value
            return obj
        })

        const invoiceTotal = computedDataSource.reduce((sum: number, item: RecordWithAnyValue) => sum + item.total, 0);

        handleMultipleChange({
            currentDataSource: computedDataSource,
            invoice_total: invoiceTotal,
            net_total: invoiceTotal - invoice_discount
        })
    }, [currentDataSource, handleMultipleChange, invoice_discount])

    const handleDiscountChange = useCallback(({ name, value }: ChangePropType) => {
        handleMultipleChange({
            [name]: value,
            net_total: invoice_total - +value
        })
    }, [handleMultipleChange, invoice_total])

    const handleSave = useCallback(() => {
        handlePost({
            data: {
                supplier_id,
                invoice_details: currentDataSource,
                invoice_total,
                net_total,
                invoice_discount
            },
            cb: ({ hasError, error }) => {
                alert(hasError ? "error" : "success", error?.message)
                !hasError && resetValues()
            }
        })
    }, [handlePost, supplier_id, currentDataSource, invoice_total, net_total, invoice_discount, resetValues])

    return (
        <>
            <div
                className="flex border flex-wrap p-3 gap-3"
            >
                <div className="flex gap-2 flex-wrap w-[50%]">
                    <div className="border py-1.5 w-[8%] text-center rounded border-black/25">{supplier_id}</div>
                    <SelectWithApiQuery
                        value={supplier_id}
                        name="supplier_id"
                        handleChange={handleChangeSelectCustomer}
                        label="Item Name"
                        className="w-[30%]"
                        apiId="GET_SUPPLIERS_LIST"
                    />
                    <div className="border py-1.5 px-1 rounded border-black/25 text-center w-[19%]">{phone_number}</div>
                    <div className="border py-1.5 px-1 rounded border-black/25 text-center w-[19%]">{address}</div>
                    <div className="border py-1.5 px-1 rounded border-black/25 text-center w-[19%]">{note}</div>
                </div>

                <SearchAndClearIcon
                    onPressClear={resetValues}
                    showSearchIcon={false}
                />
            </div>

            <BaseTable
                dataSource={currentDataSource}
                columns={tableColumns}
                rowKey="rowKey"
                onPressAdd={onPressAdd}
                noPagination
                canEdit={true}
                onTableInputChange={handleInputChange}
            />

            <div className="flex flex-col gap-3 justify-center border rounded p-3 w-[20%] border-slate-800">
                <strong>Total: <span className="font-normal">{invoice_total}</span></strong>
                <strong className="flex items-center gap-1">Discount: <InputNumber value={invoice_discount} name="invoice_discount" min={0} handleChange={handleDiscountChange} max={invoice_total} /></strong>
                <strong>Total after discount: <span className="font-normal">{net_total}</span></strong>
                <button className="bg-slate-700 text-white p-1.5 w-1/4 border rounded-lg" onClick={handleSave} >Save</button>
            </div>

        </>
    )
}

export default memo(BeginningBalancePage)