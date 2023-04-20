import { Message } from "./message.interface";
import { User } from "./user.interface";
export interface Conversation {
  _id?: string;
  initUser: User;
  otherUser: User;
  messages: Message[];
  notifications: number;
  createdAt?: string;
}
