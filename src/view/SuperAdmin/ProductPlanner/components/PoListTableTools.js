import React, { useRef, useState } from 'react'
import {
  Button,
  Card,
  Input,
  DatePicker,
  Select
} from '../../../../components/ui'
import CreatableSelect from 'react-select/creatable'
import {
  setTableData,
  getAllPoLists,
  getAllPoNumber,
  getAllProjectNumber,
  getAllSerialNumber,
  getPODates,
  getPODeliveryDates,
  getBrotherDeliveryDate,
  getAllProductOption,
  setAllFilterData
} from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import PoListTableSearch from './PoListSearch'
import { HiOutlineFilter } from 'react-icons/hi'
import ReportButton from './ReportButton'
import { json } from 'react-router-dom'

const dateFormat = 'MMM DD, YYYY'

const PoListTableTools = ({ DeliveryStatus }) => {
  const [open, setOpen] = useState(false)
  const [poDateVAlues, setPoDateValues] = useState([])
  const [poDeliveryVAlues, setPoDeliveryVAlues] = useState([])
  const [BrotherDeliveryVAlues, setBrotherDeliveryVAlues] = useState([])
  const dispatch = useDispatch()

  const tableData = useSelector((state) => state.masterPP.data.tableData)
  const CustomerOption = useSelector((state) => state.masterPP.data.customers)
  const materialGradeOption = useSelector(
    (state) => state.masterPP.data.materialGrades
  )
  const itemCodeOption = useSelector((state) => state.masterPP.data.itemCodes)
  const productOption = useSelector((state) => state.masterPP.data.products)
  const RevisionOption = useSelector((state) => state.masterPP.data.revision)
  const projectNumbers = useSelector(
    (state) => state.masterPP.data.projectNumber
  )
  const PoNumber = useSelector((state) => state.masterPP.data.poNumber)
  const serialNumber = useSelector((state) => state.masterPP.data.serialNumber)
  const PoDates = useSelector((state) => state.masterPP.data.poDates)
  const PoDeliveryDates = useSelector(
    (state) => state.masterPP.data.poDeliverydate
  )
  const brotherDeliveryDate = useSelector(
    (state) => state.masterPP.data.brotherDeliveryDate
  )
  const rawDates = useSelector((state) => state.masterPP.data.rawDates)
  const machiningDate = useSelector(
    (state) => state.masterPP.data.machiningDate
  )

  const {
    po_Date,
    po_del_Date,
    brother_Date,
    customer,
    project_no,
    po_no,
    po_serial_no,
    product,
    item_code,
    revision_no,
    material_grade,
    raw_date,
    machining_date
  } = useSelector((state) => state.masterPP.data.tableData)

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData)
    dispatch(setAllFilterData([]))
    newTableData.customer = ''
    newTableData.project_no = ''
    newTableData.po_serial_no = ''
    newTableData.product = ''
    newTableData.item_code = ''
    newTableData.revision_no = ''
    newTableData.material_grade = ''
    newTableData.po_no = ''
    newTableData.po_Date = ''
    newTableData.po_del_Date = ''
    newTableData.brother_Date = ''
    newTableData.raw_date = ''
    newTableData.machining_date = ''
    setBrotherDeliveryVAlues([])
    setPoDateValues([])
    setPoDeliveryVAlues([])

    fetchData(newTableData)
  }

  const searchInput = useRef()

  const debounceFn = debounce((val, type) => handleDebounceFn(val, type), 50)

  function handleDebounceFn(val, type) {
    const newTableData = cloneDeep(tableData)
    if (type === 'customer') {
      newTableData.customer = val
    } else if (type === 'project_no') {
      newTableData.project_no = val
    } else if (type === 'po_serial_no') {
      newTableData.po_serial_no = val
    } else if (type === 'product_name') {
      newTableData.product = val
    } else if (type === 'item_code') {
      newTableData.item_code = val
    } else if (type === 'revision_number') {
      newTableData.revision_no = val
    } else if (type === 'material_grade') {
      newTableData.material_grade = val
    } else if (type === 'po_number') {
      console.log(val)
      newTableData.po_no = val
    } else if (type === 'po_date') {
      setPoDateValues(val)
      let poDates = val.map((m) => m.value)
      newTableData.po_Date = JSON.stringify(poDates)
    } else if (type === 'brothers_date') {
      setBrotherDeliveryVAlues(val)
      let brotherDates = val.map((m) => m.value)
      newTableData.brother_Date = JSON.stringify(brotherDates)
    } else if (type === 'po_del_date') {
      setPoDeliveryVAlues(val)
      let deliveryDates = val.map((m) => m.value)
      newTableData.po_del_Date = JSON.stringify(deliveryDates)
    } else if (type === 'raw_date') {
      newTableData.raw_date = val
    } else if (type === 'machining_date') {
      newTableData.machining_date = val
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
    dispatch(getAllPoLists({ ...data, DeliveryStatus }))
  }

  const onEdit = (e, type) => {
    if (type === 'customer') {
      dispatch(getAllPoNumber({ customer_id: e.value, DeliveryStatus }))
      // dispatch(getPODates({ customer_id: e.value }));
      // dispatch(getPODeliveryDates({ customer_id: e.value }));
      // dispatch(getBrotherDeliveryDate({ customer_id: e.value }));
      debounceFn(e.value, type)
    } else if (type === 'material_grade') {
      debounceFn(e.value, type)
    } else if (type === 'item_code') {
      debounceFn(e.value, type)
    } else if (type === 'product_name') {
      debounceFn(e.value, type)
    } else if (type === 'revision_number') {
      debounceFn(e.value, type)
    } else if (type === 'project_no') {
      dispatch(
        getAllSerialNumber({
          project_no: e.value,
          number: po_no,
          DeliveryStatus
        })
      )
      debounceFn(e.value, type)
    } else if (type === 'po_number') {
      dispatch(getAllProjectNumber({ number: e.value, DeliveryStatus }))
      dispatch(getPODates({ number: e.value, DeliveryStatus }))
      dispatch(getPODeliveryDates({ number: e.value, DeliveryStatus }))
      dispatch(getBrotherDeliveryDate({ number: e.value, DeliveryStatus }))
      debounceFn(e.value, type)
    } else if (type === 'po_serial_no') {
      dispatch(
        getAllProductOption({
          project_no: project_no,
          number: po_no,
          serial_number: e.value,
          DeliveryStatus
        })
      )
      debounceFn(e.value, type)
    } else if (type === 'po_date') {
      debounceFn(e, type)
    } else if (type === 'po_del_date') {
      debounceFn(e, type)
    } else if (type === 'brothers_date') {
      debounceFn(e, type)
    } else if (type === 'raw_date') {
      debounceFn(e.value, type)
    } else if (type === 'machining_date') {
      debounceFn(e.value, type)
    } else {
      debounceFn(e.targert.value, type)
    }
  }

  const handleDateChange = (value, type) => {
    const newTableData = cloneDeep(tableData)
    if (type === 'po_date') {
      newTableData.po_Date = value
    } else if (type === 'po_del_date') {
      newTableData.po_del_Date = value
    } else if (type === 'brothers_date') {
      newTableData.brother_Date = value
    } else if (type === 'raw_date') {
      newTableData.raw_date = value
    } else if (type === 'machining_date') {
      newTableData.machining_date = value
    }
    fetchData(newTableData)
  }
  console.log(po_no)
  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3>Master Product Planner</h3>
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
          <ReportButton DeliveryStatus={DeliveryStatus} />
        </div>
      </div>
      {open && (
        <Card className="mb-4">
          <div className="grid grid-cols-5 gap-2">
            <Select
              options={CustomerOption}
              value={CustomerOption.filter(
                (currency) => currency.value === customer
              )}
              placeholder="Select Customer"
              onChange={(e) => onEdit(e, 'customer')}
              size="sm"
            />
            {/* <Input
              ref={searchInput}
              className=""
              size="sm"
              placeholder="Project No."
              value={project_no}
              prefix={<HiOutlineSearch className="text-lg" />}
              onChange={(e) => onEdit(e, "project_no")}
            /> */}
            <Select
              options={PoNumber}
              value={PoNumber?.filter((currency) => currency.value === po_no)}
              placeholder="Select Po Number"
              onChange={(e) => onEdit(e, 'po_number')}
              size="sm"
            />
            <Select
              options={projectNumbers}
              value={projectNumbers?.filter(
                (currency) => currency.value === project_no
              )}
              placeholder="Select Project Number"
              onChange={(e) => onEdit(e, 'project_no')}
              size="sm"
            />
            {/* <Input
              ref={searchInput}
              className=""
              size="sm"
              placeholder="Po No."
              value={po_no}
              prefix={<HiOutlineSearch className="text-lg" />}
              onChange={(e) => onEdit(e, "po_number")}
            /> */}
            {/* <Input
              ref={searchInput}
              className=""
              size="sm"
              placeholder="Po Serial Number"
              value={po_serial_no}
              prefix={<HiOutlineSearch className="text-lg" />}
              onChange={(e) => onEdit(e, "po_serial_no")}
            /> */}
            <Select
              options={serialNumber}
              value={serialNumber?.filter(
                (currency) => currency.value === po_serial_no
              )}
              placeholder="Select Serial Number"
              onChange={(e) => onEdit(e, 'po_serial_no')}
              size="sm"
            />
            <Select
              options={productOption}
              value={productOption.filter(
                (currency) => currency.value === product
              )}
              onChange={(e) => onEdit(e, 'product_name')}
              placeholder="Select Product"
              size="sm"
            />

            {/* <Select
              options={itemCodeOption}
              value={itemCodeOption.filter(
                (currency) => currency.value === item_code
              )}
              placeholder="Select Item Code"
              onChange={(e) => onEdit(e, "item_code")}
              size="sm"
            />
            <Select
              options={RevisionOption}
              value={RevisionOption.filter(
                (currency) => currency.value === revision_no
              )}
              onChange={(e) => onEdit(e, "revision_number")}
              placeholder="Select Revision Number"
              size="sm"
            />

            <Select
              options={materialGradeOption}
              value={materialGradeOption.filter(
                (currency) => currency.value === material_grade
              )}
              onChange={(e) => onEdit(e, "material_grade")}
              placeholder="Select Material Grade"
              size="sm"
            /> */}
            {/* <Select
              options={PoDates}
              value={PoDates.filter((currency) => currency.value === po_Date)}
              onChange={(e) => onEdit(e, "po_date")}
              placeholder="Select PO Date"
              size="sm"
            /> */}
            <Select
              isMulti
              placeholder="Select PO Date"
              size="sm"
              options={PoDates}
              value={poDateVAlues}
              onChange={(e) => onEdit(e, 'po_date')}
            />
            <Select
              isMulti
              placeholder="Select Po Delivery Date"
              size="sm"
              options={PoDeliveryDates}
              value={poDeliveryVAlues}
              onChange={(e) => onEdit(e, 'po_del_date')}
            />
            {/* <Select
              options={PoDeliveryDates}
              value={PoDeliveryDates.filter(
                (currency) => currency.value === po_del_Date
              )}
              onChange={(e) => onEdit(e, "po_del_date")}
              placeholder="Select Po Delivery Date"
              size="sm"
            /> */}
            <Select
              isMulti
              placeholder="Select Brother Date"
              size="sm"
              options={brotherDeliveryDate}
              value={BrotherDeliveryVAlues}
              onChange={(e) => onEdit(e, 'brothers_date')}
            />

            {/* <Select
              options={brotherDeliveryDate}
              value={brotherDeliveryDate?.filter(
                (currency) => currency.value === brother_Date
              )}
              onChange={(e) => onEdit(e, "brothers_date")}
              placeholder="Select Brother Date"
              size="sm"
            /> */}
          </div>
        </Card>
      )}
    </>
  )
}

export default PoListTableTools
