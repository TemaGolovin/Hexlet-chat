import { Formik } from "formik";
import { SigninSchema } from "../../schemas/schemas.js";
import React, { /*useEffect, useRef,*/ useState } from "react";
import { imgSrc } from "./img.js";
import "./Login.css";
import { apiRoutes, appPaths } from "../../routes.js";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks";

//react-bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
//import { Nav } from "react-bootstrap";
//import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setAuthFailed(false);
    try {
      console.log(values);
      const { data } = await axios.post(apiRoutes.login(), values);
      logIn(data);
      navigate(appPaths.chat);
      console.log(data);
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        return;
      }
      throw err;
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="text-center Login-card shadow-sm">
            <Row>
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="img" src={imgSrc} alt="login" />
              </Col>
              <Col className="col-form">
                <Formik
                  initialValues={{ username: "", password: "" }}
                  validationSchema={SigninSchema(t("errors.required"))}
                  className="w-100"
                  onSubmit={onSubmit}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleSubmit,
                  }) => {
                    const isInvalidUsername =
                      touched.username && errors.username;
                    const isInvalidPassword =
                      touched.password && errors.password;

                    return (
                      <Form
                        onSubmit={handleSubmit}
                        className="col-12 col-md-11 mt-3 mt-mb-0"
                      >
                        <h1>{t("entry")}</h1>
                        <Form.Group md="11">
                          <Form.Label htmlFor="username"></Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={authFailed || isInvalidUsername}
                            id="username"
                            placeholder={t("placeholders.yourNickname")}
                          />
                          {errors.username && touched.username ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                        <Form.Group md="11">
                          <Form.Label htmlFor="password"></Form.Label>
                          <Form.Control
                            required
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={authFailed || isInvalidPassword}
                            id="password"
                            placeholder={t("placeholders.password")}
                          />
                          {errors.password && touched.password ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                        <div className="d-grid gap-2">
                          <Button
                            variant="outline-primary"
                            className="Login-button mt-3"
                            type="submit"
                          >
                            {t("entry")}
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
            <Card.Footer className="p-4">
              {t("noAccount")}{" "}
              <Link to={appPaths.signUp} className="footer-link">
                {t("makeRegistration")}
              </Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
