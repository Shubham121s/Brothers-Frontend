import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import { toggleEditPatternDialog } from '../store/stateSlice'
import {  updatePattern } from '../store/dataSlice'
import PatternForm from './PatternForm'

const PatternEditFormDialog = () => {

    const dispatch = useDispatch()

    const editPatternDialog = useSelector(
        (state) => state.pattern.state.editPatternDialog
    )
    const initialData = useSelector(
        (state) => state.pattern.state.selectedPattern
    )

    const onDialogClose = () => {
        dispatch(toggleEditPatternDialog(false))
    }


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(updatePattern(values))
        setSubmitting(false)
        if (action.payload.status === 200) {
            Toast.push(
                <Notification
                    title={'Successfully updated'}
                    type="success"
                    duration={2500}
                >
                    Pattern successfully updated
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
            isOpen={editPatternDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <PatternForm
                type='edit'
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
                initialData={initialData}
            />
        </Dialog >
    )

}

export default PatternEditFormDialog