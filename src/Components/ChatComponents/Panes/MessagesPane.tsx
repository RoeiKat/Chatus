import { Conversation } from "../../../Interface/conversation.interface";
import { MessageForm } from "../Components/Messages/MessageForm";
import { MessagesContainer } from "../Components/Messages/MessagesContainer";
import { MessagesHeader } from "../Components/Messages/MessagesHeader";
interface MessagesPaneProps {
  currentConversation: Conversation | null;
}

export const MessagesPane = function (props: MessagesPaneProps) {
  const { currentConversation } = props;
  const userToRender = currentConversation?.initUser;
  return (
    <div className="col-12 col-sm-9">
      {currentConversation ? (
        <div>
          <MessagesHeader user={userToRender!} />
          <MessagesContainer
            messages={currentConversation.messages}
            currentUser={currentConversation.initUser}
          />
          <MessageForm />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
