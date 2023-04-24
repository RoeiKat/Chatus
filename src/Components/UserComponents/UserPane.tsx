import { useAppDispatch } from "../../store/hooks";
import { userActions } from "../../store/slices/user.slice";

import { UserAvatar } from "./UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./UserPane.css";
import { Socket } from "socket.io-client";
export const UserPane = function (props: {
  color?: string;
  username: string | null;
  socket: Socket;
  userId: string | null;
}) {
  const dispatch = useAppDispatch();
  const { color, username, socket, userId } = props;

  const logoutHandler = () => {
    dispatch(userActions.logout());
    socket.emit("removeUser", userId);
  };

  return (
    <div className="container d-flex align-items-center justify-content-between">
      <div className="d-flex">
        <UserAvatar color={color} username={username} />
        <p className="username-light">{username}</p>
      </div>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip">Logout</Tooltip>}
      >
        <div className="logout-btn">
          <FontAwesomeIcon icon={faRightFromBracket} onClick={logoutHandler} />
        </div>
      </OverlayTrigger>
    </div>
  );
};
