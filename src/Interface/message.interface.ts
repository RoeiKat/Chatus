import { User } from "./user.interface";

export interface Message {
  _id?: string;
  sender: User;
  reciever: User;
  message: string;
  createdAt?: string;
}
