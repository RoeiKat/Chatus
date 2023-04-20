import { useState } from "react";
import { useAppSelector } from "../store/hooks";

import { Login } from "./UserComponents/Forms/Login";
import { Card, Button } from "react-bootstrap";
import { Register } from "./UserComponents/Forms/Register";

export const Users = function () {
  const [register, setRegister] = useState<boolean>(false);
  const { loading } = useAppSelector((state) => state.user);
  return (
    <Card style={{ height: "60%", background: "#515052" }} className="col-4">
      <div className="btn-group d-flex">
        <Button
          variant={`primary ${!register && "active"}`}
          className="col-6"
          onClick={() => setRegister(false)}
        >
          Login
        </Button>
        <Button
          variant={`success ${!register && "active"}`}
          className="col-6"
          onClick={() => setRegister(true)}
        >
          Register
        </Button>
      </div>
      <div className="mt-5 d-flex align-items-center justify-content-center">
        {!register ? <Login /> : <Register />}
      </div>
    </Card>
  );
};
