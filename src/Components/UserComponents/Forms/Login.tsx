import { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { Form, Button } from "react-bootstrap";
export const Login = function () {
  const dispatch = useAppDispatch();
  const submitHandler = function (e: React.FormEvent) {
    e.preventDefault();
  };
  return (
    <Form noValidate onSubmit={submitHandler} className="d-flex flex-column">
      <input type="email" />
      <input type="password" />
      <Button type="submit" variant="primary">
        Login
      </Button>
    </Form>
  );
};
