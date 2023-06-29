import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Message from "./Messages";
import MessageInput from "./MessageInput.jsx";

import { selectors as channelsSelectors } from "../../../store/slices/channelsSlice";
import { selectors as messagesSelectors } from "../../../store/slices/messagesSlice";

const MessagesBox = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const currentMessages = useSelector(messagesSelectors.selectById);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannel?.name}</b>
          </p>
          <span className="text-muted">
            {t("messagesCounter.messages", { count: currentMessages.length })}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => {
            <Message key={message.id} message={message} />;
          })}
        </div>
        <MessageInput />
      </div>
    </Col>
  );
};

export default MessagesBox;
