import "./ConversationPane.css";
import { Conversation } from "../../../Interface/conversation.interface";
import { SearchBar } from "../../SearchBar";
import { ConversationCard } from "../Components/Conversations/ConversationCard";

interface ConversationPaneProps {
  currentConversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
}

export const ConversationsPane = function (props: ConversationPaneProps) {
  return (
    <div className="col-12 col-sm-3 border-end">
      <div className="border-bottom mt-1 p-3">
        <SearchBar />
      </div>
      <div className="conversations-container">
        {/* {dummyConversations.map((item, index) => {
          return (
            <ConversationCard
              key={index}
              conversation={item}
              setConversation={props.setConversation}
            />
          );
        })} */}
      </div>
    </div>
  );
};
