import { useState } from "react";

import { Login } from "./UserComponents/Forms/Login";
import { Card } from "react-bootstrap";
import { Register } from "./UserComponents/Forms/Register";

export const Users = function () {
  const [register, setRegister] = useState<boolean>(false);
  return (
    <Card className="col-10 col-md-8 user-card">
      <Card.Header
        className="d-flex flex-column flex-md-row align-items-center"
        style={{ border: "none" }}
      >
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
          <div className="chatus-brand"></div>
          <Card.Title
            className="chatus-brand-name"
            style={{ fontSize: "14px" }}
          >
            ChatUs.
          </Card.Title>
        </div>
        <div className="p-1 col-12 col-md-6 d-flex justify-content-around">
          <button
            type="button"
            className={`user-button ${!register && "user-button-active"}`}
            onClick={() => setRegister(false)}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`user-button ${register && "user-button-active"}`}
            onClick={() => setRegister(true)}
          >
            Join
          </button>
        </div>
      </Card.Header>
      <div className="mt-5 container mx-0 mx-md-5 d-flex flex-column align-items-center align-items-md-start justify-content-center">
        {!register ? <Login /> : <Register />}
      </div>
    </Card>
  );
};
