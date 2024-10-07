import React, { useEffect, useCallback, useMemo } from 'react'
import { Badge, Tag } from '../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { getInstrument, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../../utils/hooks/useThemeClass'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import DataTable from '../../../../components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
  setSelectedInstrument,
  togglDeleteConfirmationDialog,
  togglEditDialog
} from '../store/stateSlice'
import NewInstrumentDialog from './NewInstrumentDialog'
import EditInstrumentDialog from './EditInstrumentDialog'
import DeleteInstrumentConfirmationDialog from './InstrumentDeleteConfirmationDialog'

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(setSelectedInstrument(row))
    dispatch(togglDeleteConfirmationDialog(true))
  }

  const onEdit = () => {
    dispatch(setSelectedInstrument(row))
    dispatch(togglEditDialog(true))
  }

  return (
    <div className="flex justify-start text-lg gap-x-4">
      <span
        className="mr-2 cursor-pointer"
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className="cursor-pointer"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  )
}

const NameColumn = ({ row }) => {
  const { textTheme } = useThemeClass()

  return <div className="items-center uppercase">{row?.instrument_name}</div>
}

const columns = [
  {
    header: 'Name',
    accessorKey: 'instrument_name',
    cell: (props) => {
      const row = props.row.original
      return <NameColumn row={row} />
    }
  },
  {
    header: 'Maker',
    accessorKey: 'instrument_make',
    cell: (props) => {
      const row = props.row.original
      return (
        <div className="items-center uppercase">{row?.instrument_make}</div>
      )
    }
  },
  {
    header: 'Id no.',
    accessorKey: 'instrument_no',
    cell: (props) => {
      const row = props.row.original
      return (
        <div className="items-center uppercase font-semibold">
          {row?.instrument_no}
        </div>
      )
    }
  },
  {
    header: 'size',
    accessorKey: 'instrument_size',
    cell: (props) => {
      const row = props.row.original
      return (
        <div className="items-center uppercase">{row?.instrument_size}</div>
      )
    }
  },
  {
    header: 'l.c',
    accessorKey: 'instrument_lc',
    cell: (props) => {
      const row = props.row.original
      return <div className="items-center uppercase">{row?.instrument_lc}</div>
    }
  },
  //   {
  //     header: 'Status',
  //     accessorKey: 'status',
  //     cell: (props) => {
  //       const row = props.row.original
  //       return (
  //         <div className="flex items-center">
  //           <Badge className={statusColor[row.status]?.dotClass} />
  //           <span
  //             className={`ml-2 font-semibold capitalize ${
  //               statusColor[row.status]?.textClass
  //             }`}
  //           >
  //             {statusColor[row.status]?.label}
  //           </span>
  //         </div>
  //       )
  //     }
  //   },
  {
    header: 'calibration freq.',
    accessorKey: 'instrument_cal_frq',
    cell: (props) => {
      const row = props.row.original
      return (
        <div className="items-center uppercase">
          {row?.instrument_cal_frq} Year
        </div>
      )
    }
  },
  {
    header: 'Action',
    accessorKey: 'id',
    cell: (props) => {
      const row = props.row.original
      return <ActionColumn row={row} />
    }
  }
]

const InstrumentTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.instrument.data.instrumentList)
  const loading = useSelector((state) => state.instrument.data.loading)
  const { type } = useSelector((state) => state.instrument.data.filterData)

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.instrument.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(getInstrument({ pageIndex, pageSize, sort, query, type }))
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
      <NewInstrumentDialog />
      <EditInstrumentDialog />
      <DeleteInstrumentConfirmationDialog />
    </>
  )
}

export default InstrumentTable
