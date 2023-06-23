import * as yup from "yup";

export const SigninSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "errorMin3")
    .max(20, "errorMax20")
    .required("errorUsername"),
  password: yup
    .string()
    .min(5, "errors.validatePassMin5")
    .required("errorPass"),
});
