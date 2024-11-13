import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import ReactDOM from 'react-dom/client';

const AlertComponent = ({
    message,
    status,
    onClose,
    duration
}: any) => {
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

const notification = (status: string, message?: string, duration?: number) => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    const rootElement = ReactDOM.createRoot(root);

    const onClose = () => {
        rootElement.unmount();
    };

    rootElement.render(
        <AlertComponent
            status={status}
            duration={duration}
            message={message}
            onClose={onClose}
        />);
}

export default notification