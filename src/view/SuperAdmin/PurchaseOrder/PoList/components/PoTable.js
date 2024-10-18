import React, { useEffect, useCallback, useMemo } from 'react'
import { Tag, Tooltip, Button } from '../../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPoWithPagination, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../../../utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import DataTable from '../../../../../components/shared/DataTable'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
import {
  setSelectedPurchase,
  toggleDeleteConfirmation
} from '../store/stateSlice'
import DeletePoConfirmationDialog from './PoDeleteConfirmation'

const statusColor = {
  delivered: {
    label: 'Delivered',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-600'
  },
  accepted: {
    label: 'Accepted',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-600'
  },
  received: {
    label: 'Received',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-600'
  },
  rejected: {
    label: 'Rejected',
    bgClass: 'bg-red-100',
    textClass: 'text-red-600'
  },
  processing: {
    label: 'Processing',
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-600'
  },
  pending: {
    label: 'Pending',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-600'
  }
}

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onEdit = () => {
    navigate(`/purchaseOrder/edit/${row.purchase_order_id}`)
  }

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true))
    dispatch(setSelectedPurchase(row))
  }

  return (
    <div className="flex justify-center text-lg gap-x-4">
      {row?.status === 'pending' && (
        <>
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
        </>
      )}
    </div>
  )
}

const PoAColumn = ({ row }) => {
  const { textTheme } = useThemeClass()

  return (
    <Tooltip
      title={
        <div>
          View <strong className="text-yellow-400">Purchase</strong> Order
        </div>
      }
    >
      <Link
        className={`hover:${textTheme} font-semibold`}
        to={`/purchase/order/details/${row?.purchase_order_id}`}
      >
        {row?.number}
      </Link>
    </Tooltip>
  )
}

const PoTable = ({ status }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.purchase_order_list.data.poList)
  const loading = useSelector((state) => state.purchase_order_list.data.loading)
  const columns = [
    // {
    //   header: "POa",
    //   accessorKey: "poa",
    //   cell: (props) => {
    //     const row = props.row.original;
    //     return <PoAColumn row={row} />;
    //   },
    // },
    {
      header: 'PO Number',
      accessorKey: 'number',
      cell: (props) => {
        const row = props.row.original
        return <PoAColumn row={row} />
      }
    },
    {
      header: 'Customer',
      accessorKey: 'Customer.name',
      cell: (props) => {
        const { Customer } = props.row.original
        const nameParts = Customer?.name.split(' ')

        const initials = nameParts
          .map((part) => part.charAt(0).toUpperCase())
          .join('')
        return <div className="uppercase">{initials}</div>
      }
    },
    {
      header: 'C. Code',
      accessorKey: 'Customer.customer_code',
      cell: (props) => {
        const row = props.row.original
        return <div>{row?.Customer.customer_code}</div>
      }
    },
    {
      header: 'C. Type',
      accessorKey: 'Customer.type',
      cell: (props) => {
        const row = props.row.original
        return <div className="capitalize">{row?.Customer.type}</div>
      }
    },

    // {
    //     header: 'Items',
    //     accessorKey: 'PoLists',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return <div>{row?.PoLists?.[0].total} {row?.PoLists?.[0].total === 1 ? 'Item' : 'Items'}</div>
    //     },

    // },
    {
      header: 'Mobile',
      accessorKey: '',
      cell: (props) => {
        const row = props.row.original
        return <div>{row?.Customer?.mobile || row?.Customer?.phone}</div>
      }
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="mr-2">
            <Tag
              className={`${statusColor[row?.status]?.bgClass} ${
                statusColor[row?.status]?.textClass
              } border-0`}
            >
              {statusColor[row?.status]?.label}
            </Tag>
          </div>
        )
      }
    },
    {
      header: 'PO Date',
      accessorKey: 'po_date',
      cell: (props) => {
        const row = props.row.original
        return <div>{dayjs(row.date).format('DD-MMM-YYYY')}</div>
      }
    },
    // {
    //   header: "Reg. Date",
    //   accessorKey: "po_date",
    //   cell: (props) => {
    //     const row = props.row.original;
    //     return <div>{dayjs(row.createdAt).format("DD-MMM-YYYY")}</div>;
    //   },
    // },
    {
      header: `action`,
      accessorKey: 'action',
      cell: (props) => {
        const row = props.row.original
        return <ActionColumn row={row} />
      }
    }
  ]
  if (status !== 'pending') {
    columns.splice(columns.length - 1, 0, {
      header: `${
        status === 'processing' || status === 'received'
          ? 'Accepted'
          : status.toUpperCase()
      } Remark`,
      accessorKey: 'status_remark',
      cell: (props) => {
        const row = props.row.original
        return <div>{row?.status_remark}</div>
      }
    })
  }

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.purchase_order_list.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(
      getAllPoWithPagination({
        pageIndex,
        pageSize,
        sort,
        query,
        status: status
      })
    )
  }, [pageIndex, pageSize, sort, query, status, dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData, pageIndex, pageSize, sort, status])

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
        pagingData={{ pageIndex, pageSize, sort, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <DeletePoConfirmationDialog />
    </>
  )
}

export default PoTable
