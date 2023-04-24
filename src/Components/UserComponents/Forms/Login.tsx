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
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import {
  focusContainer,
  deFocusContainer,
} from "../../../util/focus-container";
import { FormHeader } from "./FormHeader";
import { FormButton } from "./FormButton";

export const Login = function () {
  const { error, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit(data) {
      if (!loading) {
        dispatch(userLogin(data));
      }
    },
  });
  return (
    <div className="col-12 col-md-6 d-flex flex-column">
      <FormHeader text="Login" />
      <Form noValidate onSubmit={handleSubmit} className="d-flex flex-column">
        <div
          className="p-2 d-flex align-items-center text-light input-container"
          id="emailLogin"
        >
          <div className="d-flex col-11 flex-column-reverse">
            <input
              type="email"
              id="email"
              autoComplete="off"
              className={`${errors.email && "is-invalid"}`}
              value={values.email}
              onChange={handleChange}
              onFocus={() => focusContainer("emailLogin")}
              onBlur={() => deFocusContainer("emailLogin")}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        <div
          id="passwordLogin"
          className="mt-3 p-2 d-flex align-items-center text-light input-container"
        >
          <div className="d-flex col-11 flex-column-reverse">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="off"
              className={`${errors.password && "is-invalid"}`}
              value={values.password}
              onChange={handleChange}
              onFocus={() => focusContainer("passwordLogin")}
              onBlur={() => deFocusContainer("passwordLogin")}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-outline" />
          </div>
          <span>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
          </span>
        </div>
        <div className="mt-2 mb-2 d-flex">
          {error && <p className="error-message">{error}</p>}
        </div>
        <FormButton text="Login" />
      </Form>
    </div>
  );
};
