import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OperationOutcome, ToastInfo } from "../models/Toast";
import { faCheck, faCheckCircle, faExclamationTriangle, faInfoCircle, faQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";

export interface ToastProps {
    toast?: ToastInfo;
}

const Toast = ({
    toast,
}: ToastProps) => {

    const getIconByOutcome = () => {
        switch (toast?.outcome) {
            case OperationOutcome.SUCCESS:
                return faCheck;
            case OperationOutcome.ERROR:
                return faXmark;
            case OperationOutcome.WARNING:
                return faExclamationTriangle;
            case OperationOutcome.INFO:
                return faInfoCircle;
            default:
                return faQuestion;
        }
    }

    const getTailwindCSSByOutcome = () => {
        switch (toast?.outcome) {
            case OperationOutcome.SUCCESS:
                return "bg-green-500";
            case OperationOutcome.ERROR:
                return "bg-red-500";
            case OperationOutcome.WARNING:
                return "bg-yellow-500";
            case OperationOutcome.INFO:
                return "bg-blue-500";
            default:
                return "bg-gray-500";
        }
    }

    return (
        <div className="w-64 px-4 py-2 flex items-start justify-between bg-gray-50 border border-gray-300 rounded-md shadow-sm text-base">
            <div className="flex items-center space-x-2">
                <div className={`w-8 h-6 rounded-full flex items-center justify-center ${getTailwindCSSByOutcome()}`}>
                    <FontAwesomeIcon icon={getIconByOutcome()} className="text-white small-icon" />
                </div>
                <div>
                    <p className="font-semibold">{toast?.title}</p>
                    <p>{toast?.message}</p>
                </div>
            </div>

            <button>
                <FontAwesomeIcon icon={faXmark} className="text-gray-700 hover:text-red-700" />
            </button>
        </div>
    );
};

export default Toast;