import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./MessageForm.css";
import {
  focusContainer,
  deFocusContainer,
} from "../../../../util/focus-container";
import { Conversation } from "../../../../Interface/conversation.interface";
import { postMessage } from "../../../../API/Chat/message-create";
import { EmojiPicker } from "./EmojiPicker";

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
        <Form
          onSubmit={submitHandler}
          className="p-1 mb-1 d-flex justify-content-center"
        >
          <div
            id="newMessageContainer"
            className="mx-1 d-flex align-items-center input-container"
            style={{ width: "90%" }}
          >
            <EmojiPicker
              setMessage={(str: string) => setMessage(str)}
              message={message}
            />
            <input
              type="text"
              value={message}
              className="text-light message-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              onFocus={() => focusContainer("newMessageContainer")}
              onBlur={() => deFocusContainer("newMessageContainer")}
            />
          </div>
          <Button
            type="submit"
            variant={`primary ${!message ? "disabled" : null}`}
            className="mx-1"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Form>
      )}
    </>
  );
};
