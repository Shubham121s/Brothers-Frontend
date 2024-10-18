import React, { useEffect, useCallback, useMemo } from 'react'
import { Tag, Tooltip, Button } from '../../../../../components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { getAllInward, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../../../utils/hooks/useThemeClass'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import DataTable from '../../../../../components/shared/DataTable'

const statusColor = {
  delivered: {
    label: 'Delivered',
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

  return (
    <div className="flex justify-center text-lg">
      <span className={`cursor-pointer hover:${textTheme}`}>
        <Button
          className=""
          color="blue-100"
          size="sm"
        >
          GRN
        </Button>
      </span>
    </div>
  )
}

const PoAColumn = ({ row }) => {
  const { textTheme } = useThemeClass()

  return (
    <Tooltip
      title={
        <div>
          View <strong className="text-yellow-400">GRN</strong>
        </div>
      }
    >
      <Link
        className={`hover:${textTheme} font-semibold`}
        to={`/inward/details/${row?.inward_id}`}
      >
        {row?.inward_no}
      </Link>
    </Tooltip>
  )
}

const PoTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.inward_list.data.inwardList)
  const loading = useSelector((state) => state.inward_list.data.loading)
  const { status } = useSelector((state) => state.inward_list.data.filterData)
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
      header: 'inward Number',
      accessorKey: '',
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
        return <div className="uppercase">{Customer?.name}</div>
      }
    },
    {
      header: 'C. Code',
      accessorKey: 'Customer.customer_code',
      cell: (props) => {
        const row = props.row.original
        return <div>{row?.Customer?.customer_code}</div>
      }
    },
    {
      header: 'items',
      accessorKey: '',
      cell: (props) => {
        const row = props.row.original
        return <div className="capitalize">{row?.InWardDetails?.length}</div>
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
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   cell: (props) => {
    //     const row = props.row.original;
    //     return (
    //       <div className="mr-2">
    //         <Tag
    //           className={`${statusColor[row?.status]?.bgClass} ${
    //             statusColor[row?.status]?.textClass
    //           } border-0`}
    //         >
    //           {statusColor[row?.status]?.label}
    //         </Tag>
    //       </div>
    //     );
    //   },
    // },
    {
      header: 'inward Date',
      accessorKey: 'inward_date',
      cell: (props) => {
        const row = props.row.original
        return <div>{dayjs(row?.inward_date).format('DD-MMM-YYYY')}</div>
      }
    }
    // {
    //   header: "Reg. Date",
    //   accessorKey: "po_date",
    //   cell: (props) => {
    //     const row = props.row.original;
    //     return <div>{dayjs(row.createdAt).format("DD-MMM-YYYY")}</div>;
    //   },
    // },
    // {
    //   header: "action",
    //   id: "id",
    //   cell: (props) => {
    //     const row = props.row.original;
    //     return <ActionColumn row={row} />;
    //   },
    // },
  ]

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.inward_list.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(getAllInward({ pageIndex, pageSize, sort, query, status }))
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
      {/* <productEditDialog /> */}
    </>
  )
}

export default PoTable
