import { Card } from "react-bootstrap";

import { ConversationsPane } from "./ChatComponents/Panes/ConversationsPane";
import { MessagesPane } from "./ChatComponents/Panes/MessagesPane";

export const Chat = function () {
  return (
    <Card
      style={{ background: "#515052", height: "80%" }}
      className="col-10 d-flex flex-row border-light"
    >
      <ConversationsPane />
      <MessagesPane />
    </Card>
  );
};
