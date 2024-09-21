"use client";

import { useToastsContext } from "../contexts/ToastsContext";
import Toast from "./Toast";

export interface ToastManagerProps {

}

const ToastManager = ({

}: ToastManagerProps) => {
    const {
        toasts,
        setToasts
    } = useToastsContext();

    return (
        <div className="absolute right-0 bottom-0 bg-white text-black text-xl">
            {toasts.map((toast, index) => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
};

export default ToastManager;