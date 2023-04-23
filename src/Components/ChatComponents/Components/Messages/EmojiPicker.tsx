import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faClose } from "@fortawesome/free-solid-svg-icons";
import { Theme } from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";
import Picker from "emoji-picker-react";

export const EmojiPicker = function (props: {
  setMessage: (str: string) => void;
  message: string;
}) {
  const { setMessage, message } = props;
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onEmojiClick = function (emoji: EmojiClickData, event: MouseEvent) {
    const newStr = message + emoji.emoji;
    setMessage(newStr);
  };

  return (
    <>
      {!showPicker ? (
        <FontAwesomeIcon
          icon={faSmile}
          className="mx-2 emoji-btn"
          onClick={() => setShowPicker(true)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faClose}
          className="mx-2 emoji-btn"
          onClick={() => setShowPicker(false)}
        />
      )}
      {showPicker && (
        <div style={{ position: "absolute", bottom: "7vh" }}>
          <Picker
            onEmojiClick={onEmojiClick}
            width={350}
            height={400}
            theme={Theme.DARK}
          />
        </div>
      )}
    </>
  );
};
