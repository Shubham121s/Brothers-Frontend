import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../components/ui'
import { toggleEditUserDialog } from '../store/stateSlice'
import UserForm from './UserForm'
import { updateUserDetails } from '../store/dataSlice'

const UserEditFormDialog = () => {
  const dispatch = useDispatch()

  const editUserDialog = useSelector((state) => state.user.state.editUserDialog)
  const initialData = useSelector((state) => state.user.state.selectedUser)

  const onDialogClose = () => {
    dispatch(toggleEditUserDialog(false))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await dispatch(updateUserDetails(values))
    setSubmitting(false)
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={'Successfully updated'}
          type="success"
          duration={2500}
        >
          User successfully updated
        </Notification>,
        {
          placement: 'top-center'
        }
      )
      onDialogClose()
    }
  }

  return (
    <Dialog
      isOpen={editUserDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <UserForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={onDialogClose}
        initialData={initialData}
      />
    </Dialog>
  )
}

export default UserEditFormDialog
