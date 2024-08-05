import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import {
//   apiGetPurchaseOrderDetailsByPurchaseORderId,
//   apiUpdatePurchaseOrderListByPurchaseOrderListId,
//   apiUpdatePurchaseOrderListByPurchaseOrderListIdOnQuantityReceived,
//   apiGetAllGRN,
//   apiGetGRNDetails,
// } from "../../../../../services/SuperAdmin/Stock/StockService";
// import { apiUpdatePurchaseOrderStatus } from "../../../../../services/SuperAdmin/PurchaseOrder/PurchaseOrderService";

import {
  apiGetPurchaseOrderDetailsByPurchaseORderId,
  apiUpdatePurchaseOrderStatus,
} from "../../../../../services/SuperAdmin/PruchaseOrder/PurchaseOrderService";
export const getPoDetailsByPoId = createAsyncThunk(
  "po/details/data/details",
  async (data) => {
    try {
      const response = await apiGetPurchaseOrderDetailsByPurchaseORderId(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const updatePOListByPOListId = createAsyncThunk();
// "po/details/data/list/update",
// async (data) => {
//   try {
//     const response = await apiUpdatePurchaseOrderListByPurchaseOrderListId(
//       data
//     );
//     return response;
//   } catch (error) {
//     return error.response;
//   }
// }

export const updatePurchaseOrderStatus = createAsyncThunk(
  "po/details/data/status",
  async (data) => {
    try {
      const response = await apiUpdatePurchaseOrderStatus(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const dataSlice = createSlice({
  name: "po/details/data",
  initialState: {
    poDetails: {},
    grn: [],
    loading: false,
    grnDetails: [],
  },
  reducers: {},
  extraReducers: {
    [getPoDetailsByPoId.fulfilled]: (state, action) => {
      state.loading = false;
      state.poDetails = action.payload.data?.data || {};
    },
    [getPoDetailsByPoId.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePOListByPOListId.fulfilled]: (state, action) => {
      if (action.payload?.status === 200) {
        state.poDetails = {
          ...state.poDetails,
          PurchaseOrderLists: state.poDetails?.PurchaseOrderLists.map(
            (list) => {
              if (
                list.purchase_order_list_id ===
                action.meta.arg.purchase_order_list_id
              ) {
                const { list_status } = action.meta.arg;
                return {
                  ...list,
                  list_status,
                };
              }
              return { ...list };
            }
          ),
        };
      }
    },

    [updatePurchaseOrderStatus.fulfilled]: (state, action) => {},
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
