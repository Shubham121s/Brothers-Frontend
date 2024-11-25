import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "chat/state",
  initialState: {
    selectedChat: {},
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setSelectedChat } = stateSlice.actions;

export default stateSlice.reducer;
