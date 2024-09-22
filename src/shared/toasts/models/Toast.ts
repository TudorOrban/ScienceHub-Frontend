
export interface ToastInfo {
    id?: string;
    title?: string;
    message?: string;
    outcome?: OperationOutcome;
    duration?: number;
}

export enum OperationOutcome {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO",
}