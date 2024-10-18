import React, { useEffect } from 'react'
import { Toast, Notification } from '../../../../components/ui'
import { useLocation, useNavigate } from 'react-router-dom'
import { injectReducer } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { updateCustomer, getCustomerDetails } from './store/dataSlice'
import EditCustomerReducer from './store'
import CustomerForm from '../CustomerForm'

injectReducer('edit_customer', EditCustomerReducer)

const pushNotification = (message, title, type) => {
  return Toast.push(
    <Notification
      title={title}
      type={type}
      duration={2500}
    >
      {message}
    </Notification>,
    {
      placement: 'top-center'
    }
  )
}

const NewCustomer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const customer_id = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  const initialData = useSelector(
    (state) => state.edit_customer.data.customerDetails
  )

  useEffect(() => {
    const fetchData = () => {
      dispatch(getCustomerDetails({ customer_id: customer_id }))
    }
    fetchData()
  }, [])

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(updateCustomer(values))
    setSubmitting(false)
    if (action.payload?.status < 300) {
      navigate(`/customer/list`)
      return pushNotification(
        action.payload?.data.message,
        'Successfully added',
        'success'
      )
    } else
      return pushNotification(
        action.payload?.data.message,
        'Unsuccessfully added',
        'danger'
      )
  }

  const handleDiscard = () => {
    navigate('/customer/list')
  }

  return (
    <CustomerForm
      type="edit"
      initialData={{ ...initialData, code: initialData.customer_code }}
      onFormSubmit={handleFormSubmit}
      onDiscard={handleDiscard}
    />
  )
}

export default NewCustomer
