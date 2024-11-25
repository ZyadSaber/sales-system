import { memo, useCallback } from "react"
import Modal from "../../../components/modal"
import { useFormManager } from "../../../hooks"
import InputText from "../../../components/input-field"
import { RecordWithAnyValue } from "../../../types"

interface ModalViewProps {
    visible: boolean
    onClose: () => void
    record?: RecordWithAnyValue
    handleSaveOrUpdateRecord: ({ }: RecordWithAnyValue) => void
}

const ModalView = ({
    visible,
    onClose,
    record,
    handleSaveOrUpdateRecord
}: ModalViewProps) => {

    const { values, handleChange, resetValues } = useFormManager({
        initialValues: record || {}
    })

    const {
        supplier_name,
        phone_number,
        address,
        note
    } = values || {}

    const handleSave = useCallback(() => {
        handleSaveOrUpdateRecord({
            recordToUpdateOrSave: {
                ...values,
                record_status: values.record_status === "q" ? "u" : "n"
            },
            cb: () => {
                resetValues()
                onClose()
            }
        })
    }, [handleSaveOrUpdateRecord, values, onClose, resetValues])

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            onSave={handleSave}
        >
            <div className="flex flex-wrap gap-2">
                <InputText
                    name="supplier_name"
                    value={supplier_name}
                    handleChange={handleChange}
                    label="supplier Name"
                    required
                    className="w-[67%]"
                />
                <InputText
                    name="phone_number"
                    value={phone_number}
                    handleChange={handleChange}
                    label="phone_number"
                    required
                    className="w-[30%]"
                />
                <InputText
                    name="address"
                    value={address}
                    handleChange={handleChange}
                    label="address"
                    className="w-[49%]"
                />
                <InputText
                    name="note"
                    value={note}
                    handleChange={handleChange}
                    label="supplier note"
                    className="w-[49%]"
                />
            </div>
        </Modal>
    )
}

export default memo(ModalView)