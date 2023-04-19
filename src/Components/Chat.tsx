import { useState } from "react";
import { Conversation } from "../Interface/conversation.interface";

import { Card } from "react-bootstrap";
import { ConversationsPane } from "./ChatComponents/Panes/ConversationsPane";
import { MessagesPane } from "./ChatComponents/Panes/MessagesPane";

export const Chat = function () {
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  return (
    <Card
      style={{ background: "#515052", height: "80%" }}
      className="col-10 d-flex flex-row border-light"
    >
      <ConversationsPane
        currentConversation={currentConversation}
        setConversation={(conversation: Conversation) =>
          setCurrentConversation(conversation)
        }
      />
      <MessagesPane currentConversation={currentConversation} />
    </Card>
  );
};
