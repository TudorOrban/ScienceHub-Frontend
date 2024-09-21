import { createContext, ReactNode, useContext, useState } from "react";
import { ToastInfo } from "../models/Toast";

export interface ToastsContextType {
    toasts: ToastInfo[];
    setToasts: (toasts: ToastInfo[]) => void;
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
        console.log("Adding toast", toast);
        const id = currentMaxId + 1;
        toast.id = id.toString();
        setToasts(prevToasts => [...prevToasts, toast]);
        setCurrentMaxId(id);
    }

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
