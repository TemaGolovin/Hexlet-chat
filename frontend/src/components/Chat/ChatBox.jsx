import ChannelsBox from "./Channels/ChannelsBox";
import MessagesBox from "./Messages/MessagesBox";
import { useSelector } from "react-redux";

const statuses = {
  loading: "loading",
  loaded: "loaded",
  loadError: "loadError",
};

const ChatBox = () => {
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);
  switch (loadingStatus) {
    case statuses.loading:
      return <p>loading...</p>;
    case statuses.loaded:
      return (
        <>
          <ChannelsBox />
          <MessagesBox />
        </>
      );
    case statuses.loadError:
      return <p>error</p>;
    default:
      return <p>default</p>;
  }
};

export default ChatBox;
