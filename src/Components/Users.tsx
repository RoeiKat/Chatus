import { useState } from "react";

import { Login } from "./UserComponents/Forms/Login";
import { Card, Button } from "react-bootstrap";

export const Users = function () {
  const [register, setRegister] = useState<boolean>(false);
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
        {!register ? <Login /> : null}
      </div>
    </Card>
  );
};
