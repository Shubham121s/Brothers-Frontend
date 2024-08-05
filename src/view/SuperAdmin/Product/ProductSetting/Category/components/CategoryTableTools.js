import React, { useRef } from 'react'
import { Button } from '../../../../../../components/ui'
import { setTableData, setFilterData, getAllCategories } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import CategoryTableSearch from './CategoryTableSearch'
import CategoryTableFilter from './CategoryTableFIlter'
import { toggleNewCategoryDialog } from '../store/stateSlice'

const CategoryTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.category.data.tableData)

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getAllCategories(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }


    const onDialogOpen = () => {
        dispatch(toggleNewCategoryDialog(true))
    }

    return (
        <div className="grid grid-cols-1 items-center gap-2 mb-3">
            <div className="lg:flex items-center justify-between">
                <h4>Categories</h4>
                <Button size="sm" variant='solid' onClick={onDialogOpen}>
                    Add Category
                </Button>
            </div>
            <div className='flex gap-2 justify-end'>
                <CategoryTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <CategoryTableFilter />
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>
        </div>
    )
}

export default CategoryTableTools
