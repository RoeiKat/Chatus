import { Conversation } from "../../../../Interface/conversation.interface";
import { UserAvatar } from "../../../UserComponents/UserAvatar";

interface ConversationCardProps {
  conversation: Conversation;
  setConversation: (conversation: Conversation) => void;
}

export const ConversationCard = function (props: ConversationCardProps) {
  const { conversation, setConversation } = props;
  const { messages } = conversation;
  const lastMessage = messages[messages.length - 1];
  const userToRender = conversation.firstUser;
  let messageDate: string;
  const dummyDate = new Date(1681886023349);
  const currentDate = new Date(Date.now());
  if (dummyDate.getDay() === currentDate.getDay()) {
    messageDate = `${dummyDate.getHours()}:${dummyDate.getMinutes()}`;
  } else if (dummyDate.getDate() + 1 === currentDate.getDate()) {
    messageDate = "Yesterday";
  } else {
    messageDate = `${dummyDate.getDate()}/${
      dummyDate.getMonth() + 1
    }/${dummyDate.getFullYear()}`;
  }
  return (
    <div
      className="border-light border-bottom d-flex align-items-center p-3"
      style={{ background: "rgba(255,255,255,0.1)" }}
      onClick={() => setConversation(conversation)}
    >
      <div>
        <UserAvatar user={userToRender} />
      </div>
      <div className="col-10 d-flex flex-row">
        <div className="col-9 d-flex flex-column">
          <span className="mx-3 username">{userToRender.username}</span>
          <div className="mx-3 last-message">
            {lastMessage && (
              <div className="mt-1">
                {lastMessage.sender.username}: {lastMessage.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-3 text-center last-message">
          <div className="mt-2">{messageDate}</div>
        </div>
      </div>
    </div>
  );
};
