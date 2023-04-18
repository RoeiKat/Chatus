import "./ConversationPane.css";
import { Conversation } from "../../../Interface/conversation.interface";
import { SearchBar } from "../../SearchBar";
import { ConversationCard } from "../Components/ConversationCard";

export const ConversationsPane = function () {
  const dummyConversations: Conversation[] = [
    {
      firstUser: {
        username: "dummy",
      },
      secondUser: {
        username: "dummy2",
      },
      messages: [],
    },
    {
      firstUser: {
        username: "dummy",
      },
      secondUser: {
        username: "dummy2",
      },
      messages: [],
    },
    {
      firstUser: {
        username: "dummy",
      },
      secondUser: {
        username: "dummy2",
      },
      messages: [],
    },
  ];
  return (
    <div className="col-3">
      <div className="border-bottom mt-1 p-3">
        <SearchBar />
      </div>
      <div className="conversations-container">
        {dummyConversations.map((item, index) => {
          return <ConversationCard key={index} conversation={item} />;
        })}
      </div>
    </div>
  );
};
