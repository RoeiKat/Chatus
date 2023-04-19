import "./MessagePill.css";
import { Message } from "../../../../Interface/message.interface";

export const MessagePill = function (props: { message: Message }) {
  const { message } = props;
  return (
    <div className="mx-2 message-pill">
      <span className="mx-2">{message.message}</span>
    </div>
  );
};
