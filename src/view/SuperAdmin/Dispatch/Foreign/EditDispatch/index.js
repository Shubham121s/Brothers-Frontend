import React, { useEffect, useState } from 'react'
import {
  Card,
  DatePicker,
  Toast,
  Notification,
  Button
} from '../../../../../components/ui'
import ConsigneeAndBuyerDetails from './components/ConsigneeAndBuyer/ConsigneeAndBuyerDetails'
import ShippingAddress from './components/ShippingAndShippingAddress/ShippingAddress'
import ShippingDetails from './components/ShippingAndShippingAddress/ShippingDetails'
import EditDispatchItemDialog from './components/ItemList/EditDispatchItemDialog'
import { injectReducer } from '../../../../../store'
import EditDispatchForeignReducer from './store'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllPosByCustomerId,
  getForeignInvoiceDetailsByInvoiceId,
  UpdateForeignInvoiceDate
} from './store/dataSlice'
import {
  Container,
  DoubleSidedImage,
  Loading
} from '../../../../../components/shared'
import isEmpty from 'lodash/isEmpty'
import { useLocation } from 'react-router-dom'
import ItemTable from './components/ItemList/ItemTable'
import DeleteProductConfirmationDialog from './components/ItemList/DeleteProductConfirmationDialog'
import dayjs from 'dayjs'
import {
  toggleNewBoxDialog,
  toggleAddDispatchItemDialog
} from './store/stateSlice'
import BoxTable from './components/Box/BoxTable'
import NewItemDialog from './components/ItemList/NewItemDialog'
import DeleteBoxConfirmationDialog from './components/Box/DeleteBoxConfirmationDialog'

injectReducer('edit_foreign_dispatch', EditDispatchForeignReducer)

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

