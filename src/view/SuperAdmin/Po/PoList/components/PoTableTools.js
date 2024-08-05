import React, { useRef } from 'react'
import { Button } from '../../../../../components/ui'
import { setTableData, getAllPoWithPagination } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import PoTableSearch from './PoTableSearch'

const PoTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.po_list.data.tableData)

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
        dispatch(getAllPoWithPagination(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        fetchData(newTableData)
    }

    return (
        <div className="flex items-center justify-between gap-2 mb-4">
            <h3>Purchase Orders</h3>
           <div className='flex gap-4'>
           <PoTableSearch
                ref={inputRef}
                onInputChange={handleInputChange}
            />
            <Button size="sm" onClick={onClearAll}>
                Clear All
            </Button>
           </div>
        </div>
    )
}

export default PoTableTools
