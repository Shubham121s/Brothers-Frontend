import React, { useRef } from 'react'
import { Button } from '../../../../../components/ui'
import { setTableData, getAllProducts } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import ProductTableSearch from './ProductTableSearch'

const ProductTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.product.data.tableData)

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
        dispatch(getAllProducts(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-end gap-2 mb-4">
            <ProductTableSearch
                ref={inputRef}
                onInputChange={handleInputChange}
            />
            <Button size="sm" onClick={onClearAll}>
                Clear All
            </Button>
        </div>
    )
}

export default ProductTableTools
