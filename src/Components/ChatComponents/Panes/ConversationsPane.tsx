import "./ConversationPane.css";
import { useAppSelector } from "../../../store/hooks";
import { Conversation } from "../../../Interface/conversation.interface";
import { SearchBar } from "../../SearchBar";
import { ConversationCard } from "../Components/Conversations/ConversationCard";
import { UserPane } from "../../UserComponents/UserPane";

interface ConversationPaneProps {
  currentConversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
  conversations: Conversation[] | null;
}

export const ConversationsPane = function (props: ConversationPaneProps) {
  const { userId, color, username } = useAppSelector((state) => state.user);
  const { currentConversation, conversations, setConversation } = props;
  return (
    <div className="col-12 col-sm-3 border-end">
      <div className="border-bottom mt-1 p-2">
        <SearchBar />
      </div>
      <div className="conversations-container">
        {conversations?.length &&
          conversations.map((conversation, index) => {
            return (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
                setConversation={setConversation}
                userId={userId}
              />
            );
          })}
      </div>
      <div className="mt-2">
        <UserPane color={color} username={username} />
      </div>
    </div>
  );
};
