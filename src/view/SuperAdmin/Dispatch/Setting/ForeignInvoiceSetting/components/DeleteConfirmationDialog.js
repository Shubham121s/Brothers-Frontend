import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDeleteConditionDialog } from '../store/stateSlice'
import { Notification, Toast } from '../../../../../../components/ui'
import { getAllConditions, deleteCondition } from '../store/dataSlice'
import { ConfirmDialog } from '../../../../../../components/shared'

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

const DeleteConditionDialog = ({ type }) => {
  const [loading, setLoading] = useState(false)

  const tableData = useSelector((state) => state.condition.data.tableData)

  const dispatch = useDispatch()
  const selectedCondition = useSelector(
    (state) => state.condition.state.selectedCondition
  )
  const deleteDialog = useSelector(
    (state) => state.condition.state.deleteConditionDialog
  )

  const onDialogClose = () => {
    dispatch(toggleDeleteConditionDialog(false))
  }

  const onDelete = async () => {
    setLoading(true)
    const action = await dispatch(
      deleteCondition({
        condition_id: selectedCondition?.condition_id
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
      dispatch(getAllConditions({ ...tableData, type }))
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
      title="Delete Condition"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? 'Confirm' : 'Deleting...'}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Condition? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  )
}

export default DeleteConditionDialog
