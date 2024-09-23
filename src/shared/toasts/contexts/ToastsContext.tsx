import { createContext, ReactNode, useContext, useState } from "react";
import { OperationOutcome, ToastInfo } from "../models/Toast";

export interface ToastsContextType {
    toasts: ToastInfo[];
    setToasts: React.Dispatch<React.SetStateAction<ToastInfo[]>>;
    addToast: (toast: ToastInfo) => void;
}

const ToastsContext = createContext<ToastsContextType | undefined>(undefined);

export const useToastsContext = () => {
    const context = useContext(ToastsContext);
    if (context === undefined) {
        throw new Error("useToasts must be used within a ToastsProvider");
    }
    return context;
}

export const ToastsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentMaxId, setCurrentMaxId] = useState(0);
    const [toasts, setToasts] = useState<ToastInfo[]>([]);

    const addToast = (toast: ToastInfo) => {
        const id = currentMaxId + 1;
        toast.id = id.toString();
        console.log("Toast: ", toast);
        console.log("Toasts: ", toasts);

        const timeoutDuration = toast.duration ?? getDurationByOutcome(toast.outcome ?? OperationOutcome.INFO);

        setToasts(prevToasts => [...prevToasts, toast]);
        setCurrentMaxId(id);

        setTimeout(() => {
            removeToast(toast.id);
        }, timeoutDuration);
    }

    const getDurationByOutcome = (outcome: OperationOutcome) => {
        switch (outcome) {
            case OperationOutcome.SUCCESS:
                return 3000;
            case OperationOutcome.ERROR:
                return 60000;
            case OperationOutcome.WARNING:
                return 10000;
            case OperationOutcome.INFO:
                return 10000;
            default:
                return 10000;
        }
    }

    const removeToast = (id?: string) => {
        if (!id) {
            return;
        }
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };

    return (
        <ToastsContext.Provider value={{ 
            toasts, 
            setToasts,
            addToast
        }}>
            {children}
        </ToastsContext.Provider>
    );
};
