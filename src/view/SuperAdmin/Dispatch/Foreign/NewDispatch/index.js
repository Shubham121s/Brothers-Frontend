import React, { useEffect, useMemo } from 'react'
import { Toast, Notification } from '../../../../../components/ui'
import {
  getAllConditions,
  getAllCustomers,
  postNewDispatchForeignInvoice
} from './store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewDispatchForeignReducer from './store'
import { injectReducer } from '../../../../../store'
import NewDispatchForm from '../NewDispatchForm'
import { useNavigate } from 'react-router-dom'

injectReducer('new_foreign_invoice', NewDispatchForeignReducer)

const pushNotification = (message, type, title) => {
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

const NewDispatch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllCustomers())
    dispatch(getAllConditions({ type: 'foreign' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const customers = useSelector(
    (state) => state.new_foreign_invoice.data.customerList
  )
  const conditions = useSelector(
    (state) => state.new_foreign_invoice.data.conditions
  )

  const conditionOption = useMemo(() => {
    return conditions?.map((m) => {
      return {
        label: m.name,
        value: { condition_id: m.condition_id, condition: m.condition }
      }
    })
  }, [conditions])

  const addProduct = async (data) => {
    const action = await dispatch(postNewDispatchForeignInvoice(data))
    return action
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    const action = await addProduct(values)
    setSubmitting(false)
    if (action?.payload?.status === 200) {
      pushNotification(
        action?.payload?.data?.message,
        'success',
        'Successfully added'
      )
      return handleDiscard()
    }
    return pushNotification(
      action?.payload?.data?.message,
      'danger',
      'Unsuccessfully'
    )
  }

  const handleDiscard = () => {
    navigate('/super/admin/dispatch-list')
  }

  return (
    <>
      <NewDispatchForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        customers={customers}
        conditions={conditionOption}
        pushNotification={pushNotification}
      />
    </>
  )
}

export default NewDispatch
