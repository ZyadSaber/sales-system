import InputText from "@/components/input-text";
import CheckBox from "@/components/checkbox"
import InputNumber from "@/components/input-number"

const createTableInput = ({
    type,
    placeHolder,
    recordValue,
    dataIndex,
    onChange
}: any) => {
    let ComponentToRender
    switch (type) {
        case 'text':
            ComponentToRender = (
                <InputText
                    name={dataIndex}
                    value={recordValue}
                    onChange={onChange}
                    placeHolder={placeHolder}
                    width="100%"
                />
            );
            break;
        case 'checkBox':
            ComponentToRender =
                <CheckBox
                    checked={recordValue}
                    name={dataIndex}
                    onChange={onChange}
                />;
            break;
        case 'number':
            ComponentToRender =
                <InputNumber
                    value={recordValue}
                    name={dataIndex}
                    onChange={onChange}
                    width="100%"
                />;

            break;
        default:
            ComponentToRender = recordValue;
    }
    return ComponentToRender
}

export default createTableInput