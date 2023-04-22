import { useAppSelector } from "../../store/hooks";
import { User } from "../../Interface/user.interface";
import { Conversation } from "../../Interface/conversation.interface";
import { UserAvatar } from "../UserComponents/UserAvatar";

export const SearchUserCard = function (props: {
  user: User;
  setConversation: (conversation: Conversation) => void;
}) {
  const { user, setConversation } = props;
  const { userId, username } = useAppSelector((state) => state.user);
  const newConversation: Conversation = {
    initUser: {
      _id: userId!,
      username: username!,
    },
    otherUser: user,
    messages: [],
    notifications: 0,
  };

  return (
    <div
      className="border-light border-bottom d-flex align-items-center p-2"
      onClick={() => setConversation(newConversation)}
    >
      <div>
        <UserAvatar username={user.username} color={user.color} />
      </div>
      <div className="d-flex align-items-center">
        <div className="mx-2 username">{user.username}</div>
      </div>
    </div>
  );
};
