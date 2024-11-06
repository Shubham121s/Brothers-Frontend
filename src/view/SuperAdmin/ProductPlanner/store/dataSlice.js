import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiGetAllPoLists,
  apiGetPoListByPOListId
} from '../../../../services/SuperAdmin/Po/PoService'
import { apiGetAllCustomersOption } from '../../../../services/SuperAdmin/Customer/CustomerService'
import { apiGetMaterialGradesOption } from '../../../../services/SuperAdmin/Product/MaterialGradeService'
import {
  apiGetAllProductsItemCodeOption,
  apiGetAllProductsOption
} from '../../../../services/SuperAdmin/Product/IndexService'
import { apiGetAllDrawingOption } from '../../../../services/SuperAdmin/Product/DrawingService'
import {
  apiGetAllProjectNumbers,
  apiGetPoNumber,
  apiGetAllSerialNumber,
  apiGetPODates,
  apiGetPODeliveryDates,
  apiGetPOBrotherAcceptDates,
  apiGetRawDates,
  apiGetMachiningDates,
  apiPutAttachmentsPoList,
  apideleteAttachmentsPoList
} from '../../../../services/SuperAdmin/Po/PoService'
import { apiUpdateDispatchMachiningRawDate } from '../../../../services/SuperAdmin/Invoice/DispatchServices'

