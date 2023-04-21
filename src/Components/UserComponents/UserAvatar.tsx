import "./UserAvatar.css";
import { User } from "../../Interface/user.interface";
import { getColorByBgColor } from "../../util/inital-color";
export const UserAvatar = function (props: {
  username: string | null;
  color?: string;
}) {
  const { username, color } = props;
  const userColor: string = color ? color : "#268fe8";
  return (
    <div
      className="user-avatar"
      style={{
        background: `${userColor}`,
        color: `${getColorByBgColor(userColor)}`,
      }}
    >
      {username && username[0].toUpperCase()}
    </div>
  );
};
