import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../components/ui'
import { toggleNewUserDialog } from '../store/stateSlice'
import UserForm from './UserForm'
import { getAllUsers, newUserRegister } from '../store/dataSlice'
import { apiPostNewUserRegister } from '../../../../services/SuperAdmin/UserService'


const pushNotification = (message, type, title) => {
    return (
        Toast.push(
            <Notification
                title={title}
                type={type}
                duration={2500}
            >
                {message}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    )
}

const NewUserFormDialog = () => {

    const dispatch = useDispatch()

    const newUserDialog = useSelector(
        (state) => state.user.state.newUserDialog
    )

    const tableData = useSelector(
        (state) => state.user.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleNewUserDialog(false))
    }


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(newUserRegister(values))
        setSubmitting(false)
        if (action?.payload.data?.success) {
            dispatch(getAllUsers(tableData))
            pushNotification(action?.payload?.data?.message, "success", "Successfully added")
            return onDialogClose()
        }
        return pushNotification(action?.payload?.data?.message, "danger", "Unsuccessfully")
    }

    return (
        <Dialog
            isOpen={newUserDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <UserForm
                type='new'
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
            />
        </Dialog >
    )

}

export default NewUserFormDialog