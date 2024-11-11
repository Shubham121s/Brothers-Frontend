import React, { forwardRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  Dialog,
  FormContainer,
  Notification,
  Toast
} from '../../../../../components/ui'
import ItemInformationFields from './ItemInformationFields'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import {
  toggleEditPoItemDialog,
  toggleViewPoItemDialog
} from '../store/stateSlice'
import { isEmpty, cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import { updatePOListByPOListId } from '../store/dataSlice'

const validationSchema = Yup.object().shape({
  accept_description: Yup.string().required('Required'),
  accept_delivery_date: Yup.date().required('Required')
})

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

const statusColor = {
  accepted: {
    label: 'Accepted',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-600'
  },
  rejected: {
    label: 'Rejected',
    bgClass: 'bg-red-100',
    textClass: 'text-red-600'
  }
}

const EditItemDialog = forwardRef((props, ref) => {
  const { initialData, currency, po_id } = props
  const dispatch = useDispatch()

  const [rejectLoading, setRejectLoading] = useState(false)

  const editPoItemDialog = useSelector(
    (state) => state.accept_po.state.editPoItemDialog
  )

  const viewPoItemDialog = useSelector(
    (state) => state.accept_po.state.viewPoItemDialog
  )

  const onDialogClose = () => {
    if (viewPoItemDialog) {
      dispatch(toggleViewPoItemDialog(false))
    } else {
      dispatch(toggleEditPoItemDialog(false))
    }
  }

  const handleUpdatePoList = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(updatePOListByPOListId(values))
    setSubmitting(false)
    if (action.payload?.status === 200) {
      onDialogClose()
      return pushNotification(
        action.payload?.data?.message,
        'success',
        'Successfully Updated'
      )
    }
    return pushNotification(
      action.payload?.data?.message,
      'danger',
      'Unsuccessfully'
    )
  }

  const handleReject = (values, setFieldError, setFieldTouched) => {
    const { po_list_id, accept_delivery_date, accept_description } = values
    if (!accept_description) {
      setFieldTouched('accept_description', 'Required')
      return setFieldError('accept_description', 'Required')
    }
    if (!accept_delivery_date) {
      setFieldTouched('accept_delivery_date', 'Required')
      return setFieldError('accept_delivery_date', 'Required')
    }
    const newData = {
      po_id,
      po_list_id,
      accept_delivery_date,
      list_status: 'rejected',
      accept_description
    }
    handleUpdatePoList(newData, setRejectLoading)
  }

  return (
    <Dialog
      isOpen={editPoItemDialog || viewPoItemDialog}
      width={700}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,
          is_delivery_date_change: false
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values)
          const { po_list_id, accept_delivery_date, accept_description } =
            formData
          const newData = {
            po_id,
            po_list_id,
            accept_delivery_date,
            list_status: 'accepted',
            accept_description
          }
          handleUpdatePoList?.(newData, setSubmitting)
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          setFieldError,
          setFieldTouched
        }) => (
          <Form>
            <FormContainer>
              <h4>Item Details Information</h4>
              <p className="mb-2">Section to config item details information</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {!isEmpty(values) ? (
                  <Card className="mt-2 bg-slate-50">
                    <div className="flex justify-between">
                      <strong>PO Serial No :</strong>{' '}
                      <span>{values?.serial_number || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Project No :</strong>{' '}
                      <span>{values?.project_no || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Product Name :</strong>{' '}
                      <span>{values?.Product?.name || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Item Code :</strong>{' '}
                      <span>{values?.Product?.item_code || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Drawing Revision No :</strong>{' '}
                      <span>
                        {`${values?.Product?.drawing_number}-${values?.Drawing?.revision_number}` ||
                          '-'}
                      </span>
                    </div>
                  </Card>
                ) : null}
                {!isEmpty(values) ? (
                  <Card className="mt-2 bg-blue-50">
                    <div className="flex justify-between">
                      <strong>
                        Quantity ({values?.Product?.unit_measurement}):
                      </strong>{' '}
                      <span>{values?.quantity || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Price ({currency}):</strong>{' '}
                      <span>{values?.unit_price || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Amount ({currency}):</strong>{' '}
                      <span>
                        {(values?.unit_price * values?.quantity).toFixed(2) ||
                          '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Delivery Date :</strong>{' '}
                      <span>
                        {dayjs(values?.delivery_date).format('DD-MMM-YYYY') ||
                          '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Remark :</strong>{' '}
                      <span>{values?.description || '-'}</span>
                    </div>
                  </Card>
                ) : null}
              </div>
              {(viewPoItemDialog && values?.list_status === 'accepted') ||
              values?.list_status === 'rejected' ? (
                <div className="grid md:grid-cols-3 mb-3">
                  <div className="col-span-2">
                    <Card
                      className={`${statusColor[values?.list_status]?.bgClass}`}
                    >
                      <div className="flex justify-between">
                        <strong>Status :</strong>{' '}
                        {(
                          <span
                            className={`ml-2 font-semibold capitalize ${
                              statusColor[values?.list_status]?.textClass
                            }`}
                          >
                            {statusColor[values?.list_status]?.label}
                          </span>
                        ) || '-'}
                      </div>
                      <div className="flex justify-between">
                        <strong>Brother Delivery Date :</strong>{' '}
                        <span>
                          {dayjs(values?.accept_delivery_date).format(
                            'DD-MMM-YYYY'
                          ) || '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <strong>Brother Remark :</strong>{' '}
                        <span>{values?.accept_description || '-'}</span>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <ItemInformationFields
                  onDiscard={onDialogClose}
                  values={values}
                  errors={errors}
                  touched={touched}
                  currency={currency}
                />
              )}
              <div className="flex justify-end px-5 py-2 bg-gray-100 gap-2 rounded-bl-lg rounded-br-lg">
                <Button
                  size="sm"
                  type="button"
                  variant=""
                  onClick={onDialogClose}
                >
                  Discard
                </Button>
                {values?.list_status === 'accepted' ||
                values?.list_status === 'rejected' ? (
                  <Button
                    loading={isSubmitting}
                    size="sm"
                    variant="solid"
                    color="purple-500"
                  >
                    Update
                  </Button>
                ) : (
                  <>
                    <Button
                      disabled={isSubmitting}
                      loading={rejectLoading}
                      size="sm"
                      type="button"
                      variant="solid"
                      color="red-500"
                      onClick={(event) => {
                        event.preventDefault()
                        handleReject(values, setFieldError, setFieldTouched)
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      loading={isSubmitting}
                      size="sm"
                      disabled={rejectLoading}
                      variant="solid"
                      color="emerald-500"
                    >
                      Accept
                    </Button>
                  </>
                )}
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
})

EditItemDialog.defaultProps = {
  initialData: {
    currency_type: '',
    description: '',
    drawing_revision_number: '',
    delivery_date: new Date(),
    quantity: '',
    unit_price: '',
    serial_number: '',
    product: null,
    project_no: ''
  }
}

export default EditItemDialog
