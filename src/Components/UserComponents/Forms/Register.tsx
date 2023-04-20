import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { Button, Form } from "react-bootstrap";
import { registerSchema } from "../../../schemas";
import { userRegister } from "../../../API/User/user-register";
import {
  checkTakenEmail,
  checkTakenUsername,
} from "../../../API/User/check-taken";

export const Register = function () {
  const waitForInMS: number = 2000;
  const dispatch = useAppDispatch();
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
        dispatch(userRegister(data));
      },
    });

  useEffect(() => {
    if (values.email) {
      const emailTimer = setTimeout(() => {
        checkTakenEmail(values.email).then((results) => {
          if (results.status === 200) {
            setValidEmail(true);
          } else if (results.status === 206) {
            return;
          } else {
            setErrors({ email: "Already taken" });
          }
        });
      }, waitForInMS);
      return () => clearTimeout(emailTimer);
    }
  }, [values.email, setErrors]);

  useEffect(() => {
    if (values.username) {
      const usernameTimer = setTimeout(() => {
        checkTakenUsername(values.username).then((results) => {
          console.log(results.status);
          if (results.status === 200 || 304) {
            setValidUserName(true);
          } else if (results.status === 206) {
            return;
          } else {
            setErrors({ email: "Already taken" });
          }
        });
      }, waitForInMS);
      return () => clearTimeout(usernameTimer);
    }
  }, [values.username, setErrors]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={values.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValidEmail(false);
          handleChange(e);
        }}
        className={`form-control ${errors.email && `is-invalid`} ${
          validEmail && "is-valid"
        }`}
        onBlur={handleBlur}
        placeholder="Email"
      />
      <p className="text-warning">{errors.email}</p>
      <label htmlFor="username">Username</label>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValidUserName(false);
          handleChange(e);
        }}
        type="text"
        id="username"
        value={values.username}
        className={`form-control ${errors.username && `is-invalid`} ${
          validUsername && "is-valid"
        }`}
        onBlur={handleBlur}
        placeholder="Username"
      />
      <p className="text-warning">{errors.username}</p>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={values.password}
        className={`form-control ${errors.password && `is-invalid`}`}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Password"
      />
      <p className="text-warning">{errors.password}</p>
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        type="password"
        value={values.confirmPassword}
        className={`form-control ${errors.confirmPassword && `is-invalid`}`}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Confirm password"
      />
      <p className="text-warning">{errors.confirmPassword}</p>
      <Button type="submit" variant="primary">
        Register
      </Button>
    </Form>
  );
};
