import { Conversation } from "../../../Interface/conversation.interface";
import { MessageForm } from "../Components/Messages/MessageForm";
import { MessagesContainer } from "../Components/Messages/MessagesContainer";
import { MessagesHeader } from "../Components/Messages/MessagesHeader";
interface MessagesPaneProps {
  currentConversation: Conversation | null;
  setConversation: () => void;
  userId: string | null;
}

export const MessagesPane = function (props: MessagesPaneProps) {
  const { currentConversation, userId, setConversation } = props;
  const userToRender =
    currentConversation?.initUser._id === userId
      ? currentConversation?.otherUser
      : currentConversation?.initUser;
  return (
    <div className="col-12 col-sm-9">
      <div>
        <MessagesHeader
          user={userToRender!}
          closeConversation={setConversation}
        />
        <MessagesContainer currentConversation={currentConversation} />
        <MessageForm
          currentConversation={currentConversation}
          userId={userId}
        />
      </div>
    </div>
  );
};
