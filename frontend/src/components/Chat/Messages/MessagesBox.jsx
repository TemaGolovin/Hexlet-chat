import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useWordFilter } from "../../../hooks";

import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput.jsx";

import { selectors as channelsSelectors } from "../../../store/slices/channelsSlice";
import { selectors as messagesSelectors } from "../../../store/slices/messagesSlice";

const MessagesBox = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const currentMessages = useSelector(messagesSelectors.selectById);
  const filterProfanity = useWordFilter();
  const channelName = filterProfanity(currentChannel?.name);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {channelName}</b>
          </p>
          <span className="text-muted">
            {t("messagesCounter.messages", { count: currentMessages.length })}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => {
            return <Messages key={message.id} message={message} />;
          })}
        </div>
        <MessageInput />
      </div>
    </Col>
  );
};

export default MessagesBox;
