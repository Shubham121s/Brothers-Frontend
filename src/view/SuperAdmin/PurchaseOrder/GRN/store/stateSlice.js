import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "inward/state",
  initialState: {
    deletePoItemDialog: false,
    editPoItemDialog: false,
    purchaseOrderList: [],
    inward_date: new Date(),
  },
  reducers: {
    toggleDeletePoItemDialog: (state, action) => {
      state.deletePoItemDialog = action.payload;
    },
    toggleEditPoItemDialog: (state, action) => {
      state.editPoItemDialog = action.payload;
    },
    setPurchaseOrderList: (state, action) => {
      state.purchaseOrderList = action.payload || [];
    },
    setPurchaseOrderListData: (state, action) => {
      const { id, field, value } = action.payload;
      state.purchaseOrderList = state.purchaseOrderList.map((item) => {
        if (item.purchase_order_list_id === id) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });
    },
    setInwardDate: (state, action) => {
      state.inward_date = action.payload;
    },
  },
});

export const {
  toggleEditPoItemDialog,
  toggleDeletePoItemDialog,
  setPurchaseOrderList,
  setPurchaseOrderListData,
  setInwardDate,
} = stateSlice.actions;

export default stateSlice.reducer;
