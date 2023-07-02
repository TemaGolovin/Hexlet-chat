import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import fetchDataThunk from "./thunk.js";
import { createSelector } from "@reduxjs/toolkit";
import {
  selectors as channelsSelectors,
  actions as channelsActions,
} from "./channelsSlice.js";

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload.messages);
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const messagesToRemove = Object.values(state.entities)
          .filter((message) => message.channelId === action.payload)
          .map((message) => message.id);

        messagesAdapter.removeMany(state, messagesToRemove);
      });
  },
});

const { actions } = messagesSlice;

const selectors = messagesAdapter.getSelectors((state) => state.messages);

const customSelectors = {
  selectAll: selectors.selectAll,
  selectById: createSelector(
    [selectors.selectAll, channelsSelectors.selectCurrentChannelId],
    (messages, currentChannelId) => {
      return messages.filter(({ channelId }) => channelId === currentChannelId);
    }
  ),
};

export { actions, customSelectors as selectors };

export default messagesSlice.reducer;
