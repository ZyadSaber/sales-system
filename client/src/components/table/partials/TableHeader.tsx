import { memo } from "react"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { TableHeaderProps } from "../interface"

const TableHeader = ({
    onPressAdd,
    addDisabled,
    canAdd,
    onPressEditOrSave,
    editDisabled,
    canEdit,
    onPressDelete,
    deleteDisabled,
    canDelete,
    showSaveIcon
}: TableHeaderProps) => {

    const disabledStyle = "text-slate-400 cursor-not-allowed border-slate-400"
    const nonDisabledStyle = "text-slate-700 cursor-pointer border-slate-700"

    return (
        <div className="w-full flex justify-center items-center p-2.5 gap-2">
            <DeleteIcon
                className={`
                ${deleteDisabled ? disabledStyle : nonDisabledStyle}
                ${canDelete && "hidden"}
                rounded-full border-2 p-0.5
                `}
                onClick={onPressDelete}
            />
            <AddIcon
                className={`
                ${addDisabled ? disabledStyle : nonDisabledStyle}
                ${canAdd && "hidden"}
                rounded-full border-2 p-0.5
                `}
                onClick={onPressAdd}
            />
            <EditIcon
                className={`
                ${editDisabled ? disabledStyle : nonDisabledStyle}
                ${(canEdit || showSaveIcon) && "hidden"}
                rounded-full border-2 p-0.5
                `}
                onClick={onPressEditOrSave}
            />
            <SaveIcon
                className={`
                ${editDisabled ? disabledStyle : nonDisabledStyle}
                ${!showSaveIcon && "hidden"}
                rounded-full border-2 p-0.5
                `}
                onClick={onPressEditOrSave}
            />
        </div>
    )
}

export default memo(TableHeader)