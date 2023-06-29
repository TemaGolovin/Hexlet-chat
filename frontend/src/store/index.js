import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./slices/channelsSlice.js";
import messagesSlice from "./slices/messagesSlice.js";

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesSlice,
  },
});
