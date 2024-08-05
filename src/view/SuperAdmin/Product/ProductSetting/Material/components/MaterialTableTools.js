import React, { useRef } from 'react'
import { Button } from '../../../../../../components/ui'
import { setTableData, setFilterData, getAllMaterials } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import MaterialTableFilter from './MaterialTableFIlter'
import MaterialTableSearch from './MaterialTableSearch'
import { toggleNewMaterialDialog } from '../store/stateSlice'

const MaterialTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.material.data.tableData)

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
        dispatch(getAllMaterials(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }


    const onAddMaterial = () => {
        dispatch(toggleNewMaterialDialog(true))
    }

    return (
        <div className="grid grid-cols-1 items-center gap-2">
            <div className="lg:flex items-center justify-between mb-3">
                <h4>Material Grades</h4>
                <Button size="sm" variant='solid' onClick={onAddMaterial}>
                    Add Material Grade
                </Button>
            </div>
            <div className='flex gap-2 justify-end'>
                <MaterialTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <MaterialTableFilter />
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>
        </div>
    )
}

export default MaterialTableTools
