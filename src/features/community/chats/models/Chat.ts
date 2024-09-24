import { UserSmall } from "@/core/user/models/User";

export interface Chat {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    title?: string;
    content?: string;
    isPublic?: boolean;
    chatMessages?: ChatMessage[];
}

export interface ChatUsersData {
    chatUsers: ChatUser[];
}

export interface ChatUser {
    chatId: number;
    userId: number;
    role?: string;
}

export interface ChatMessage {
    id: number;
    chatId: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
    content?: string;
}

export interface ChatSearchDTO {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    title?: string;
    chatUsersData?: UserSmall[];
    content?: string;
    isPublic?: boolean;
    chatMessages?: ChatMessage[];
}