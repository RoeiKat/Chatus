import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getConversations } from "../API/Chat/conversations-get";
import { Conversation } from "../Interface/conversation.interface";

import { Card } from "react-bootstrap";
import { ConversationsPane } from "./ChatComponents/Panes/ConversationsPane";
import { MessagesPane } from "./ChatComponents/Panes/MessagesPane";

export const Chat = function () {
  const dispatch = useAppDispatch();
  const { token, checkAuth, userId } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getConversations({ stateToken: token }));
  }, [dispatch, checkAuth, token]);
  const { conversations } = useAppSelector((state) => state.conversations);
  console.log(conversations);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);

  return (
    <Card
      style={{ background: "#515052" }}
      className="col-10 d-flex flex-row border-light"
    >
      <ConversationsPane
        currentConversation={currentConversation}
        conversations={conversations}
        setConversation={(conversation: Conversation) =>
          setCurrentConversation(conversation)
        }
      />
      <MessagesPane
        currentConversation={currentConversation}
        userId={userId}
        setConversation={() => setCurrentConversation(null)}
      />
    </Card>
  );
};
