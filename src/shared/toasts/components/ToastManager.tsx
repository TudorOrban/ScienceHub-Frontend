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

    const removeToast = (id?: string) => {
        if (!id) {
            return;
        }
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };

    
    return (
        <div className="absolute z-50 right-8 bottom-8 bg-white text-black text-xl space-y-8">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} removeToast={removeToast} />
            ))}
        </div>
    );
};

export default ToastManager;