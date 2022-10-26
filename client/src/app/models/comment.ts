import { User } from "./user";

export interface ChatComment {
    id: number;
    createdAt: Date;
    username: User["username"];
    body: string;
    displayName: User["displayName"];
    image: string;
}