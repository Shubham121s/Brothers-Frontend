import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import { toggleEditCategoryDialog } from '../store/stateSlice'
import CategoryForm from './CategoryForm'
import { updateCategory } from '../store/dataSlice'

const CategoryEditFormDialog = () => {

    const dispatch = useDispatch()

    const editCategoryDialog = useSelector(
        (state) => state.category.state.editCategoryDialog
    )
    const initialData = useSelector(
        (state) => state.category.state.selectedCategory
    )

    const onDialogClose = () => {
        dispatch(toggleEditCategoryDialog(false))
    }


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(updateCategory(values))
        setSubmitting(false)
        if (action.payload.status === 200) {
            Toast.push(
                <Notification
                    title={'Successfully updated'}
                    type="success"
                    duration={2500}
                >
                    Category successfully updated
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
            isOpen={editCategoryDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <CategoryForm
                type='edit'
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
                initialData={initialData}
            />
        </Dialog >
    )

}

export default CategoryEditFormDialog