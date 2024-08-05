import React, { useState } from 'react'
import { Notification, Toast } from '../../../../../../components/ui'
import { ConfirmDialog } from '../../../../../../components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteCategoryDialog } from '../store/stateSlice'
import { getAllCategories } from '../store/dataSlice'
import { apiDeleteCategory } from '../../../../../../services/SuperAdmin/Product/CategoryService'

const CategoryDeleteConfirmation = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const selectedCategory = useSelector(
        (state) => state.category.state.selectedCategory
    )
    const deleteCategoryDialog = useSelector(
        (state) => state.category.state.deleteCategoryDialog
    )
    const tableData = useSelector(
        (state) => state.category.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteCategoryDialog(false))
    }

    const onDelete = async () => {
        setLoading(true)
        const response = await apiDeleteCategory(selectedCategory)
        if (response.data?.success) {
            deleteSucceed(true)
        }
        setLoading(false)
    }

    const deleteSucceed = (success) => {
        if (success) {
            dispatch(getAllCategories(tableData))
            Toast.push(
                <Notification
                    title={'Successfully Deleted'}
                    type="success"
                    duration={2500}
                >
                    Category successfully deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            onDialogClose()
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteCategoryDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            loading={loading}
            title="Delete Category"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmText={!loading ? 'Confirm' : 'Deleting'}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this category? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default CategoryDeleteConfirmation
