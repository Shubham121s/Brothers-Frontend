import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../components/ui'
import { togglEditDialog, setSelectedInstrument } from '../store/stateSlice'
import { getInstrument } from '../store/dataSlice'
import InstrumentForm from './InstrumentForm'
import { putInstrument } from '../store/dataSlice'

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

const EditInstrumentDialog = () => {
  const dispatch = useDispatch()

  const newUserDialog = useSelector(
    (state) => state.instrument.state.editDialog
  )

  const tableData = useSelector((state) => state.instrument.data.tableData)
  const selectedInstrument = useSelector(
    (state) => state.instrument.state.selectedInstrument
  )

  const onDialogClose = () => {
    dispatch(togglEditDialog(false))
    dispatch(setSelectedInstrument({}))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(putInstrument(values))
    setSubmitting(false)
    if (action?.payload.status === 200) {
      dispatch(getInstrument(tableData))
      pushNotification(
        action?.payload?.data?.message,
        'success',
        'Successfully upated'
      )
      return onDialogClose()
    }
    return pushNotification(
      action?.payload?.data?.message,
      'danger',
      'Unsuccessfully'
    )
  }

  return (
    <Dialog
      isOpen={newUserDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <InstrumentForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
        initialData={{ ...selectedInstrument }}
      />
    </Dialog>
  )
}

export default EditInstrumentDialog
