import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from '../../../../../../../components/ui'
import ItemForm from './ItemForm';
import { toggleAddDispatchItemDialog } from '../../../NewDispatch/store/stateSlice';


const NewDispatchItemDialog = (props) => {
    const { boxes = [], locationIndex, setFieldValue, dispatchList = [], addNewItemInPoList } = props
    const dispatch = useDispatch()

    const addDispatchItemDialog = useSelector(
        (state) => state.new_foreign_invoice.state.addDispatchItemDialog
    )

    const onDialogClose = () => {
        dispatch(toggleAddDispatchItemDialog({ option: false, locationIndex: null }))
    }


    const handleNewItem = (values) => {
        addNewItemInPoList?.(dispatchList, values, locationIndex, setFieldValue)
        // onDialogClose()
    }


    return (
        <Dialog
            isOpen={addDispatchItemDialog.option && locationIndex === addDispatchItemDialog.locationIndex}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <ItemForm
                boxes={boxes}
                type='new'
                dispatchList={dispatchList}
                handleFormSubmit={handleNewItem}
                onDiscard={onDialogClose}
            />
        </Dialog >
    )
}



export default memo(NewDispatchItemDialog)