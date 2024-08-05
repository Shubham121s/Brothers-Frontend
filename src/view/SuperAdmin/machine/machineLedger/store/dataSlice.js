import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ca } from "date-fns/locale";

// import {
//   apiGetAllLedgerByRetailerId,
//   apiGetRetailerDetailsByRetailerId,
//   apiPayLedgerAmountByRetailerId,
//   apiGetAllRetailerOrdersByRetailerId,
// } from "../../../../../services/LedgerService";
import { apiGetBreakdown } from "services/Breakdown";
import { apiGetAnnualCalibration } from "services/Calibration";
import { apiGetMachineById } from "services/Machine";
import { apiDeleteMachine } from "services/Machine";


export const getMachineById = createAsyncThunk(
  "machine/data/getMachineById",
  async (data) => {
    const response = await apiGetMachineById(data);
    return response.data;
  }
);
// export const getBreakdown = createAsyncThunk(
//     'breakdown/data/getBreakdown',
//     async (data) => {
//         const response = await apiGetBreakdown(data)
//         return response.data
//     }
// )
export const getAnnual = createAsyncThunk(
    'calibration/data/getCalibration',
    async (data) => {
        const response = await apiGetAnnualCalibration(data)
        return response.data
    }
)

// export const getAllLedgerListByRetailerId = createAsyncThunk(
//   "serviceDetail/data/ledger/get",
//   async (data) => {
//     try {
//       const response = await apiGetAllLedgerByRetailerId(data);
//       return response;
//     } catch (error) {
//       return error?.response || error.toString();
//     }
//   }
// );

// export const getRetailerDetailsByretailerId = createAsyncThunk(
//   "serviceDetail/retailer/get",
//   async (data) => {
//     try {
//       const response = await apiGetRetailerDetailsByRetailerId(data);
//       return response;
//     } catch (error) {
//       return error?.response || error.toString();
//     }
//   }
// );

// export const postPayLedgerAmountByRetailerId = createAsyncThunk(
//   "serviceDetail/data/details/ledger/debit",
//   async (data) => {
//     try {
//       const response = await apiPayLedgerAmountByRetailerId(data);
//       return response;
//     } catch (error) {
//       return error?.response || error.toString();
//     }
//   }
// );

// export const getAllRetailerOrdersByRetailerId = createAsyncThunk(
//   "order/retailer",
//   async (data) => {
//     try {
//       const response = await apiGetAllRetailerOrdersByRetailerId(data);
//       return response;
//     } catch (error) {
//       return error?.response || error.toString();
//     }
//   }
// );

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
};

export const initialFilterData = {
  status: "",
};

export const initialTableDataOrder = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
};

export const initialFilterDataOrder = {
  status: "",
};

const dataSlice = createSlice({
  name: "ledgerDetail/data",
  initialState: {
    loading: false,
    message: "",
    retailerLedgerList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
    
    breakdownList: [],
    calibrationList: [],
    

    retailerDetailsLoading: false,
    retailerDetails: {},
    retailerMessage: "",
    retailerPendingAmount: 0,

    orderLoading: false,
    orderList: [],
    tableDataOrder: initialTableDataOrder,
    filterDataOrder: initialFilterDataOrder,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setReatilerLedgerList: (state, action) => {
      state.retailerLedgerList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setFilterDataOrder: (state, action) => {
      state.filterDataOrder = action.payload;
    },
  },
  extraReducers: {
    [getMachineById.fulfilled]: (state, action) => {
      state.breakdownList = action.payload.data || []
      state.tableData.total = action.payload.total || 0
      state.loading = false;
      console.log(action.payload.data)
    },
    [getMachineById.pending]: (state) => {
      state.loading = true;
    },
    [getAnnual.fulfilled]: (state, action) => {
      state.calibrationList = action.payload.data || []
      state.tableData.total = action.payload.total || 0
      state.loading = false;
      console.log(action.payload.data)
    },
    [getAnnual.pending]: (state) => {
      state.loading = true;
    },
  
     
   
    // [getBreakdown.fulfilled]: (state, action) => {
    //     state.breakdownList = action.payload.data || []
    //     state.tableData.total = action.payload.total || 0
    //     state.loading = false
    //     console.log(action.payload.data)
    // },
    // [getBreakdown.pending]: (state) => {
    //     state.loading = true
    // },
    // [getAllLedgerListByRetailerId.fulfilled]: (state, action) => {
    //   state.retailerLedgerList = action.payload?.data?.data || [];
    //   state.tableData.total = action.payload?.data?.total;
    //   if (action.meta.arg?.pageIndex === 1) {
    //     state.retailerPendingAmount =
    //       action.payload?.data?.data?.length > 0
    //         ? -action.payload?.data?.data[0].balance
    //         : 0;
    //   }
    //   state.loading = false;
    // },
    // [getAllLedgerListByRetailerId.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getAllLedgerListByRetailerId.rejected]: (state) => {
    //   state.loading = false;
    //   state.retailerLedgerList = [];
    //   state.tableData.total = 0;
    // },
    // [getRetailerDetailsByretailerId.fulfilled]: (state, action) => {
    //   state.retailerDetailsLoading = false;
    //   state.retailerDetails = action.payload?.data?.data || {};
    // },
    // [getRetailerDetailsByretailerId.pending]: (state) => {
    //   state.retailerDetailsLoading = true;
    // },
    // [getRetailerDetailsByretailerId.rejected]: (state) => {
    //   state.retailerDetails = {};
    //   state.retailerDetailsLoading = true;
    // },
    // [postPayLedgerAmountByRetailerId.fulfilled]: (state) => {},
    // [getAllRetailerOrdersByRetailerId.fulfilled]: (state, action) => {
    //   state.orderLoading = false;
    //   state.orderList = action.payload?.data?.data || {};
    //   state.tableDataOrder.total = action.payload?.data?.total || 0;
    // },
    // [getAllRetailerOrdersByRetailerId.pending]: (state) => {
    //   state.orderLoading = true;
    // },
    // [getAllRetailerOrdersByRetailerId.rejected]: (state) => {
    //   state.orderList = [];
    //   state.orderLoading = false;
    //   state.tableDataOrder.total = 0;
    // },
  },
});

export const {
  setTableData,
  setRetailerLedgerList,
  setFilterData,
  setFilterDataOrder,
} = dataSlice.actions;

export default dataSlice.reducer;
