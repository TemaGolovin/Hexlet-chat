import { Button, Form, InputGroup } from "react-bootstrap";
import { SendFill } from "react-bootstrap-icons";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectors as channelsSelectors } from "../../../store/slices/channelsSlice";
import { messageShema } from "../../../schemas/schemas.js";

const MessageForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(
    channelsSelectors.selectCurrentChannelId
  );
  const inputMessage = useRef(null);

  const formik = useFormik({
    initialValues: { messageText: "" },

    validationSchema: messageShema(t("messageCannotEmpty")),

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (inputMessage.current) {
      inputMessage.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    if (formik.values.messageText === "") {
      inputMessage.current.focus();
    }
  }, [formik.values.messageText]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className="py-1 border rounded-2"
      >
        <InputGroup hasValidation={!formik.dirty || !formik.isValid}>
          <Form.Control
            ref={inputMessage}
            className="border-0 p-0 ps-2"
            name="messageText"
            type="text"
            placeholder={t("placeholders.newMessage")}
            aria-label={t("newMessage")}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            value={formik.values.messageText}
          />

          <Button
            variant="light"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            <SendFill size={15} color="DodgerBlue" />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
