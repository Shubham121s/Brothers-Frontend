import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "po/condition/setting/state",
  initialState: {
    newCategoryDialog: false,
    deleteCategoryDialog: false,
    editCategoryDialog: false,
    selectedCategory: {},
  },
  reducers: {
    toggleNewCategoryDialog: (state, action) => {
      state.newCategoryDialog = action.payload;
    },
    toggleDeleteCategoryDialog: (state, action) => {
      state.deleteCategoryDialog = action.payload;
    },
    toggleEditCategoryDialog: (state, action) => {
      state.editCategoryDialog = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  toggleNewCategoryDialog,
  setSelectedCategory,
  toggleEditCategoryDialog,
  toggleDeleteCategoryDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
