import React, { useRef } from 'react'
import { Button } from '../../../../components/ui'
import { setTableData, setFilterData, getInstrument } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import InstrumentTableSearch from './InstrumentTableSearch'
import { togglAddDialog } from '../store/stateSlice'

const InstrumentTableTools = () => {
  const dispatch = useDispatch()

  const inputRef = useRef()

  const tableData = useSelector((state) => state.instrument.data.tableData)

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
    dispatch(getInstrument(data))
  }

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData)
    newTableData.query = ''
    inputRef.current.value = ''
    dispatch(setFilterData({ type: '' }))
    fetchData(newTableData)
  }

  const onAddInstrument = () => {
    dispatch(togglAddDialog(true))
  }

  return (
    <div className="md:flex items-center justify-end gap-2 mb-4">
      <InstrumentTableSearch
        ref={inputRef}
        onInputChange={handleInputChange}
      />

      <Button
        size="sm"
        onClick={onClearAll}
      >
        Clear All
      </Button>
      <Button
        size="sm"
        variant="solid"
        onClick={onAddInstrument}
      >
        Add Instrument
      </Button>
    </div>
  )
}

export default InstrumentTableTools
