import React, { useEffect, useCallback, useMemo } from 'react'
import { Badge } from '../../../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import useThemeClass from '../../../../../../utils/hooks/useThemeClass'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import { getAllConditions, setTableData } from '../store/dataSlice'
import DataTable from '../../../../../../components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
  setSelectedCondition,
  toggleDeleteConditionDialog,
  toggleEditConditionDialog
} from '../store/stateSlice'
import ConditionNewDialog from './ConditionNewDialog'
import ConditionEditDialog from './ConditionEditDialog'
import DeleteConditionDialog from './DeleteConfirmationDialog'

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const dispatch = useDispatch()

  const onEdit = () => {
    dispatch(toggleEditConditionDialog(true))
    dispatch(setSelectedCondition(row))
  }
  const onDelete = () => {
    dispatch(toggleDeleteConditionDialog(true))
    dispatch(setSelectedCondition(row))
  }

  return (
    <div className="flex justify-end gap-x-4 text-lg">
      <span
        className={`cursor-pointer hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className="cursor-pointer hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  )
}

const columns = [
  {
    header: 'sr no.',
    accessorKey: 'sr no',
    cell: (props) => {
      const index = props.row.index
      return <span className="uppercase">{index + 1}</span>
    }
  },
  {
    header: 'Name',
    accessorKey: 'name',
    cell: (props) => {
      const row = props.row.original
      return <span className="">{row.name}</span>
    }
  },
  {
    header: 'Reg. Date',
    accessorKey: 'createdAt',
    cell: (props) => {
      const row = props.row.original
      return (
        <div className="flex items-center">
          {dayjs(row?.createdAt).format('DD/MM/YYYY')}
        </div>
      )
    }
  },
  {
    header: '',
    accessorKey: 'note_id',
    cell: (props) => {
      const row = props.row.original
      return <ActionColumn row={row} />
    }
  }
]

const ConditionTable = ({ type }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.condition.data.conditionList)
  const loading = useSelector((state) => state.condition.data.loading)
  const { status } = useSelector((state) => state.condition.data.filterData)

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.condition.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(
      getAllConditions({ pageIndex, pageSize, query, status, type: type })
    )
  }, [pageIndex, pageSize, query, status, dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData, pageIndex, pageSize, status])

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total }),
    [pageIndex, pageSize, query, total]
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
      <ConditionNewDialog type={type} />
      <ConditionEditDialog type={type} />
      <DeleteConditionDialog type={type} />
    </>
  )
}

export default ConditionTable
