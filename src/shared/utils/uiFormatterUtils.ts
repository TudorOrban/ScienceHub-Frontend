import { format, formatDistanceToNow, parseISO } from 'date-fns';


export const truncateString = (str?: string, maxLength?: number) => {
    if (!str) return "";
    if (!maxLength) return str;
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
    }
    return str;
}

export const formatDate = (dateIsoString?: string) => {
    if (!dateIsoString) return "";
    
    const date = parseISO(dateIsoString);
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    if (date < oneMonthAgo) {
        return format(date, "MMMM dd, yyyy");
    } else {
        return formatDistanceToNow(date, { addSuffix: true });
    }
}

export const formatMessageDateTime = (dateIsoString?: string) => {
    if (!dateIsoString) return "";
    
    const date = parseISO(dateIsoString);
    const now = new Date();
    const oneDayAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    if (date < oneDayAgo) {
        return format(date, "MMMM dd, yyyy");
    } else {
        return format(date, "h:mm a");
    }


}
