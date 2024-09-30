import React, { useState } from 'react'
import { Notification, Toast } from '../../../../components/ui'
import { ConfirmDialog } from '../../../../components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteUserDialog } from '../store/stateSlice'
import { getAllUsers } from '../store/dataSlice'
import { apiDeleteUser } from '../../../../services/SuperAdmin/UserService'

const UserDeleteConfirmation = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const selectedUser = useSelector((state) => state.user.state.selectedUser)
  const deleteUserDialog = useSelector(
    (state) => state.user.state.deleteUserDialog
  )
  const tableData = useSelector((state) => state.user.data.tableData)

  const onDialogClose = () => {
    dispatch(toggleDeleteUserDialog(false))
  }

  const onDelete = async () => {
    setLoading(true)
    try {
      const response = await apiDeleteUser({ user_id: selectedUser.user_id })
      if (response.data?.success) {
        deleteSucceed(true)
      }
    } catch (error) {
      Toast.push(
        <Notification
          title={'Error'}
          type="danger"
          duration={2500}
        >
          User Not deleted
        </Notification>,
        {
          placement: 'top-center'
        }
      )
    }
    setLoading(false)
  }

  const deleteSucceed = (success) => {
    if (success) {
      onDialogClose()
      dispatch(getAllUsers(tableData))
      Toast.push(
        <Notification
          title={'Successfully Deleted'}
          type="success"
          duration={2500}
        >
          User successfully deleted
        </Notification>,
        {
          placement: 'top-center'
        }
      )
    }
  }

  return (
    <ConfirmDialog
      isOpen={deleteUserDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete User"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? 'Confirm' : 'Deleting'}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
    </ConfirmDialog>
  )
}

export default UserDeleteConfirmation
