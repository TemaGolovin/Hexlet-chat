import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSocket } from "../../hooks";
import { actions as modalsActions } from "../../store/slices/modalsSlice";

const Remove = () => {
  const { isOpened, targetId } = useSelector((state) => state.modals);
  const messages = useSelector((state) => state.messages);
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => dispatch(modalsActions.close());

  const hendleRemove = async () => {
    setIsSubmitting(true);
    await socket.removeChannel(targetId);
    dispatch(modalsActions.close());
    setIsSubmitting(false);
    console.log(messages);
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.removeChannel")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Modal.Title>{t("modal.confirm")}</Modal.Title>
        <Modal.Footer>
          <Form onSubmit={hendleRemove}>
            <Form.Group>
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleClose}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" variant="danger" disabled={isSubmitting}>
                {t("modal.remove")}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
