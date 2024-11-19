import { ReactNode, memo } from "react";
import { Skeleton } from '@mui/material';

interface LoadingOverlayProps {
    children?: ReactNode;
    loading: boolean;
    className?: string;
}

const LoadingOverlay = ({ loading, children, className }: LoadingOverlayProps) => (
    loading ?
        <Skeleton variant="rounded" className={`bg-gray-700 w-full h-[400px] text-center ${className}`} /> : children
)

export default memo(LoadingOverlay);