import { useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { userLogin } from "../../../API/User/user-login";
import { loginSchema } from "../../../schemas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";

export const Login = function () {
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit(data) {
      dispatch(userLogin(data));
    },
  });
  return (
    <Form noValidate onSubmit={handleSubmit} className="d-flex flex-column">
      <div className="d-flex text-light form-control input-container">
        <span className="mx-1">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input
          type="email"
          id="email"
          className={`${errors.email && "is-invalid"} text-light mx-1`}
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className="d-flex text-light form-control input-container">
        <span className="mx-1">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className={`${errors.password && "is-invalid"} text-light mx-1`}
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <span>
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          />
        </span>
      </div>
      <div className="mt-3 mb-3 d-flex">
        {error && <p className="text-danger m-0 p-0">{error}</p>}
      </div>
      <Button type="submit" variant={`primary ${loading && "disabled"}`}>
        Login
      </Button>
    </Form>
  );
};
