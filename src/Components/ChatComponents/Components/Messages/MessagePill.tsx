import { useAppSelector } from "../../../../store/hooks";
import "./MessagePill.css";
import { Message } from "../../../../Interface/message.interface";

export const MessagePill = function (props: { message: Message }) {
  const { message } = props;
  const { userId } = useAppSelector((state) => state.user);
  const sentByUser = message.sender._id === userId;
  return (
    <div
      className={`pb-1 col-12 d-flex ${
        !sentByUser && "border justify-content-end"
      }`}
    >
      <div className={`mx-2 message-pill ${sentByUser && "message-pill-user"}`}>
        <span className="mx-2">{message.message}</span>
      </div>
    </div>
  );
};
