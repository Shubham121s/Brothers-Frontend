import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import { toggleEditMaterialDialog } from '../store/stateSlice'
import MaterialForm from './MaterialForm'
import { updateMaterial } from '../store/dataSlice'

const MaterialEditFormDialog = () => {

    const dispatch = useDispatch()

    const editMaterialDialog = useSelector(
        (state) => state.material.state.editMaterialDialog
    )
    const initialData = useSelector(
        (state) => state.material.state.selectedMaterial
    )

    const onDialogClose = () => {
        dispatch(toggleEditMaterialDialog(false))
    }


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(updateMaterial(values))
        setSubmitting(false)
        if (action.payload.status === 200) {
            Toast.push(
                <Notification
                    title={'Successfully updated'}
                    type="success"
                    duration={2500}
                >
                    Material Grade successfully updated
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            onDialogClose()
        }
    }

    return (
        <Dialog
            isOpen={editMaterialDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <MaterialForm
                type='edit'
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
                initialData={initialData}
            />
        </Dialog >
    )

}

export default MaterialEditFormDialog