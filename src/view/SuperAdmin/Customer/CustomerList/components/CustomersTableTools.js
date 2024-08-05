import React, { useRef } from 'react'
import { Button } from '../../../../../components/ui'
import { getCustomersWithPagination, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import CustomerSheetData from './CustomerSheetData';

const CustomersTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.customer.data.tableData)

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
        dispatch(getCustomersWithPagination(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = 1
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ type: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-end mb-4">
            <div className="md:flex items-center gap-2">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <CustomerTableFilter />
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
                <CustomerSheetData />
            </div>
        </div>
    )
}

export default CustomersTableTools
