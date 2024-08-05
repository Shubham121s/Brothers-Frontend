import React from 'react'
import { Toast, Notification } from '../../../../components/ui'
import { useNavigate } from 'react-router-dom'
import { injectReducer } from '../../../../store'
import { useDispatch } from 'react-redux'
import { postRegisterNewCustomer } from './store/dataSlice';
import newCustomerReducer from './store'
import CustomerForm from '../CustomerForm'

injectReducer('new_customer', newCustomerReducer)

const pushNotification = (message, title, type) => {
    return (
        Toast.push(
            <Notification
                title={title}
                type={type}
                duration={2500}
            >
                {message}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    )
}

const NewCustomer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(postRegisterNewCustomer(values))
        setSubmitting(false)
        if (action.payload?.status === 201) {
            navigate(`/super/admin/customer-details/${action.payload?.data?.data?.customer_id}`)
            return pushNotification(action.payload?.data.message, 'Successfully added', 'success')
        }
        else
            return pushNotification(action.payload?.data.message, 'Unsuccessfully added', 'danger')
    }

    const handleDiscard = () => {
        navigate('/super/admin/customer/list')
    }

    return (
        <CustomerForm
            type="new"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
        />
    )
}

export default NewCustomer
