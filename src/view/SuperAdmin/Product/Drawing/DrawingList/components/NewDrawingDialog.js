import React from 'react'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import DrawingForm from './../../DrawingForm'
import { apiPostNewDrawingRegister } from '../../../../../../services/SuperAdmin/Product/DrawingService'
import { useLocation, useNavigate } from 'react-router-dom'
import FormData from 'form-data'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNewDrawingDialog } from '../store/stateSlice'
import { getAllDrawingsByProductId } from '../store/dataSlice'

const popNotification = (keyword, type, message) => {
  Toast.push(
    <Notification
      title={keyword}
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

const NewDrawingDialog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const newDrawingDialog = useSelector(
    (state) => state.product_details.state.newDrawingDialog
  )

  const product_id = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  const handleFormSubmit = async (values, setSubmitting) => {
    const formData = new FormData()
    formData.append('process_attachment', values.process_attachment)
    formData.append('raw_attachment', values.raw_attachment)
    formData.append('finish_attachment', values.finish_attachment)
    formData.append('revision_number', values.revision_number)
    formData.append('raw_weight', values.raw_weight)
    formData.append('finish_weight', values.finish_weight)
    formData.append('product_id', product_id)
    setSubmitting(true)
    console.log(values)
    const response = await apiPostNewDrawingRegister(formData)
    setSubmitting(false)
    if (response.data?.success) {
      popNotification(
        'Successfully Added',
        'success',
        'Product Successfully created'
      )
      onDialogClose()
      dispatch(getAllDrawingsByProductId({ product_id }))
    } else {
      return popNotification('Unsuccessful', 'error', 'Product not created')
    }
  }

  const handleDiscard = () => {
    navigate('/product/list')
  }

  const onDialogClose = () => {
    dispatch(toggleNewDrawingDialog(false))
  }

  return (
    <Dialog
      width={600}
      isOpen={newDrawingDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <div className="flex flex-col h-full justify-between">
        <h5>New Drawing Revision & Attachment Information</h5>
        <p className="mb-6">
          Section to config drawing revision number & attachment information
        </p>
        <DrawingForm
          type="new"
          onDiscard={onDialogClose}
          onFormSubmit={handleFormSubmit}
        />
      </div>
    </Dialog>
  )
}

export default NewDrawingDialog
