import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import { toggleNewMaterialDialog } from '../store/stateSlice'
import { getAllMaterials, postNewMaterial } from '../store/dataSlice'
import MaterialForm from './MaterialForm'

const MaterialNewFormDialog = () => {

    const dispatch = useDispatch()

    const newMaterialDialog = useSelector(
        (state) => state.material.state.newMaterialDialog
    )

    const tableData = useSelector(
        (state) => state.material.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleNewMaterialDialog(false))
    }


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(postNewMaterial(values))
        setSubmitting(false)
        if (action.payload.status === 201) {
            dispatch(getAllMaterials(tableData))
            Toast.push(
                <Notification
                    title={'Successfully added'}
                    type="success"
                    duration={2500}
                >
                    Category successfully added
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
            isOpen={newMaterialDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <MaterialForm
                type='new'
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
            />
        </Dialog >
    )

}

export default MaterialNewFormDialog