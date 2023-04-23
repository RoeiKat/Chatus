import { useEffect, useState } from "react";

import { Conversation } from "../../../../Interface/conversation.interface";
import { Message } from "../../../../Interface/message.interface";
import "./MessagesContainer.css";
import { MessagePill } from "./MessagePill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "socket.io-client";
import { getMessages } from "../../../../API/Chat/conversations-get";

interface MessagesContainerProps {
  currentConversation: Conversation | null;
  socket: Socket;
  userId: string | null;
}

export const MessagesContainer = function (props: MessagesContainerProps) {
  const { currentConversation, socket, userId } = props;
  const [messages, setMessages] = useState<Message[] | undefined>();
  const [reload, setReload] = useState<boolean>(true);
  const [prevId, setPrevId] = useState<string>("");
  socket.on("newMessageEvent", (data) => {
    const { recieverId, senderId } = data;
    if (userId !== recieverId && userId !== senderId) {
      return;
    } else {
      setReload(true);
    }
  });

  useEffect(() => {
    if (prevId !== currentConversation?._id) {
      setMessages(undefined);
      setPrevId(currentConversation?._id || "temp");
    }
    if (!currentConversation) {
      setMessages(undefined);
      setReload(true);
    } else if (currentConversation?._id && reload) {
      setPrevId(currentConversation._id);
      getMessages(currentConversation._id)
        .then((results) => {
          const { messages } = results;
          setMessages(messages);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setReload(false);
        });
    } else {
      return;
    }
  }, [currentConversation, reload, prevId, messages]);

  return (
    <div className={`${currentConversation && "messages-container"}`}>
      {messages ? (
        messages.map((message, index) => {
          return <MessagePill key={index} message={message} />;
        })
      ) : (
        <div className="no-conversation-container">
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="no-conversation-plane"
          />
          <h1 className="mt-4 custom-header">No conversation selected</h1>
        </div>
      )}
    </div>
  );
};
