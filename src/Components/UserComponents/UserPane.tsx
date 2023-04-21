import { useAppDispatch } from "../../store/hooks";
import { userActions } from "../../store/slices/user.slice";

import { UserAvatar } from "./UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./UserPane.css";
export const UserPane = function (props: {
  color?: string;
  username: string | null;
}) {
  const dispatch = useAppDispatch();
  const { color, username } = props;
  return (
    <div className="container d-flex align-items-center justify-content-between border-top">
      <div className="mt-2 d-flex">
        <UserAvatar color={color} username={username} />
        <p className="username-light">{username}</p>
      </div>
      <div className="logout-btn">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip">Logout</Tooltip>}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            onClick={() => dispatch(userActions.logout())}
          />
        </OverlayTrigger>
      </div>
    </div>
  );
};
