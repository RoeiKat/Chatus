import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import "./MessageForm.css";
export const MessageForm = function () {
  const [message, setMessage] = useState<string>("");

  const submitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    if (!message) return;
  };

  return (
    <Form onSubmit={submitHandler} className="mt-3 d-flex">
      <div className="col-11 d-flex message-input-container">
        <FontAwesomeIcon icon={faSmile} className="emoji-btn" />
        <input
          type="text"
          value={message}
          className="mx-1 text-light message-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
      </div>
      <Button
        type="submit"
        variant={`primary ${!message ? "disabled" : null}`}
        className="send-button mx-1"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Form>
  );
};
