import { Conversation } from "../../../Interface/conversation.interface";
import { UserAvatar } from "../../UserComponents/UserAvatar";

interface ConversationCardProps {
  conversation: Conversation;
}

export const ConversationCard = function (props: ConversationCardProps) {
  const { conversation } = props;
  const userToRender = conversation.firstUser;
  return (
    <div className="border-light border-bottom fs-3">
      <UserAvatar user={userToRender} />
      {userToRender.username}
    </div>
  );
};
