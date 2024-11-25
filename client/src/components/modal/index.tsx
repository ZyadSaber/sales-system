import { memo } from "react";
import MaterialModal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { twMerge } from 'tailwind-merge'

interface ModalProps {
    className?: string;
    onClose?: () => void;
    hideCloseIcon?: boolean
    visible: boolean;
    children: React.ReactNode;
    onSave?: () => void
}

const Modal = ({
    className,
    onClose,
    children,
    visible,
    hideCloseIcon,
    onSave
}: ModalProps) => {
    return (
        <MaterialModal
            open={visible}
            onClose={onClose}
            className="flex justify-center items-center"
        >
            <div className={twMerge("bg-white p-1 rounded w-[40%]", className)} >
                <div className="flex justify-between py-3 px-4 border-b-2 border-slate-300">
                    <h1 className="text-lg font-bold">Modal</h1>
                    {!hideCloseIcon &&
                        <CloseIcon
                            onClick={onClose}
                            className="p-0.5 cursor-pointer border-black"
                        />}
                </div>

                <div className="p-2 py-4">
                    {children}
                </div>

                <div className="flex justify-end gap-3 py-1.5 px-4 border-t-2 border-slate-300">
                    <Button variant="contained" className="bg-blue-800 text-sm p-2 " onClick={onSave}>
                        Save
                    </Button>
                    <Button variant="contained" className="bg-red-600 text-sm p-2 " onClick={onClose}>
                        Cancel
                    </Button>
                </div>

            </div>
        </MaterialModal>
    )
}

export default memo(Modal)