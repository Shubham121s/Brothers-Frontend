import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  togglDeleteConfirmationDialog,
  setSelectedInstrument
} from '../store/stateSlice'
import { Notification, Toast } from '../../../../components/ui'
import { deleteInstrument, getInstrument } from '../store/dataSlice'
import { ConfirmDialog } from '../../../../components/shared'

const pushNotification = (title, type, message) => {
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

const DeleteInstrumentConfirmationDialog = () => {
  const [loading, setLoading] = useState(false)

  const tableData = useSelector((state) => state.instrument.data.tableData)

  const dispatch = useDispatch()
  const selectedInstrument = useSelector(
    (state) => state.instrument.state.selectedInstrument
  )
  const deleteDialog = useSelector(
    (state) => state.instrument.state.deleteConfirmation
  )

  const onDialogClose = () => {
    dispatch(togglDeleteConfirmationDialog(false))
    dispatch(setSelectedInstrument({}))
  }

  const onDelete = async () => {
    setLoading(true)
    const action = await dispatch(
      deleteInstrument({
        instrument_id: selectedInstrument?.instrument_id
      })
    )
    setLoading(false)
    if (action.payload?.status < 300) {
      pushNotification(
        'Successfully Deleted',
        'success',
        action.payload?.data?.message
      )
      onDialogClose()
      dispatch(getInstrument(tableData))
    } else {
      return pushNotification(
        'Unsuccessfully',
        'danger',
        action.payload?.data?.message
      )
    }
  }

  return (
    <ConfirmDialog
      isOpen={deleteDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete Instrument"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? 'Confirm' : 'Deleting...'}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Instrument? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  )
}

export default DeleteInstrumentConfirmationDialog
