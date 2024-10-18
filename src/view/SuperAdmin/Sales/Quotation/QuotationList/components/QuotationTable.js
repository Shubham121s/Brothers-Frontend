import React, { useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEnquiry, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../../../../utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import DataTable from '../../../../../../components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Tag } from '../../../../../../components/ui'
// import NewEnquiry from "../../NewEnquiry";
import NewQuotation from '../../NewQuotation'
import {
  setSelectedEnquiry,
  togglDeleteConfirmationDialog
} from '../store/stateSlice'
import DeleteQuotationConfirmationDialog from './QuotationDeleteConfirmation'

const exportType = {
  FOREIGN: {
    label: 'Foreign',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-600'
  },
  DOMESTIC: {
    label: 'Domestic',
    bgClass: 'bg-pink-100',
    textClass: 'text-pink-600'
  }
}

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onEdit = () => {
    navigate(`/product/edit/${row.id}`)
  }

  const onDelete = () => {
    dispatch(setSelectedEnquiry(row))
    dispatch(togglDeleteConfirmationDialog(true))
  }

  return (
    <div className="flex justify-center gap-4 text-lg">
      <span
        className={`cursor-pointer hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className={`cursor-pointer hover:text-red-500`}
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  )
}

const NameColumn = ({ row }) => {
  const { textTheme } = useThemeClass()

  return (
    <div className="items-center">
      <Link
        className={`hover:${textTheme} font-semibold`}
        // to={`/enquiry/details/${}`}
      >
        {row?.enq_number}
      </Link>
    </div>
  )
}

const QuotationTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.quotation.data.enquiryList)
  const loading = useSelector((state) => state.quotation.data.loading)

  const columns = [
    {
      header: 'enq. number',
      accessorKey: 'enq_number',
      cell: (props) => {
        const row = props.row.original
        return <NameColumn row={row} />
      }
    },
    {
      header: 'customer',
      accessorKey: '',
      cell: (props) => {
        const row = props.row.original
        return <div>{row?.Customer?.name}</div>
      }
    },
    {
      header: 'type',
      accessorKey: 'enquiry_type',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="mr-2">
            <Tag
              className={`${exportType[row?.enquiry_type]?.bgClass} ${
                exportType[row?.enquiry_type]?.textClass
              } border-0`}
            >
              {exportType[row?.enquiry_type]?.label}
            </Tag>
          </div>
        )
      }
    },
    {
      header: 'Person of contact name',
      accessorKey: 'poc_name'
    },
    {
      header: 'enquiry date',
      accessorKey: 'enquiry_date',
      cell: (props) => {
        const row = props.row.original
        return <div className="font-semibold">{row?.enquiry_date}</div>
      }
    },

    {
      header: 'action',
      accessorKey: 'action',
      id: 't',
      cell: (props) => {
        const row = props.row.original
        return <ActionColumn row={row} />
      }
    }
  ]

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.quotation.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(getAllEnquiry({ pageIndex, pageSize, query }))
  }, [pageIndex, pageSize, query, dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData, pageIndex, pageSize])

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
      <NewQuotation />

      <DeleteQuotationConfirmationDialog />
    </>
  )
}

export default QuotationTable
