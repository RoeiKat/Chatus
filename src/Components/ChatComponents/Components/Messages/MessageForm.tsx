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
  userId: string | null;
}) {
  const { currentConversation, userId } = props;
  const [message, setMessage] = useState<string>("");
  const toUser =
    userId === currentConversation?.initUser._id
      ? currentConversation.otherUser._id
      : currentConversation?.initUser._id;
  const submitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    if (!message) {
      return;
    }
    postMessage(message, toUser!);
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
