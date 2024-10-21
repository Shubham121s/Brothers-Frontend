import React, { useRef, useState } from 'react'
import { Button, Card, Select, DatePicker } from '../../../../../components/ui'
import {
  setTableData,
  getAllPoWithPagination,
  setEndDate,
  setStartDate
} from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import PoTableSearch from './PoTableSearch'
import { HiOutlineFilter } from 'react-icons/hi'
import { Months } from './constants'

const dateFormat = 'MMM DD, YYYY'

const { DatePickerRange } = DatePicker

const PoTableTools = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const poNumbers = useSelector((state) => state.po_list.data.poNumbers)
  const poaNumbers = useSelector((state) => state.po_list.data.poaNumbers)
  const startDate = useSelector(
    (state) => state.po_list.data.tableData.startDate
  )
  const endDate = useSelector((state) => state.po_list.data.tableData.endDate)

  const [poNumberValues, setPoNumberValues] = useState([])
  const [poaNumberValues, setPoaNumberValues] = useState([])
  const [monthValues, setMonthValues] = useState([])

  const handleDateChange = (value) => {}

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

  const onEdit = (e, type) => {
    const newTableData = cloneDeep(tableData)
    if (type === 'poNumber') {
      setPoNumberValues(e)
      let poNumbers = e.map((m) => m.value)
      newTableData.poNumber = JSON.stringify(poNumbers)
    } else if (type === 'poaNumber') {
      setPoaNumberValues(e)
      let poaNumbers = e.map((m) => m.value)
      newTableData.poaNumber = JSON.stringify(poaNumbers)
    } else if (type === 'months') {
      console.log(e)
      newTableData.startDate = e[0]
      newTableData.endDate = e[1]
    } else if (type === 'month') {
      setMonthValues(e)
      let months = e.map((m) => m.value)
      newTableData.months = JSON.stringify(months)
    }

    newTableData.pageIndex = 1
    dispatch(setTableData(newTableData))
  }

  const fetchData = (data) => {
    dispatch(setTableData(data))
    dispatch(getAllPoWithPagination(data))
  }

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData)
    setPoNumberValues([])
    setPoaNumberValues([])
    setMonthValues([])
    newTableData.query = ''
    newTableData.poNumber = ''
    newTableData.poaNumber = ''
    newTableData.startDate = ''
    newTableData.endDate = ''
    newTableData.months = ''
    inputRef.current.value = ''
    fetchData(newTableData)
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3>Sale Orders</h3>
        <div className="flex gap-4">
          <PoTableSearch
            ref={inputRef}
            onInputChange={handleInputChange}
          />
          <Button
            size="sm"
            icon={<HiOutlineFilter />}
            onClick={() => setOpen(() => !open)}
          >
            Filter
          </Button>
          <Button
            size="sm"
            onClick={onClearAll}
          >
            Clear All
          </Button>
        </div>
      </div>
      {open && (
        <Card className="mb-4">
          <div className="grid grid-cols-5 gap-2">
            <Select
              isMulti
              placeholder="Select POA Numbers"
              size="sm"
              options={poaNumbers}
              value={poaNumberValues}
              onChange={(e) => onEdit(e, 'poaNumber')}
            />

            <Select
              isMulti
              placeholder="Select PO Numbers"
              size="sm"
              options={poNumbers}
              value={poNumberValues}
              onChange={(e) => onEdit(e, 'poNumber')}
            />

            <DatePickerRange
              value={[startDate, endDate]}
              placeholder="Select Range"
              onChange={(e) => onEdit(e, 'months')}
              inputFormat={dateFormat}
              size="sm"
            />

            <Select
              isMulti
              placeholder="Select Months"
              size="sm"
              options={Months}
              value={monthValues}
              onChange={(e) => onEdit(e, 'month')}
            />
          </div>
        </Card>
      )}
    </>
  )
}

export default PoTableTools
