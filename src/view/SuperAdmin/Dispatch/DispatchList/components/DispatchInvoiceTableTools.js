import React, { useRef } from 'react'
import { Button } from '../../../../../components/ui'
import { setTableData, setFilterData, getDispatchInvoiceWithPagination } from '../store/dataSlice'
import DispatchInvoiceTableSearch from './DispatchInvoiceTableSearch'
import DispatchInvoiceTableFilter from './DispatchInvoiceTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

const DispatchInvoiceTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.dispatch_invoice.data.tableData)

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
        dispatch(getDispatchInvoiceWithPagination(data))
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
        <div className="flex items-center justify-between">
            <h3 className='text-gray-700'>Invoice List</h3>
            <div className="flex items-center gap-2 mb-4">
                <DispatchInvoiceTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <DispatchInvoiceTableFilter />
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>
        </div>
    )
}

export default DispatchInvoiceTableTools
