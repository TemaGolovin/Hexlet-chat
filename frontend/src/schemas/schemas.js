import * as yup from "yup";

export const SignupSchema = (nameMsg, passwordMsg, equalMsg, requiredMsg) =>
  yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, nameMsg)
      .max(20, nameMsg)
      .required(requiredMsg),
    password: yup.string().trim().min(5, passwordMsg).required(requiredMsg),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref("password")], equalMsg)
      .required(requiredMsg),
  });

export const SigninSchema = (message) =>
  yup.object().shape({
    username: yup.string().trim().required(message),
    password: yup.string().trim().required(message),
  });

export const messageShema = (message) =>
  yup.object().shape({
    messageText: yup.string().trim().required(message),
  });
