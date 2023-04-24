import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { uiActions } from "../store/slices/ui.slice";
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
  const { isMobile } = useAppSelector((state) => state.ui);
  const { token, checkAuth, userId } = useAppSelector((state) => state.user);

  const handleResize = () => {
    if (window.innerWidth < 1025) {
      dispatch(uiActions.setMobile(true));
    } else {
      dispatch(uiActions.setMobile(false));
    }
  };

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
    window.addEventListener("resize", handleResize);
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
      className="col-10 d-flex flex-row chat-card border border-secondary"
      style={{ opacity: "85 %" }}
    >
      <div
        className={`${
          !isMobile ? "col-sm-5 col-md-5 col-lg-4 col-xl-4 col-xxl-3" : "col-12"
        } ${isMobile && currentConversation && "d-none"}`}
      >
        <ConversationsPane
          currentConversation={currentConversation}
          conversations={conversations}
          setConversation={(conversation: Conversation) =>
            setCurrentConversation(conversation)
          }
        />
      </div>
      <div
        className={`${
          !isMobile ? "col-sm-7 col-md-7 col-lg-8 col-xl-8 col-xxl-9" : "col-12"
        } ${isMobile && !currentConversation && "d-none"}`}
      >
        <MessagesPane
          socket={socket}
          currentConversation={currentConversation}
          userId={userId}
          closeConversation={() => setCurrentConversation(null)}
          setConversation={(conversation: Conversation) =>
            setCurrentConversation(conversation)
          }
        />
      </div>
    </Card>
  );
};
