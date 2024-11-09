import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../components/ui'
import { togglePasswordDialog } from '../store/stateSlice'
import { getAllUsers, newUserRegister } from '../store/dataSlice'
import { ConfirmDialog, PasswordInput } from '../../../../components/shared'
import { apiUpdateUserPassword } from '../../../../services/SuperAdmin/UserService'

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

const UserPasswordUpdateDialog = () => {
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')

  const UserPasswordDialog = useSelector(
    (state) => state.user.state.passwordDialog
  )

  const selectedUser = useSelector((state) => state.user.state.selectedUser)

  const tableData = useSelector((state) => state.user.data.tableData)

  const onDialogClose = () => {
    dispatch(togglePasswordDialog(false))
  }

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true)
    const action = await apiUpdateUserPassword({
      password: password,
      user_id: selectedUser.user_id
    })
    setSubmitting(false)
    if (action?.data?.success) {
      dispatch(getAllUsers(tableData))
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
    <ConfirmDialog
      isOpen={UserPasswordDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="success"
      title="Change Password"
      onCancel={onDialogClose}
      onConfirm={handleFormSubmit}
      confirmText={'Save'}
      confirmButtonColor="purple-600"
      width={450}
    >
      <PasswordInput
        className="mt-4"
        placeholder="New Password"
        style={{ width: '300px' }}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
    </ConfirmDialog>
  )
}

export default UserPasswordUpdateDialog
