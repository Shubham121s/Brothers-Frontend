import React, { useRef, useState } from 'react'
import { Button, Card, Select } from '../../../../../components/ui'
import {
  setTableData,
  setAllFilterData,
  getDynamicDashboardData
} from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { HiOutlineFilter } from 'react-icons/hi'
import { MONTHS } from '../../constant'

const CustomerdashboardTableTools = ({ DeliveryStatus }) => {
  const [open, setOpen] = useState(false)
  const [customerValues, setCustomerValues] = useState([])
  const [yearValues, setyearValues] = useState([])
  const [monthValues, setMonthValues] = useState([])
  const dispatch = useDispatch()

  const tableData = useSelector(
    (state) => state.customer_dashboard.data.tableData
  )
  const CustomerOption = useSelector(
    (state) => state.customer_dashboard.data.customers
  )

  const yaerOption = useSelector((state) => state.customer_dashboard.data.years)

  const { customer_id, year, month } = useSelector(
    (state) => state.customer_dashboard.data.tableData
  )

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData)
    newTableData.customer_id = ''
    newTableData.year = ''
    newTableData.month = ''

    fetchData(newTableData)
  }

  const debounceFn = debounce((val, type) => handleDebounceFn(val, type), 50)

  function handleDebounceFn(val, type) {
    const newTableData = cloneDeep(tableData)
    if (type === 'customer') {
      setCustomerValues(val)
      let customersIds = val.map((m) => m.value)
      newTableData.customer_id = JSON.stringify(customersIds)
    } else if (type === 'year') {
      setyearValues(val)
      let years = val.map((m) => m.value)
      newTableData.year = JSON.stringify(years)
    } else if (type === 'month') {
      setMonthValues(val)
      let months = val.map((m) => m.value)
      newTableData.month = JSON.stringify(months)
    }

    newTableData.pageIndex = 1
    if (val) {
      fetchData(newTableData)
    } else {
      fetchData(newTableData)
    }
  }

  const fetchData = (data) => {
    dispatch(setTableData(data))
    dispatch(getDynamicDashboardData({ ...data }))
  }

  const onEdit = (e, type) => {
    if (type === 'customer') {
      debounceFn(e, type)
    } else if (type === 'year') {
      debounceFn(e, type)
    } else if (type === 'month') {
      debounceFn(e, type)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        {/* <h3>Master Product Planner</h3> */}
        <div></div>
        <div className="flex gap-4">
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
              placeholder="Select customer"
              size="sm"
              options={CustomerOption}
              value={customerValues}
              onChange={(e) => onEdit(e, 'customer')}
            />
            <Select
              isMulti
              placeholder="Select Year"
              size="sm"
              options={yaerOption}
              value={yearValues}
              onChange={(e) => onEdit(e, 'year')}
            />
            <Select
              isMulti
              placeholder="Select Months"
              size="sm"
              options={MONTHS}
              value={monthValues}
              onChange={(e) => onEdit(e, 'month')}
            />
          </div>
        </Card>
      )}
    </>
  )
}

export default CustomerdashboardTableTools
