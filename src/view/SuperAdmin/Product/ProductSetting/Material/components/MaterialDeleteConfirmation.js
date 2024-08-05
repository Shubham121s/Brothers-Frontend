import React, { useState } from 'react'
import { Notification, Toast } from '../../../../../../components/ui'
import { ConfirmDialog } from '../../../../../../components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteMaterialDialog } from '../store/stateSlice'
import { getAllMaterials } from '../store/dataSlice'
import { apiDeleteMaterialGrades } from '../../../../../../services/SuperAdmin/Product/MaterialGradeService'

const MaterialDeleteConfirmation = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const selectedMaterial = useSelector(
        (state) => state.material.state.selectedMaterial
    )
    const deleteMaterialDialog = useSelector(
        (state) => state.material.state.deleteMaterialDialog
    )
    const tableData = useSelector(
        (state) => state.material.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteMaterialDialog(false))
    }

    const onDelete = async () => {
        setLoading(true)
        const response = await apiDeleteMaterialGrades(selectedMaterial)
        if (response.data?.success) {
            deleteSucceed(true)
        }
        setLoading(false)
    }

    const deleteSucceed = (success) => {
        if (success) {
            onDialogClose()
            dispatch(getAllMaterials(tableData))
            Toast.push(
                <Notification
                    title={'Successfully Deleted'}
                    type="success"
                    duration={2500}
                >
                    Material Grade successfully deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMaterialDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete Material"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmText={!loading ? 'Confirm' : 'Deleting'}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this material grade? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default MaterialDeleteConfirmation
