import {useFormManager} from "../../hooks"
import InputField from "../../components/input-field"
import SearchAndClearIcon from "../../components/search-and-clear-icon"
import {QueryTable, useCreateTableActionRef} from "../../components/table"
import {tableColumns} from "./constants"

const CustomersPage = () => {

    const {
        tableRef,
        fetchTableData,
        resetTableData
    } = useCreateTableActionRef()

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

    // const handleSearch = ()=>{
    //     // fetchTableData({
    //     //     customer_name,
    //     //     phone_number
    //     // })
    // }
    //
    // const handleReset = ()=>{
    //     resetTableData()
    //     resetValues()
    // }

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
                    // onPressClear={handleReset}
                    // onPressSearch={handleSearch}
                />
            </div>

            <QueryTable
                ref={tableRef}
                apiId="GET_CUSTOMERS_TABLE_DATA"
                callOnFirstRender
                columns={tableColumns}
            />
        </>
    )
}

export default CustomersPage