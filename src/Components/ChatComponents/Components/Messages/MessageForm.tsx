import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import "./MessageForm.css";
import {
  focusContainer,
  deFocusContainer,
} from "../../../../util/focus-container";
import { Conversation } from "../../../../Interface/conversation.interface";
import { postMessage } from "../../../../API/Chat/message-create";

export const MessageForm = function (props: {
  currentConversation: Conversation | null;
  setConversation: (conversation: Conversation) => void;
  userId: string | null;
}) {
  const { currentConversation, userId, setConversation } = props;
  const [message, setMessage] = useState<string>("");
  const toUser =
    currentConversation && userId === currentConversation?.initUser.user._id
      ? currentConversation.otherUser.user._id
      : currentConversation?.initUser.user._id;
  const submitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    if (!message) {
      return;
    }
    postMessage(message, toUser!)
      .then((results) => {
        const { conversation } = results;
        setConversation(conversation);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setMessage("");
      });
  };

  return (
    <>
      {currentConversation && (
        <Form onSubmit={submitHandler} className="mt-1 mb-1 d-flex">
          <div
            id="messageContainer"
            className="mx-2 col-11 d-flex align-items-center input-container"
          >
            <FontAwesomeIcon icon={faSmile} className="emoji-btn" />
            <input
              type="text"
              value={message}
              className="mx-1 text-light message-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              onFocus={() => focusContainer("messageContainer")}
              onBlur={() => deFocusContainer("messageContainer")}
            />
          </div>
          <Button
            type="submit"
            variant={`primary ${!message ? "disabled" : null}`}
            className="send-button"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Form>
      )}
    </>
  );
};
