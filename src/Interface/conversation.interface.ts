import { Message } from "./message.interface";
import { User } from "./user.interface";
export interface Conversation {
  _id?: string;
  firstUser: User;
  secondUser: User;
  messages: Message[];
  createdAt?: string;
}
