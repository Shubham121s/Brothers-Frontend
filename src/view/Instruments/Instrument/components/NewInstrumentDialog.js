import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../components/ui'
import { togglAddDialog, setSelectedInstrument } from '../store/stateSlice'
import { getInstrument } from '../store/dataSlice'
import InstrumentForm from './InstrumentForm'
import { addInstrument } from '../store/dataSlice'

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

const NewInstrumentDialog = () => {
  const dispatch = useDispatch()

  const newUserDialog = useSelector((state) => state.instrument.state.addDialog)

  const tableData = useSelector((state) => state.instrument.data.tableData)

  const onDialogClose = () => {
    dispatch(togglAddDialog(false))
    dispatch(setSelectedInstrument({}))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(addInstrument(values))
    setSubmitting(false)
    if (action?.payload.status === 201) {
      dispatch(getInstrument(tableData))
      pushNotification(
        action?.payload?.data?.message,
        'success',
        'Successfully added'
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
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  )
}

export default NewInstrumentDialog
