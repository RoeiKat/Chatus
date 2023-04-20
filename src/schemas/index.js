import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registerSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  username: yup.string().min(5).required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Required"),
});
