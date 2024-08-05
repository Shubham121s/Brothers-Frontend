import React from 'react'
import { Toast, Notification, Dialog } from '../../../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import AddressForm from './ShippingAddressForm'
import { postCustomerNewShippingAddress } from '../../store/dataSlice'
import { toggleNewShippingAddressDialog } from '../../store/stateSlice'


const NewAddressDialog = () => {

    const dispatch = useDispatch()
    const customer_id = useSelector(state => state.customer_details.state.customer_id)

    const addNewAddress = async (data) => {
        const action = await dispatch(postCustomerNewShippingAddress(data))
        return action
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const formValue = {
            ...values,
            customer_id
        }
        const action = await addNewAddress(formValue)
        setSubmitting(false)
        if (action.payload.status === 201) {
            Toast.push(
                <Notification
                    title={'Successfully Created'}
                    type="success"
                    duration={2500}
                >
                    Address successfully created
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            onDialogClose()
        }
    }

    const newShippingAddressDialog = useSelector(
        (state) => state.customer_details.state.newShippingAddressDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewShippingAddressDialog(false))
    }


    return (
        <Dialog
            isOpen={newShippingAddressDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>New Shipping Address Information</h4>
            <p className="mb-4">Section to config shipping address information</p>
            <AddressForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
            />
        </Dialog>
    )
}

export default NewAddressDialog
