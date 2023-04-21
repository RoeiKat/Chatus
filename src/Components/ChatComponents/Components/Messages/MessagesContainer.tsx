import { Conversation } from "../../../../Interface/conversation.interface";
import "./MessagesContainer.css";
import { MessagePill } from "./MessagePill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface MessagesContainerProps {
  currentConversation: Conversation | null;
}

export const MessagesContainer = function (props: MessagesContainerProps) {
  const { currentConversation } = props;
  return (
    <div className={`${currentConversation && "messages-container"}`}>
      {currentConversation ? (
        currentConversation.messages.map((message, index) => {
          return <MessagePill key={index} message={message} />;
        })
      ) : (
        <div className="no-conversation-container">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="no-conversation-plane"
          />
        </div>
      )}
    </div>
  );
};
