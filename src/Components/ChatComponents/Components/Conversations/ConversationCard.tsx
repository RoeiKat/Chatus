import { trimString } from "../../../../util/trimmer";
import { Conversation } from "../../../../Interface/conversation.interface";
import { UserAvatar } from "../../../UserComponents/UserAvatar";

interface ConversationCardProps {
  conversation: Conversation;
  currentConversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
  userId: string | null;
}

export const ConversationCard = function (props: ConversationCardProps) {
  const { conversation, setConversation, userId, currentConversation } = props;
  const { messages, initUser, otherUser } = conversation;
  const userToRender = initUser.user._id === userId ? otherUser : initUser;
  const lastMessage = messages && messages[messages.length - 1];
  let messageDate: string;
  const lastMessageDate =
    lastMessage && new Date(Date.parse(lastMessage.createdAt!));
  const currentDate = new Date(Date.now());
  if (lastMessage && lastMessageDate.getDay() === currentDate.getDay()) {
    messageDate = `${
      lastMessageDate.getHours() > 9
        ? lastMessageDate.getHours()
        : `0${lastMessageDate.getHours()}`
    }:${
      lastMessageDate.getMinutes() > 9
        ? lastMessageDate.getMinutes()
        : `0${lastMessageDate.getMinutes()}`
    }`;
  } else if (
    lastMessage &&
    lastMessageDate.getDate() + 1 === currentDate.getDate()
  ) {
    messageDate = "Yesterday";
  } else {
    messageDate =
      lastMessage &&
      `${lastMessageDate.getDate()}/${
        lastMessageDate.getMonth() + 1
      }/${lastMessageDate.getFullYear()}`;
  }
  return (
    <div
      className="border-secondary border-bottom d-flex align-items-center p-2"
      style={{
        background: `${
          currentConversation?._id === conversation._id
            ? "rgba(255,255,255,0.1)"
            : ""
        }`,
      }}
      onClick={() => setConversation(conversation)}
    >
      <div>
        <UserAvatar
          username={userToRender.user.username}
          color={userToRender.user.color}
        />
      </div>
      <div className="col-10 d-flex flex-row">
        <div className="col-12 d-flex flex-column">
          <div className="d-flex justify-content-between">
            <span className="mx-2 username">{userToRender.user.username}</span>
            <div className="text-center last-message">
              <div className="mt-2" style={{ fontSize: "10px" }}>
                {messageDate}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mx-2 last-message">
              {lastMessage && (
                <div className="mt-1">
                  {lastMessage.sender.username}:{" "}
                  {trimString(lastMessage.message)}
                </div>
              )}
            </div>
            <div className="notifications-container">
              {userToRender.notifications !== 0 ? (
                <span className="notifications">
                  {userToRender.notifications}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
