import { useFormik } from "formik";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Form } from "react-bootstrap";
import { registerSchema } from "../../../schemas";
import { userRegister } from "../../../API/User/user-register";
import {
  focusContainer,
  deFocusContainer,
} from "../../../util/focus-container";
import { useValuesCheck } from "../../../hooks/useValuesCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FormHeader } from "./FormHeader";
import { FormButton } from "./FormButton";
import { ColorPicker } from "./ColorPicker";

export const Register = function () {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const [color, setColor] = useState<string>("#268fe8");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validUsername, setValidUserName] = useState<boolean>(false);
  const { values, errors, handleBlur, handleChange, handleSubmit, setErrors } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit(data) {
        if (!validEmail && !validUsername) return;
        if (!loading) {
          dispatch(userRegister({ color, ...data }));
        }
      },
    });
  useValuesCheck(
    values.email,
    (str: string) => setErrors({ email: str }),
    (bool: boolean) => setValidEmail(bool),
    "email"
  );
  useValuesCheck(
    values.username,
    (str: string) => setErrors({ username: str }),
    (bool: boolean) => setValidUserName(bool),
    "username"
  );

  return (
    <div className="col-11 d-flex">
      <div className="col-12 col-md-8">
        <FormHeader text="Create a new account" />
        <Form noValidate onSubmit={handleSubmit}>
          <div className="d-flex flex-column flex-md-row">
            <div className="col-12 col-md-6">
              <div
                id="emailRegister"
                className={`p-2 d-flex align-items-center text-light input-container ${
                  errors.email && "input-error"
                } ${validEmail && "input-valid"}`}
              >
                <div className="d-flex col-11 flex-column-reverse">
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    value={values.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValidEmail(false);
                      handleChange(e);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      deFocusContainer("emailRegister");
                    }}
                    onFocus={() => focusContainer("emailRegister")}
                  />
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                </div>
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <p className="error-message">{errors.email}</p>
            </div>
            <div className="mx-0 mx-md-2 col-12 col-md-6">
              <div
                className={`p-2 d-flex align-items-center text-light input-container ${
                  errors.username && "input-error"
                } ${validUsername && "input-valid"}`}
              >
                <div className="d-flex col-11 flex-column-reverse">
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValidUserName(false);
                      handleChange(e);
                    }}
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={values.username}
                    className={`${errors.username && `is-invalid`} ${
                      validUsername && "is-valid"
                    }`}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                </div>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <p className="error-message">{errors.username}</p>
            </div>
          </div>
          <div className="mt-1 d-flex flex-column flex-md-row">
            <div className="col-12 col-md-6">
              <div
                id="passRegister"
                className={`p-2 d-flex align-items-center text-light input-container ${
                  errors.password && "input-error"
                }`}
              >
                <div className="d-flex col-11 flex-column-reverse">
                  <input
                    id="password"
                    type="password"
                    autoComplete="off"
                    value={values.password}
                    className={`${errors.password && `is-invalid`}`}
                    onChange={handleChange}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      deFocusContainer("passRegister");
                    }}
                    onFocus={() => focusContainer("passRegister")}
                  />
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                </div>
                <span>
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <p className="error-message">{errors.password}</p>
            </div>
            <div className="mx-0 mx-md-2 col-12 col-md-6">
              <div
                id="confirmRegister"
                className={`p-2 d-flex align-items-center text-light input-container ${
                  errors.confirmPassword && "input-error"
                }`}
              >
                <div className="d-flex col-11 flex-column-reverse">
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="off"
                    value={values.confirmPassword}
                    className={`${errors.confirmPassword && `is-invalid`}`}
                    onChange={handleChange}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      deFocusContainer("confirmRegister");
                    }}
                    onFocus={() => focusContainer("confirmRegister")}
                  />
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                </div>
              </div>
              <p className="error-message">{errors.confirmPassword}</p>
            </div>
          </div>
          <div className="mb-3 d-block d-md-none col-12">
            <ColorPicker
              setColor={(color: string) => setColor(color)}
              color={color}
              username={values.username}
            />
          </div>
          <FormButton text="Register" />
        </Form>
      </div>
      <div className="mb-5 d-none d-md-flex justify-content-center align-items-center mx-4 col-4">
        <ColorPicker
          setColor={(color: string) => setColor(color)}
          color={color}
          username={values.username}
        />
      </div>
    </div>
  );
};
