import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Notification, Toast } from '../../../../../../components/ui'
import { toggleNewCategoryDialog } from '../store/stateSlice'
import CategoryForm from './CategoryForm'
import { getAllCategories, postNewCategory } from '../store/dataSlice'

const CategoryNewFormDialog = () => {

    const dispatch = useDispatch()

    const newCategoryDialog = useSelector(
        (state) => state.category.state.newCategoryDialog
    )

    const tableData = useSelector(
        (state) => state.category.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleNewCategoryDialog(false))
    }


    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const action = await dispatch(postNewCategory(values))
        setSubmitting(false)
        if (action.payload.status === 201) {
            dispatch(getAllCategories(tableData))
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
            isOpen={newCategoryDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <CategoryForm
                type='new'
                onFormSubmit={handleFormSubmit}
                onDiscard={onDialogClose}
            />
        </Dialog >
    )

}

export default CategoryNewFormDialog