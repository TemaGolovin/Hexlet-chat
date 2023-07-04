import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { addChannelSchema } from "../../schemas/schemas";
import { selectors as channelsSelectors } from "../../store/slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSocket } from "../../hooks";
import { actions as modalsActions } from "../../store/slices/modalsSlice";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useRollbar } from "@rollbar/react";

const Rename = () => {
  const channels = useSelector(channelsSelectors.selectChannelsNames);
  const isOpened = useSelector((state) => state.modals.isOpened);
  const targetId = useSelector((state) => state.modals.targetId);
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const channelName = useSelector((state) =>
    channelsSelectors.selectById(state, targetId)
  ).name;
  const rollbar = useRollbar();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      body: channelName,
    },
    validationSchema: addChannelSchema(
      channels,
      t("modal.unique"),
      t("modal.lengthChannelName")
    ),
    onSubmit: async ({ body }) => {
      try {
        await socket.renameChannel({ id: targetId, name: body });
        dispatch(modalsActions.close());
        toast.success(t("success.renameChannel"));
      } catch (error) {
        toast.error(t("errors.channelRename"));
        rollbar.error("renameChannel", error);
      }
    },
  });

  const handleClose = () => dispatch(modalsActions.close());
  const isInvalidName = formik.errors.body && formik.touched.body;

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{t("modal.rename")}</Modal.Title>
        <Button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
          data-bs-dismiss="modal"
        ></Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              type="text"
              ref={inputRef}
              id="body"
              name="body"
              isInvalid={isInvalidName}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.body}
            />
            <Form.Label visuallyHidden htmlFor="body">
              {t("modal.channelName")}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.body}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                {t("send")}
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
