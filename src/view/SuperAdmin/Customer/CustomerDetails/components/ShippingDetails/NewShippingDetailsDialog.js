import React from 'react'
import { Toast, Notification, Dialog } from '../../../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNewShippingDetailsDialog } from '../../store/stateSlice'
import { postCustomerNewShippingDetails } from '../../store/dataSlice'
import ShippingDetailsForm from './ShippingDetailsForm'


const NewShippingDetailsDialog = () => {

    const dispatch = useDispatch()
    const customer_id = useSelector(state => state.customer_details.state.customer_id)

    const addNewShippingAddress = async (data) => {
        const action = await dispatch(postCustomerNewShippingDetails(data))
        return action
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const formValue = {
            ...values,
            customer_id
        }
        const action = await addNewShippingAddress(formValue)
        setSubmitting(false)
        if (action.payload.status === 201) {
            Toast.push(
                <Notification
                    title={'Successfully Created'}
                    type="success"
                    duration={2500}
                >
                    Shipping address successfully created
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            onDialogClose()
        }
    }

    const newShippingDetailsDialog = useSelector(
        (state) => state.customer_details.state.newShippingDetailsDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewShippingDetailsDialog(false))
    }


    return (
        <Dialog
            isOpen={newShippingDetailsDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>New Shipping Details Information</h4>
            <p className="mb-4">Section to config shipping details information</p>
            <ShippingDetailsForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
            />
        </Dialog>
    )
}

export default NewShippingDetailsDialog
