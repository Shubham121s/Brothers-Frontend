import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  getAllCategories,
  getAllCustomers,
  getAllProductsWithDrawing,
  getPoDetailsByPoId,
  postUpdatePurchaseOrder
} from './store/dataSlice'
import PoForm from '../PoForm'
import editPorderReducer from './store'
import { injectReducer } from '../../../../store'
import { Notification, Toast } from '../../../../components/ui'

injectReducer('edit_porder', editPorderReducer)

const EditPO = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const po_id = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  const fetch = async () => {
    dispatch(getAllCustomers())
    dispatch(getAllProductsWithDrawing())
    dispatch(getAllCategories())
    if (po_id) {
      await dispatch(getPoDetailsByPoId({ purchase_order_id: po_id }))
    }
  }

  useEffect(() => {
    fetch()
  }, [po_id])

  const initialData = useSelector((state) => state.edit_porder.data.poDetails)
  const customers = useSelector((state) => state.edit_porder.data.customers)
  const products = useSelector((state) => state.edit_porder.data.products)
  const categories = useSelector((state) => state.edit_porder.data.categoryList)

  const editPurchaseOrder = async (data) => {
    const action = await dispatch(postUpdatePurchaseOrder(data))
    return action
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log(values)
    setSubmitting(true)
    const action = await editPurchaseOrder(values)
    setSubmitting(false)
    if (action.payload.status === 200) {
      Toast.push(
        <Notification
          title="Successfully added"
          type="success"
          duration={2500}
        >
          Purchase Order successfully Updated
        </Notification>,
        {
          placement: 'top-center'
        }
      )
      handleDiscard()
    }
  }

  const handleDiscard = () => {
    navigate('/purchaseOrder/list')
  }

  return (
    <>
      <PoForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        customers={customers}
        productsData={products}
        categories={categories}
        initialData={{
          ...initialData,
          date: initialData ? new Date(initialData.date) : null,
          category_id:
            initialData?.PurchaseOrderLists?.length > 0
              ? initialData.PurchaseOrderLists[0].Product?.category_id
              : null
        }}
      />
    </>
  )
}

export default EditPO
