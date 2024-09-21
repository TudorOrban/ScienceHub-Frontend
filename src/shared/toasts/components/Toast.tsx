import { ToastInfo } from "../models/Toast";

export interface ToastProps {
    toast?: ToastInfo;
}

const Toast = ({
    toast,
}: ToastProps) => {
    return (
        <div>
            {toast?.title}
            {toast?.message}
        </div>
    );
};

export default Toast;