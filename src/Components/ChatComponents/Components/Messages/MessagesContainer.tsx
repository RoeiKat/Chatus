import { useEffect, useState, useRef } from "react";

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
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
    messagesEndRef.current?.scrollIntoView({
      inline: "start",
      block: "nearest",
      behavior: "auto",
    });
    if (prevId !== currentConversation?._id) {
      setReload(true);
    }
    if (!currentConversation) {
      setMessages(undefined);
      setReload(true);
      return;
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
  }, [currentConversation, reload, prevId, messages, messagesEndRef]);

  return (
    <div
      className={`${
        currentConversation &&
        "messages-container border-bottom border-secondary"
      }`}
    >
      {messages ? (
        <div>
          {messages.map((message, index) => {
            return <MessagePill key={index} message={message} />;
          })}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="col-12 no-conversation-container ">
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
