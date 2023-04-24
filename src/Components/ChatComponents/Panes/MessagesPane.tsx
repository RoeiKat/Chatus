import { Socket } from "socket.io-client";
import { Conversation } from "../../../Interface/conversation.interface";
import { MessageForm } from "../Components/Messages/MessageForm";
import { MessagesContainer } from "../Components/Messages/MessagesContainer";
import { MessagesHeader } from "../Components/Messages/MessagesHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface MessagesPaneProps {
  currentConversation: Conversation | null;
  closeConversation: () => void;
  userId: string | null;
  setConversation: (conversation: Conversation) => void;
  socket: Socket;
}

export const MessagesPane = function (props: MessagesPaneProps) {
  const {
    currentConversation,
    userId,
    closeConversation,
    setConversation,
    socket,
  } = props;
  const userToRender =
    currentConversation?.initUser.user._id === userId
      ? currentConversation?.otherUser.user
      : currentConversation?.initUser.user;
  return (
    <div className="col-12">
      <div>
        <MessagesHeader
          user={userToRender!}
          closeConversation={closeConversation}
        />
        {currentConversation ? (
          <MessagesContainer
            currentConversation={currentConversation}
            socket={socket}
            userId={userId}
          />
        ) : (
          <div className="col-12 no-conversation-container ">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="no-conversation-plane"
            />
            <h1 className="mt-4 custom-header">No conversation selected</h1>
          </div>
        )}
        <MessageForm
          currentConversation={currentConversation}
          userId={userId}
          setConversation={setConversation}
        />
      </div>
    </div>
  );
};
