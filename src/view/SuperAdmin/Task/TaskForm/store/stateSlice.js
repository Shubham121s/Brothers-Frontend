import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "product/setting/pattern/state",
  initialState: {
    newTaskDialog: false,
    deleteTaskDialog: false,
    editTaskDialog: false,
    selectedTask: {},
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
  },
});

export const {
  toggleNewTaskDialog,
  setSelectedTask,
  toggleEditTaskDialog,
  toggleDeleteTaskDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
