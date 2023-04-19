import { User } from "../../../../Interface/user.interface";
import { UserAvatar } from "../../../UserComponents/UserAvatar";

export const MessagesHeader = function (props: { user: User }) {
  const { user } = props;
  return (
    <div className="col-12 p-4 d-flex border-bottom">
      <UserAvatar user={user} />
      <div className="mx-3 username">{user.username}</div>
    </div>
  );
};
