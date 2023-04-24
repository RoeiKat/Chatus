import { useState } from "react";
import { User } from "../../../Interface/user.interface";
import "./ConversationPane.css";
import { useAppSelector } from "../../../store/hooks";
import { Conversation } from "../../../Interface/conversation.interface";
import { SearchBar } from "../../Search/SearchBar";
import { ConversationCard } from "../Components/Conversations/ConversationCard";
import { UserPane } from "../../UserComponents/UserPane";
import { SearchUserCard } from "../../Search/SearchUserCard";

interface ConversationPaneProps {
  currentConversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
  conversations: Conversation[] | null;
}

export const ConversationsPane = function (props: ConversationPaneProps) {
  const { isMobile } = useAppSelector((state) => state.ui);
  const { userId, color, username } = useAppSelector((state) => state.user);
  const { currentConversation, conversations, setConversation } = props;
  const [searchResults, setSearchResults] = useState<User[] | null>(null);
  const [query, setQuery] = useState<string>("");

  return (
    <div
      className={`col-12 border-${!isMobile ? "end" : "none"} border-secondary`}
    >
      <div className="border-bottom border-secondary p-2">
        <SearchBar
          setResults={(users: User[]) => setSearchResults(users)}
          query={query}
          setQuery={(str: string) => {
            setSearchResults(null);
            setQuery(str);
          }}
          searchResults={searchResults}
        />
      </div>
      {!searchResults ? (
        <div className="conversations-container border-bottom border-secondary">
          {conversations?.length
            ? conversations.map((conversation, index) => {
                return (
                  <ConversationCard
                    key={conversation._id}
                    conversation={conversation}
                    setConversation={setConversation}
                    userId={userId}
                    currentConversation={currentConversation}
                  />
                );
              })
            : null}
        </div>
      ) : (
        <div className="conversations-container">
          {searchResults.map((user) => {
            return (
              <SearchUserCard
                key={user._id}
                user={user}
                setConversation={(newConversation: Conversation) => {
                  setSearchResults(null);
                  setQuery("");
                  setConversation(newConversation);
                }}
              />
            );
          })}
        </div>
      )}
      <div className="mt-1">
        <UserPane color={color} username={username} />
      </div>
    </div>
  );
};
