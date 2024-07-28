import { Add, Delete, Edit, Info, Print, PictureAsPdf, ListAlt } from "@mui/icons-material"
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
    onExcel
}: TableHeaderProps) => (
    <div className="w-full border px-3 py-2.5 flex justify-center items-center rounded-t gap-3">
        <button disabled={infoDisabled} hidden={infoHidden} onClick={onInfo} >
            <Info className=" text-blue-700" />
        </button>
        <button disabled={deleteDisabled} hidden={deleteHidden} onClick={onDelete} >
            <Delete className="cursor-pointer text-red-500" />
        </button>
        <button disabled={editDisabled} hidden={editHidden} onClick={onEdit} >
            <Edit className="cursor-pointer text-blue-400" />
        </button>
        <button disabled={addDisabled} hidden={addHidden} onClick={onAdd} >
            <Add className="cursor-pointer text-green-400" />
        </button>
        <button disabled={printDisabled} hidden={printHidden} onClick={onPrint} >
            <Print className="cursor-pointer text-black/70" />
        </button>
        <button disabled={pdfDisabled} hidden={pdfHidden} onClick={onPdf} >
            <PictureAsPdf className="cursor-pointer text-pink-500" />
        </button>
        <button disabled={excelDisabled} hidden={excelHidden} onClick={onExcel} >
            <ListAlt className="cursor-pointer text-green-700" />
        </button>
    </div>
)

export default TableHeader