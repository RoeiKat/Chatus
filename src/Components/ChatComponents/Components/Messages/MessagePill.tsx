import { useAppSelector } from "../../../../store/hooks";
import "./MessagePill.css";
import { Message } from "../../../../Interface/message.interface";

export const MessagePill = function (props: { message: Message }) {
  const { message } = props;
  const { userId } = useAppSelector((state) => state.user);
  const sentByUser = message.sender._id === userId;
  return (
    <div className={`d-flex ${!sentByUser && "justify-content-end"}`}>
      <div
        className={`message-pill d-flex ${sentByUser && "message-pill-user"}`}
      >
        <span className="message-text">{message.message}</span>
      </div>
    </div>
  );
};
