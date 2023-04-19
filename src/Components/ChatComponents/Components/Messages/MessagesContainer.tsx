import { Message } from "../../../../Interface/message.interface";
import { User } from "../../../../Interface/user.interface";
import "./MessagesContainer.css";
import { MessagePill } from "./MessagePill";

interface MessagesContainerProps {
  messages: Message[];
  currentUser: User;
}

export const MessagesContainer = function (props: MessagesContainerProps) {
  const { messages, currentUser } = props;
  return (
    <div className="messages-container">
      {messages.map((message, index) => {
        return <MessagePill key={index} message={message} />;
      })}
    </div>
  );
};