export const getAllPoLists = createAsyncThunk(
  'po/lists/data/',
  async (data) => {
    try {
      const response = await apiGetAllPoLists(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)
export const getAllCustomerOption = createAsyncThunk(
  'po/lists/data/customer',
  async (data) => {
    try {
      const response = await apiGetAllCustomersOption(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllMaterialGradeOption = createAsyncThunk(
  'po/lists/data/materialGrade',
  async (data) => {
    try {
      const response = await apiGetMaterialGradesOption()
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllProductItemCode = createAsyncThunk(
  'po/lists/data/itemCode',
  async (data) => {
    try {
      const response = await apiGetAllProductsItemCodeOption()
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllProductOption = createAsyncThunk(
  'po/lists/data/product',
  async (data) => {
    try {
      const response = await apiGetAllProductsOption(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllDrawingOption = createAsyncThunk(
  'po/lists/data/drawing/revision',
  async (data) => {
    try {
      const response = await apiGetAllDrawingOption()
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllProjectNumber = createAsyncThunk(
  'po/lists/data/project/number',
  async (data) => {
    try {
      const response = await apiGetAllProjectNumbers(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllPoNumber = createAsyncThunk(
  'po/lists/data/po/number',
  async (data) => {
    try {
      const response = await apiGetPoNumber(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllSerialNumber = createAsyncThunk(
  'po/lists/data/serial/number',
  async (data) => {
    try {
      const response = await apiGetAllSerialNumber(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const UpdateRawMachiningDate = createAsyncThunk(
  'po/lists/data/raw/machining/date',
  async (data) => {
    try {
      const response = await apiUpdateDispatchMachiningRawDate(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getPODates = createAsyncThunk(
  'po/lists/data/raw/po/date',
  async (data) => {
    try {
      const response = await apiGetPODates(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getPODeliveryDates = createAsyncThunk(
  'po/lists/data/raw/po/delivery/date',
  async (data) => {
    try {
      const response = await apiGetPODeliveryDates(data)

      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getBrotherDeliveryDate = createAsyncThunk(
  'po/lists/data/raw/po/delivery/accept/date',
  async (data) => {
    try {
      const response = await apiGetPOBrotherAcceptDates(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getRawDate = createAsyncThunk(
  'po/lists/data/raw/dispatch/list/raw/date',
  async (data) => {
    try {
      const response = await apiGetRawDates(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getMachinigDate = createAsyncThunk(
  'po/lists/data/raw/dispatch/list/machining/date',
  async (data) => {
    try {
      const response = await apiGetMachiningDates(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const putAttachment = createAsyncThunk(
  'po/lists/data/raw/dispatch/list/atachment',
  async (data) => {
    try {
      const response = await apiPutAttachmentsPoList(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const deleteAttachment = createAsyncThunk(
  'po/lists/data/raw/dispatch/list/atachment/delete',
  async (data) => {
    try {
      const response = await apideleteAttachmentsPoList(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getPoListById = createAsyncThunk(
  'po/lists/data/raw/dispatch/list/po',
  async (data) => {
    try {
      const response = await apiGetPoListByPOListId(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: '',
  customer: '',
  project_no: '',
  po_no: '',
  po_serial_no: '',
  product: '',
  item_code: '',
  revision_no: '',
  material_grade: '',
  po_Date: '',
  po_del_Date: '',
  brother_Date: '',
  raw_date: '',
  machining_date: ''
}

export const initialFilterData = {
  status: ''
}

const dataSlice = createSlice({
  name: 'po/lists/data',
  initialState: {
    poLists: [],
    customers: [],
    materialGrades: [],
    itemCodes: [],
    products: [],
    revision: [],
    projectNumber: [],
    poNumber: [],
    serialNumber: [],
    poDates: [],
    poDeliverydate: [],
    brotherDeliveryDate: [],
    rawDates: [],
    machiningDate: [],
    loading: false,
    tableData: initialTableData,
    filterData: initialFilterData,
    attachmentDialog: false,
    viewDialog: false,
    selectedPOList: {},
    poListData: {}
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload
    },
    toggleAttachmentDialog: (state, action) => {
      state.attachmentDialog = action.payload
    },
    toggleViewDialog: (state, action) => {
      state.viewDialog = action.payload
    },
    setSelectedPoList: (state, action) => {
      state.selectedPOList = action.payload
    },
    setAllFilterData: (state, action) => {
      state.materialGrades = []
      state.itemCodes = []
      state.products = []
      state.revision = []
      state.projectNumber = []
      state.poNumber = []
      state.serialNumber = []
      state.poDates = []
      state.poDeliverydate = []
      state.brotherDeliveryDate = []
      state.rawDates = []
      state.machiningDate = []
    }
  },
  extraReducers: {
    [getAllPoLists.fulfilled]: (state, action) => {
      state.tableData.total = action.payload.data.total || 0
      state.loading = false
      state.poLists = action.payload.data?.data || []
    },
    [getAllPoLists.pending]: (state, action) => {
      state.loading = true
    },
    [getAllCustomerOption.fulfilled]: (state, action) => {
      const customers = action.payload.data?.data || []
      return {
        ...state,
        customers: [...customers]
      }
    },
    [getAllMaterialGradeOption.fulfilled]: (state, action) => {
      const materialGrades = action.payload.data?.data || []
      return {
        ...state,
        materialGrades: [
          { label: 'ALL Material Grades', value: '' },
          ...materialGrades
        ]
      }
    },
    [getAllProductItemCode.fulfilled]: (state, action) => {
      const itemCodes = action.payload.data?.data || []
      return {
        ...state,
        itemCodes: [{ label: 'ALL Item Codes', value: '' }, ...itemCodes]
      }
    },
    [getAllProductOption.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || []
    },
    [getAllDrawingOption.fulfilled]: (state, action) => {
      const revision = action.payload.data?.data || []
      return {
        ...state,
        revision: [{ label: 'ALL Revision Number', value: '' }, ...revision]
      }
    },
    [getAllProjectNumber.fulfilled]: (state, action) => {
      state.projectNumber = action.payload.data?.data || []
    },
    [getAllPoNumber.fulfilled]: (state, action) => {
      state.poNumber = action.payload.data?.data || []
    },
    [getAllSerialNumber.fulfilled]: (state, action) => {
      state.serialNumber = action.payload.data?.data || []
    },

    [UpdateRawMachiningDate.pending]: (state, action) => {
      state.loading = true
    },
    [UpdateRawMachiningDate.fulfilled]: (state, action) => {
      state.loading = false
    },
    [getPODates.fulfilled]: (state, action) => {
      state.poDates = action.payload.data.data
    },
    [getPODeliveryDates.fulfilled]: (state, action) => {
      state.poDeliverydate = action.payload.data.data
    },
    [getBrotherDeliveryDate.fulfilled]: (state, action) => {
      state.brotherDeliveryDate = action.payload.data.data
    },
    [getRawDate.fulfilled]: (state, action) => {
      state.rawDates = action.payload.data.data
    },
    [getMachinigDate.fulfilled]: (state, action) => {
      state.machiningDate = action.payload.data.data
    },
    [putAttachment.fulfilled]: (state, action) => {},
    [deleteAttachment.fulfilled]: (state, action) => {},
    [getPoListById.fulfilled]: (state, action) => {
      state.poListData = action.payload.data.data
    }
  }
})

export const {
  setFilterData,
  setTableData,
  toggleAttachmentDialog,
  setSelectedPoList,
  toggleViewDialog,
  setAllFilterData
} = dataSlice.actions

export default dataSlice.reducer
