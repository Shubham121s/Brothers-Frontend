import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'customer_details/state',
    initialState: {
        newShippingAddressDialog: false,
        deleteShippingAddressDialog: false,
        editShippingAddressDialog: false,
        selectedShippingAddress: {},
        newShippingDetailsDialog: false,
        deleteShippingDetailsDialog: false,
        editShippingDetailsDialog: false,
        selectedShippingDetails: {},
        customer_id: ''
    },
    reducers: {
        toggleNewShippingAddressDialog: (state, action) => {
            state.newShippingAddressDialog = action.payload
        },
        toggleDeleteShippingAddressDialog: (state, action) => {
            state.deleteShippingAddressDialog = action.payload
        },
        toggleEditShippingAddressDialog: (state, action) => {
            state.editShippingAddressDialog = action.payload
        },
        setSelectedShippingAddress: (state, action) => {
            state.selectedShippingAddress = action.payload
        },
        toggleNewShippingDetailsDialog: (state, action) => {
            state.newShippingDetailsDialog = action.payload
        },
        toggleDeleteShippingDetailsDialog: (state, action) => {
            state.deleteShippingDetailsDialog = action.payload
        },
        toggleEditShippingDetailsDialog: (state, action) => {
            state.editShippingDetailsDialog = action.payload
        },
        setSelectedShippingDetails: (state, action) => {
            state.selectedShippingDetails = action.payload
        },
        setCustomerId: (state, action) => {
            state.customer_id = action.payload
        }
    },
})

export const { toggleNewShippingAddressDialog, setSelectedShippingAddress, toggleEditShippingAddressDialog, toggleDeleteShippingAddressDialog, toggleNewShippingDetailsDialog, setSelectedShippingDetails, toggleEditShippingDetailsDialog, toggleDeleteShippingDetailsDialog, setCustomerId } =
    stateSlice.actions

export default stateSlice.reducer
