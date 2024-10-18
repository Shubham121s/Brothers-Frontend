import React, { useCallback, useEffect, useMemo } from 'react'
import { Badge, Tooltip } from '../../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep'
import { getAllUnusedItem, setTableData } from '../store/dataSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from '../../../../../utils/hooks/useThemeClass'
import {
  setSelectedItem,
  toggleDeleteConfirmation,
  toggleItemEditDialog
} from '../store/stateSlice'
import { useNavigate } from 'react-router-dom'
import ConsumableItemEdit from './consumableItemEdit'
import ConsumableItemNew from './consumableItemNew'

const statusColor = {
  true: {
    label: 'Active',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-500'
  },
  false: {
    label: 'In-Active',
    dotClass: 'bg-red-500',
    textClass: 'text-red-500'
  }
}

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { textTheme } = useThemeClass()

  const onEdit = () => {
    dispatch(toggleItemEditDialog(true))
    dispatch(setSelectedItem(row))
  }

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true))
    dispatch(setSelectedItem(row))
  }

  const onAttendance = () => {
    navigate(`/worker/attendance?id=${row.worker_id}`)
  }

  return (
    <div className="flex text-lg">
      <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className="cursor-pointer p-2 hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  )
}

const IdDetailsColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const navigate = useNavigate()

  return (
    <span className={`cursor-pointer font-semibold hover:${textTheme}`}>
      {row?.RawMaterial?.raw_material_name}
    </span>
  )
}

const UnusedItemTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLedger = (row) => {
    navigate(`/worker/details?id=${row.worker_id}`)
    dispatch(setSelectedItem(row))
  }

  const columns = useMemo(
    () => [
      {
        header: 'v.code',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return <IdDetailsColumn row={row} />
        }
      },
      {
        header: 'part type',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return <div className="flex items-center">{row?.part_type}</div>
        }
      },
      {
        header: 'od',
        accessorKey: 'od',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              {row?.od === '0' ? '-' : row?.od}
            </div>
          )
        }
      },
      {
        header: 'id',
        accessorKey: 'id',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              {row?.id === '0' ? '-' : row?.id}
            </div>
          )
        }
      },
      {
        header: 'length',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              {row?.length === '0' ? '-' : row?.length}
            </div>
          )
        }
      },
      {
        header: 'width',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              {row?.width === '0' ? '-' : row?.width}
            </div>
          )
        }
      },
      {
        header: 'thickness',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              {row?.thickness === '0' ? '-' : row?.thickness}
            </div>
          )
        }
      },
      {
        header: 'size',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              {row?.size === '0' ? '-' : row?.size}
            </div>
          )
        }
      },
      {
        header: 'quantity',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return <div className="flex items-center">{row?.quantity}</div>
        }
      },
      {
        header: 'Action',
        accessorKey: '',
        cell: (props) => {
          const row = props.row.original
          return <ActionColumn row={row} />
        }
      }
    ],
    []
  )

  const data = useSelector((state) => state.unused_item.data.unusedItem)
  const loading = useSelector((state) => state.unused_item.data.loading)
  const { status } = useSelector((state) => state.unused_item.data.filterData)

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.unused_item.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(getAllUnusedItem({ pageIndex, pageSize, query, status }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, status])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, status])

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total, status }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, query, total, status]
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
        pagingData={{ pageIndex, pageSize, query, total, status }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <ConsumableItemEdit />
      <ConsumableItemNew />
    </>
  )
}

export default UnusedItemTable
