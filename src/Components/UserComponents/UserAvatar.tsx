import "./UserAvatar.css";
import { User } from "../../Interface/user.interface";
export const UserAvatar = function (props: { user: User }) {
  const { user } = props;
  return <div className="user-avatar">{user.username[0].toUpperCase()}</div>;
};
