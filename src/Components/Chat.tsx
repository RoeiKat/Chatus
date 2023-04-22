import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getConversations } from "../API/Chat/conversations-get";
import { Conversation } from "../Interface/conversation.interface";
import { Socket } from "socket.io-client";

import { Card } from "react-bootstrap";
import { ConversationsPane } from "./ChatComponents/Panes/ConversationsPane";
import { MessagesPane } from "./ChatComponents/Panes/MessagesPane";

export const Chat = function (props: { socket: Socket }) {
  const { socket } = props;
  const dispatch = useAppDispatch();
  const [reload, setReload] = useState<boolean>(true);
  const { token, checkAuth, userId } = useAppSelector((state) => state.user);

  socket.on("newMessageEvent", (data) => {
    const { recieverId, senderId } = data;
    if (userId !== recieverId && userId !== senderId) {
      return;
    } else {
      setReload(true);
    }
  });

  socket.on("newConversationEvent", (data) => {
    const { initUser, otherUser } = data;
    if (userId !== initUser && userId !== otherUser) {
      return;
    } else {
      setReload(true);
    }
  });

  useEffect(() => {
    if (reload) {
      dispatch(getConversations({ stateToken: token }));
      setReload(false);
    }
  }, [dispatch, checkAuth, token, reload]);
  const { conversations } = useAppSelector((state) => state.conversations);
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
        socket={socket}
        currentConversation={currentConversation}
        userId={userId}
        closeConversation={() => setCurrentConversation(null)}
        setConversation={(conversation: Conversation) =>
          setCurrentConversation(conversation)
        }
      />
    </Card>
  );
};
