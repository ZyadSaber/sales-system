import { Add, Delete, Edit, Info, Print, PictureAsPdf, ListAlt, Save } from "@mui/icons-material"
import { TableHeaderProps } from "../interface"

const TableHeader = ({
    infoHidden,
    deleteHidden,
    editHidden,
    addHidden,
    printHidden,
    pdfHidden,
    excelHidden,
    infoDisabled,
    deleteDisabled,
    editDisabled,
    addDisabled,
    printDisabled,
    pdfDisabled,
    excelDisabled,
    onInfo,
    onDelete,
    onEdit,
    onAdd,
    onPrint,
    onPdf,
    onExcel,
    onSave,
    SaveHidden,
    saveDisabled,
    editableTable
}: TableHeaderProps) => (
    <div className="w-full border px-3 py-2.5 flex justify-center items-center rounded-t gap-3">
        <button disabled={infoDisabled} hidden={infoHidden} onClick={onInfo} >
            <Info className=" text-blue-700" />
        </button>
        <button disabled={deleteDisabled} hidden={deleteHidden} onClick={onDelete} >
            <Delete className={deleteDisabled ? "text-gray-400 cursor-not-allowed" : "text-red-500 cursor-pointer"} />
        </button>
        <button disabled={editDisabled} hidden={editHidden || editableTable} onClick={onEdit} >
            <Edit className={editDisabled ? "text-gray-400 cursor-not-allowed" : "text-blue-400 cursor-pointer"} />
        </button>
        <button disabled={addDisabled} hidden={addHidden} onClick={onAdd} >
            <Add className={addDisabled ? "text-gray-400 cursor-not-allowed" : "text-green-400 cursor-pointer"} />
        </button>
        <button disabled={saveDisabled} hidden={SaveHidden} onClick={onSave} >
            <Save className={saveDisabled ? "text-gray-400 cursor-not-allowed" : "text-sky-800 cursor-pointer"} />
        </button>
        <button disabled={printDisabled} hidden={printHidden} onClick={onPrint} >
            <Print className={printDisabled ? "text-gray-400 cursor-not-allowed" : "text-black/70 cursor-pointer"} />
        </button>
        <button disabled={pdfDisabled} hidden={pdfHidden} onClick={onPdf} >
            <PictureAsPdf className={pdfDisabled ? "text-gray-400 cursor-not-allowed" : "text-pink-500 cursor-pointer"} />
        </button>
        <button disabled={excelDisabled} hidden={excelHidden} onClick={onExcel} >
            <ListAlt className={excelDisabled ? "text-gray-400 cursor-not-allowed" : "text-green-700 cursor-pointer"} />
        </button>
    </div>
)

export default TableHeader