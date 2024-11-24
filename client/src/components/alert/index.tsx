import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import ReactDOM from 'react-dom/client';

interface AlertComponentProps {
    message?: string,
    status: "success" | "info" | "warning" | "error",
    onClose: () => void,
    duration?: number
}

const AlertComponent = ({
    message,
    status,
    onClose,
    duration
}: AlertComponentProps) => {
    useEffect(() => {
        const timerId = setTimeout(onClose, duration || 3000);
        return () => clearTimeout(timerId);
    }, [onClose]);
    return (
        <div id="notification" className="absolute top-8 right-3 w-80">
            <Alert variant="filled" severity={status}>
                {message || "Success"}
            </Alert>
        </div>
    )
}

const notification = (status: "success" | "info" | "warning" | "error", message?: string, duration?: number) => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    const rootElement = ReactDOM.createRoot(root);

    const onClose = () => {
        rootElement.unmount()
    }

    rootElement.render(
        <AlertComponent
            status={status}
            duration={duration}
            message={message}
            onClose={onClose}
        />);
}

export default notification