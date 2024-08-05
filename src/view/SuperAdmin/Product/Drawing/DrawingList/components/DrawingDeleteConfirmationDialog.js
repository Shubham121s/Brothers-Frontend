import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDeleteDrawingDialog } from '../store/stateSlice'
import { Notification, Toast } from '../../../../../../components/ui'
import { deleteDrawingByDrawingId } from '../store/dataSlice'
import { ConfirmDialog } from '../../../../../../components/shared'


const pushNotification = (title, type, message) => {
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

const DrawingDeleteConfirmationDialog = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const selectedDrawing = useSelector(
        (state) => state.product_details.state.selectedDrawing
    )
    const deleteDrawingDialog = useSelector(
        (state) => state.product_details.state.deleteDrawingDialog
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteDrawingDialog(false))
    }

    const onDelete = async () => {
        setLoading(true)
        const action = await dispatch(deleteDrawingByDrawingId({ drawing_id: selectedDrawing?.drawing_id }))
        setLoading(false)
        if (action.payload?.status === 200) {
            onDialogClose()
            return pushNotification('Successfully Deleted', 'success', action.payload?.data?.message)
        } else {
            return pushNotification('Unsuccessfully', 'danger', action.payload?.data?.message)
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteDrawingDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete Drawing"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmText={!loading ? 'Confirm' : 'Deleting...'}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this drawing? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default DrawingDeleteConfirmationDialog