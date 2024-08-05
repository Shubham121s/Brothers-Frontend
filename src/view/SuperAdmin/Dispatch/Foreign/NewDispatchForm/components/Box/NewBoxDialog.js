import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from '../../../../../../../components/ui'
import { toggleNewBoxDialog } from '../../../NewDispatch/store/stateSlice'
import BoxForm from './BoxForm'


const NewBoxDialog = (props) => {
    const { handleNewBox, boxNo = 1 } = props
    const dispatch = useDispatch()

    const newBoxDialog = useSelector(
        (state) => state.new_foreign_invoice.state.newBoxDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewBoxDialog(false))
    }



    return (
        <Dialog
            isOpen={newBoxDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <BoxForm
                index={boxNo}
                type='new'
                handleFormSubmit={handleNewBox}
                onDiscard={onDialogClose}
            />
        </Dialog >
    )
}



export default NewBoxDialog