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
    material_tc: "",
    inward_inspection: "",
    invoice: "",
    heat_treatment: "",
  },
  reducers: {
    toggleDeletePoItemDialog: (state, action) => {
      state.deletePoItemDialog = action.payload;
    },
    toggleEditPoItemDialog: (state, action) => {
      state.editPoItemDialog = action.payload;
    },
    setPurchaseOrderList: (state, action) => {
      state.purchaseOrderList = action.payload
        .map((m) => {
          return {
            ...m,
            rejected_quantity: 0,
            actual_quantity: 0,
            comments: "",
            material_tc: null,
            inward_inspection: null,
            invoice: null,
            heat_treatment: null,
          };
        })
        .filter((f) => f.received_quantity !== f.quantity);
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
    setReports: (state, action) => {
      if (action.payload.name === "material_tc") {
        state.material_tc = action.payload.data;
      } else if (action.payload.name === "inward_inspection") {
        state.inward_inspection = action.payload.data;
      } else if (action.payload.name === "invoice") {
        state.invoice = action.payload.data;
      } else if (action.payload.name === "heat_treatment") {
        state.heat_treatment = action.payload.data;
      }
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
  setReports,
} = stateSlice.actions;

export default stateSlice.reducer;
