import { memo, useState } from "react";
import Select, { SelectItemsProps } from "../select"
import { useFetch } from "../../hooks"
import { API_ID } from "../../constants";
import { RecordWithAnyValue } from "../../types";

type SelectWithApiQueryProps = SelectItemsProps & {
    apiId: keyof typeof API_ID;
    params?: RecordWithAnyValue;
    disableCheckFormParams?: boolean
}

const SelectWithApiQuery = ({
    apiId,
    params,
    disableCheckFormParams,
    ...props
}: SelectWithApiQueryProps) => {
    const [options, setOptions] = useState([])

    const { loading } = useFetch({
        apiId,
        onResponse: ({ apiValues, hasError }) => {
            !hasError && setOptions(apiValues)
        },
        callOnFirstRender: true,
        params,
        disableCheckFormParams
    })
    return <Select
        {...props}
        options={options}
        loading={loading}
    />
}

export default memo(SelectWithApiQuery)