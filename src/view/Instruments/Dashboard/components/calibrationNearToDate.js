import React, { useEffect, useCallback, useMemo } from 'react'
import { Badge, Tag } from '../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDispatchInvoiceWithPagination,
  getInstrumentCalibrationNearToMonth,
  setTableData
} from '../store/dataSlice'
import cloneDeep from 'lodash/cloneDeep'
import DataTable from '../../../../components/shared/DataTable'

const columns = [
  {
    header: 'Instrument',
    accessorKey: 'Instrument',
    cell: (props) => {
      const row = props.row.original
      return (
        <span className="uppercase">{row?.Instrument?.instrument_name}</span>
      )
    }
  },
  {
    header: 'maker',
    accessorKey: 'Instrument',
    cell: (props) => {
      const row = props.row.original
      return (
        <span className="uppercase">{row?.Instrument?.instrument_make}</span>
      )
    }
  },

  {
    header: 'Id no.',
    accessorKey: 'Instrument',
    cell: (props) => {
      const row = props.row.original
      return <span className="uppercase">{row?.Instrument?.instrument_no}</span>
    }
  },

  {
    header: 'Upcoming date',
    accessorKey: 'next_due_date',
    cell: (props) => {
      const row = props.row.original
      return (
        <div className="mr-2">
          <Tag className={`bg-red-100 text-red-600  border-0`}>
            {row?.next_due_date}
          </Tag>
        </div>
      )
    }
  }
]

const CalibrationNearToDate = () => {
  const dispatch = useDispatch()
  const data = useSelector(
    (state) => state.instrument_dashboard.data.calibrationNearToDate
  )
  const loading = useSelector(
    (state) => state.instrument_dashboard.data.loading
  )
  const { type } = useSelector(
    (state) => state.instrument_dashboard.data.filterData
  )

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.instrument_dashboard.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(
      getInstrumentCalibrationNearToMonth({
        pageIndex,
        pageSize,
        sort,
        query,
        type
      })
    )
  }, [pageIndex, pageSize, sort, query, type, dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData, pageIndex, pageSize, sort, type])

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  )

  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData)
    newTableData.pageIndex = page
    dispatch(setTableData(newTableData))
  }

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData)
    newTableData.pageSize = Number(value)
    newTableData.pageIndex = 1
    dispatch(setTableData(newTableData))
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={{ pageIndex, pageSize, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </>
  )
}

export default CalibrationNearToDate
