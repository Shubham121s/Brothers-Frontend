import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "inward/state",
  initialState: {
    deletePoItemDialog: false,
    editPoItemDialog: false,
    purchaseOrderList: [],
    inward_date: new Date(),
    bill_no: "",
    bill_date: "",
    challan_no: "",
    challan_date: "",
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
    setBillNo: (state, action) => {
      state.bill_no = action.payload;
    },
    setBillDate: (state, action) => {
      state.bill_date = action.payload;
    },
    setChallanNo: (state, action) => {
      state.challan_no = action.payload;
    },
    setChallanDate: (state, action) => {
      state.challan_date = action.payload;
    },
  },
});

export const {
  toggleEditPoItemDialog,
  toggleDeletePoItemDialog,
  setPurchaseOrderList,
  setPurchaseOrderListData,
  setInwardDate,
  setBillDate,
  setBillNo,
  setChallanDate,
  setChallanNo,
} = stateSlice.actions;

export default stateSlice.reducer;