const EditDispatch = () => {
  const [EditDate, setEditDate] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  const [StateDispatchList, setList] = useState(null)

  const data = useSelector(
    (state) => state.edit_foreign_dispatch.data.invoiceDetails
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data) {
      setList(data)
    }
  }, [data])

  useEffect(() => {
    const updateInvoiceDate = async () => {
      if (EditDate && EditDate !== 'Invalid Date') {
        const action = await dispatch(
          UpdateForeignInvoiceDate({
            invoice_date: dayjs(EditDate).format('YYYY-MM-DD'),
            dispatch_invoice_id: data.dispatch_invoice_id
          })
        )

        if (action.payload.status < 300) {
          pushNotification(
            'Invoice Date Successfully Updated',
            'success',
            'Successfully Updated'
          )
          fetchData()
        } else {
          pushNotification('Invoice Date Not Updated', 'danger', 'error')
        }
      }
    }

    updateInvoiceDate()
  }, [EditDate])

  const fetchData = async () => {
    const dispatch_invoice_id = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    )
    if (dispatch_invoice_id) {
      const action = await dispatch(
        getForeignInvoiceDetailsByInvoiceId({ dispatch_invoice_id })
      )

      dispatch(
        getAllPosByCustomerId({
          customer_id: action.payload.data.data?.DispatchConsignee?.customer_id,
          currency_type: 'USD'
        })
      )
    }
  }

  const date = new Date(data.invoice_date)

  const handleNewBoxAdd = (boxes = [], newBox = {}) => {
    const updatedBox = [...boxes, newBox]
    console.log(updatedBox)
    setList((prevState) => ({
      ...prevState,
      DispatchBoxLists: updatedBox
    }))
  }

  const handleEditBox = () => {
    fetchData()
  }

  const handleDeleteBox = (dispatch_box_list_id, dispatchList = []) => {}

  const addNewItemInPoList = async (updatedDispatchList) => {
    setList((prevData) => ({
      ...prevData,
      DispatchLocations: updatedDispatchList
    }))
  }

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(StateDispatchList) && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-yellow-50">
                <div className="flex justify-between items-center">
                  <span>
                    <h5 className="font-semibold text-gray-700">
                      Consignee & Buyer Information
                    </h5>
                    <p className="mb-2">
                      Section to config consignee & buyer information
                    </p>
                  </span>
                  <div>
                    <DatePicker
                      style={{ width: '160px' }}
                      placeholder="Invoice Date"
                      value={date}
                      onChange={(date) => {
                        setEditDate(date)
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <ConsigneeAndBuyerDetails
                    title="Consignee"
                    data={StateDispatchList?.DispatchConsignee}
                    address={
                      StateDispatchList?.DispatchConsignee
                        ?.DispatchConsigneeAddress
                    }
                  />
                  <ConsigneeAndBuyerDetails
                    title="Buyer"
                    data={StateDispatchList?.DispatchBuyer}
                    address={StateDispatchList?.DispatchShippingAddress}
                  />
                </div>
              </Card>
              <Card className="bg-blue-50 h-max">
                <h5 className="font-semibold text-gray-700">
                  Address & Shipping Information
                </h5>
                <p className="mb-2">
                  Section to config address & shipping information
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <ShippingAddress
                    data={StateDispatchList?.DispatchShippingAddress}
                  />
                  <ShippingDetails
                    data={StateDispatchList?.DispatchShippingDetail}
                  />
                </div>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <Card
                className="bg-yellow-50 h-max"
                bodyClass="pb-0"
              >
                <div className="flex justify-between items-center">
                  <span>
                    <h5 className="font-semibold text-gray-700">
                      Box Information
                    </h5>
                    <p className="mb-2">Section to config box information</p>
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="solid"
                    onClick={() => {
                      dispatch(toggleNewBoxDialog(true))
                    }}
                  >
                    Add Box
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <BoxTable
                    values={StateDispatchList?.DispatchBoxLists}
                    handleNewBoxAdd={handleNewBoxAdd}
                    handleDeleteBox={handleDeleteBox}
                    handleEditBox={handleEditBox}
                    invoiceId={StateDispatchList?.dispatch_invoice_id}
                    dispatchList={StateDispatchList.DispatchLocations}
                  />
                </div>
              </Card>
            </div>
            <Card className="my-4">
              {StateDispatchList.DispatchLocations.map((list, index) => {
                return (
                  <div
                    className={
                      StateDispatchList.DispatchLocations.length - 1 === index
                        ? ''
                        : 'mb-5'
                    }
                  >
                    <div className="flex justify-between items-center h-full mb-2">
                      {index === 0 ? (
                        <div>
                          <h5 className="font-semibold text-gray-700">
                            POs Information
                          </h5>
                          <p>Section to config POs list information</p>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex gap-2 justify-end items-center h-full">
                        <h2 className="text-gray-500">{list?.location_code}</h2>
                        <Button
                          type="button"
                          variant="solid"
                          color="pink-500"
                          size="sm"
                          onClick={() => {
                            dispatch(
                              toggleAddDispatchItemDialog({
                                option: true,
                                locationIndex: index
                              })
                            )
                          }}
                        >
                          Add Item
                        </Button>
                      </div>
                    </div>
                    <ItemTable
                      initialData={list.DispatchLists}
                      boxes={StateDispatchList?.DispatchBoxLists}
                    />
                    <NewItemDialog
                      locationIndex={index}
                      addNewItemInPoList={addNewItemInPoList}
                      dispatchList={StateDispatchList.DispatchLocations}
                      boxes={StateDispatchList?.DispatchBoxLists}
                      invoiceId={StateDispatchList?.dispatch_invoice_id}
                    />
                  </div>
                )
              })}
              <EditDispatchItemDialog
                dispatchList={StateDispatchList.DispatchLocations}
                fetchData={fetchData}
              />
              <DeleteProductConfirmationDialog fetchData={fetchData} />
              <DeleteBoxConfirmationDialog fetchData={fetchData} />
            </Card>
          </>
        )}
      </Loading>
      {!loading && isEmpty(StateDispatchList) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No invoice found!"
          />
          <h3 className="mt-8">No Invoice found!</h3>
        </div>
      )}
    </Container>
  )
}

export default EditDispatch
