import { Formik } from "formik";
import { SigninSchema } from "../../schemas/SigninSchema.js";
import React, { /*useEffect, useRef,*/ useState } from "react";
import { imgSrc } from "./img.js";
import "./Login.css";
import { apiRoutes } from "../../routes.js";
//import { Link } from "react-router-dom";
import axios from "axios";

//react-react-bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
//import { Nav } from "react-bootstrap";
//import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);

  const onSubmit = async (values) => {
    setAuthFailed(false);
    try {
      console.log(values);
      const { data } = await axios.post(apiRoutes.login(), values);
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
                  validationSchema={SigninSchema}
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
                    return (
                      <Form
                        onSubmit={handleSubmit}
                        className="col-12 col-md-11 mt-3 mt-mb-0"
                      >
                        <h1>Войти</h1>
                        <Form.Group md="11">
                          <Form.Label htmlFor="username"></Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={authFailed}
                            id="username"
                            placeholder="Ваш ник"
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
                            isInvalid={authFailed}
                            id="password"
                            placeholder="Пароль"
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
                            Войти
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
            <Card.Footer className="p-4">
              Нет аккаунта?
              <a href="../login" className="footer-link">
                Регистрация
              </a>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
