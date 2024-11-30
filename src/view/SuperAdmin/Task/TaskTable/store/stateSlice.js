import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "task/state",
  initialState: {
    newTaskDialog: false,
    deleteTaskDialog: false,
    editTaskDialog: false,
    selectedTask: {},
    selectedChat: {},
    newEyeDialog: false,
  },
  reducers: {
    toggleNewTaskDialog: (state, action) => {
      state.newTaskDialog = action.payload;
    },
    toggleDeleteTaskDialog: (state, action) => {
      state.deleteTaskDialog = action.payload;
    },
    toggleEditTaskDialog: (state, action) => {
      state.editTaskDialog = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setSelectedChat: (state, action) => {
      console.log("action.payload", action.payload);
      state.selectedChat = action.payload;
    },

    toggleEyeDialog: (state, action) => {
      state.newEyeDialog = action.payload;
    },
  },
});

export const {
  toggleNewTaskDialog,
  setSelectedTask,
  setSelectedChat,
  toggleEditTaskDialog,
  toggleDeleteTaskDialog,
  toggleEyeDialog,
} = stateSlice.actions;
export default stateSlice.reducer;
