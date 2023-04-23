import { useAppSelector } from "../../../../store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../../../../Interface/user.interface";
import { UserAvatar } from "../../../UserComponents/UserAvatar";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const MessagesHeader = function (props: {
  user: User | null;
  closeConversation: () => void;
}) {
  const { user, closeConversation } = props;
  const { onlineUsers } = useAppSelector((state) => state.ui);
  const connectedUser: boolean =
    onlineUsers.findIndex((onlineUser) => onlineUser.userId === user?._id) !==
    -1
      ? true
      : false;
  return (
    <div
      className={`col-12 d-flex justify-content-between ${
        user && "border-bottom border-secondary"
      }`}
    >
      {user && (
        <div className="mx-3 mt-2 mb-1 d-flex">
          <UserAvatar username={user.username} color={user.color} />
          <div className="mx-3">
            <div className="username">{user.username}</div>
            <div className="active-user">{connectedUser ? "Online" : ""}</div>
          </div>
        </div>
      )}
      {user && (
        <div className="mx-4 d-flex align-items-center fs-4 text-light">
          <FontAwesomeIcon
            icon={faClose}
            className="close-btn"
            onClick={closeConversation}
          />
        </div>
      )}
    </div>
  );
};
