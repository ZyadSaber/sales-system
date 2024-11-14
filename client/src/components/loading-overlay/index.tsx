import { Skeleton } from '@mui/material';

interface LoadingOverlayProps {
    children: React.ReactNode;
    loading: boolean
}

const LoadingOverlay = ({ loading, children }: LoadingOverlayProps) => (
    loading ? <Skeleton variant="rounded" className="bg-gray-700 w-full h-full text-center" /> : children
)

export default LoadingOverlay