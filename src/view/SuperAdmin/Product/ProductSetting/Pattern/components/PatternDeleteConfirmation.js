import React, { useState } from 'react'
import { Notification, Toast } from '../../../../../../components/ui'
import { ConfirmDialog } from '../../../../../../components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeletePatternDialog } from '../store/stateSlice'
import { getAllPatterns } from '../store/dataSlice'
import { apiDeletePattern } from '../../../../../../services/SuperAdmin/Product/PatternService'

const PatternDeleteConfirmation = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const selectedPattern = useSelector(
        (state) => state.pattern.state.selectedPattern
    )
    const deletePatternDialog = useSelector(
        (state) => state.pattern.state.deletePatternDialog
    )
    const tableData = useSelector(
        (state) => state.pattern.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeletePatternDialog(false))
    }

    const onDelete = async () => {
        setLoading(true)
        const response = await apiDeletePattern(selectedPattern)
        if (response.data?.success) {
            deleteSucceed(true)
        }
        setLoading(false)
    }

    const deleteSucceed = (success) => {
        if (success) {
            onDialogClose()
            dispatch(getAllPatterns(tableData))
            Toast.push(
                <Notification
                    title={'Successfully Deleted'}
                    type="success"
                    duration={2500}
                >
                    Pattern successfully deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deletePatternDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete Pattern"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmText={!loading ? 'Confirm' : 'Deleting'}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this pattern? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default PatternDeleteConfirmation
