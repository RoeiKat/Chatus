import { Message } from "./message.interface";
import { User } from "./user.interface";
export interface Conversation {
  _id?: string;
  initUser: { user: User; notifications?: number };
  otherUser: { user: User; notifications?: number };
  messages: Message[];
  createdAt?: string;
  updatedAt?: string;
}
