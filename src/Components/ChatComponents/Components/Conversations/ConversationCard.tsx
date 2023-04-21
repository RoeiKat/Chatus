import { trimString } from "../../../../util/trimmer";
import { Conversation } from "../../../../Interface/conversation.interface";
import { UserAvatar } from "../../../UserComponents/UserAvatar";

interface ConversationCardProps {
  conversation: Conversation;
  setConversation: (conversation: Conversation) => void;
  userId: string | null;
}

export const ConversationCard = function (props: ConversationCardProps) {
  const { conversation, setConversation, userId } = props;
  const { messages, initUser, otherUser } = conversation;
  const userToRender = initUser._id === userId ? otherUser : initUser;
  const lastMessage = messages[messages.length - 1];
  let messageDate: string;
  const lastMessageDate = new Date(Date.parse(lastMessage.createdAt!));
  const currentDate = new Date(Date.now());
  if (lastMessageDate.getDay() === currentDate.getDay()) {
    messageDate = `${
      lastMessageDate.getHours() > 9
        ? lastMessageDate.getHours()
        : `0${lastMessageDate.getHours()}`
    }:${
      lastMessageDate.getMinutes() > 9
        ? lastMessageDate.getMinutes()
        : `0${lastMessageDate.getMinutes()}`
    }`;
  } else if (lastMessageDate.getDate() + 1 === currentDate.getDate()) {
    messageDate = "Yesterday";
  } else {
    messageDate = `${lastMessageDate.getDate()}/${
      lastMessageDate.getMonth() + 1
    }/${lastMessageDate.getFullYear()}`;
  }
  return (
    <div
      className="border-light border-bottom d-flex align-items-center p-2"
      style={{ background: "rgba(255,255,255,0.1)" }}
      onClick={() => setConversation(conversation)}
    >
      <div>
        <UserAvatar
          username={userToRender.username}
          color={userToRender.color}
        />
      </div>
      <div className="col-10 d-flex flex-row">
        <div className="col-12 d-flex flex-column">
          <div className="d-flex justify-content-between">
            <span className="col-6 mx-2 username">{userToRender.username}</span>
            <div className="col-4 text-center last-message">
              <div className="mt-2" style={{ fontSize: "10px" }}>
                {messageDate}
              </div>
            </div>
          </div>
          <div className="mx-2 last-message">
            {lastMessage && (
              <div className="mt-1">
                {lastMessage.sender.username}: {trimString(lastMessage.message)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
