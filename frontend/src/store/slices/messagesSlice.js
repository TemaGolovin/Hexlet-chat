import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
});

const { actions } = messagesSlice;

const selectors = messagesAdapter.getSelectors((state) => state.messages);

const customSelectors = {
  selectAll: selectors.selectAll,
  selectById: (state) => {
    const { currentChannelId } = state.channels;
    const messages = selectors.selectAll(state);
    return messages.filter(({ channelId }) => channelId === currentChannelId);
  },
};

export { actions, customSelectors as selectors };

export default messagesSlice.reducer;
