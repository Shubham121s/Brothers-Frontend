import React, { useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, setTableData } from '../store/dataSlice'
import useThemeClass from '../../../../../utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import DataTable from '../../../../../components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
  setSelectedProduct,
  togglDeleteConfirmationDialog
} from '../store/stateSlice'

import DeleteProductConfirmationDialog from './DeleteConfirmationDialog'

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onEdit = () => {
    navigate(`/product/edit/${row.product_id}`)
  }

  const onDelete = () => {
    dispatch(setSelectedProduct(row))
    dispatch(togglDeleteConfirmationDialog(true))
  }

  return (
    <div className="flex justify-between text-lg">
      <span
        className={`cursor-pointer hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className={`cursor-pointer hover:${textTheme}`}
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
        to={`/product/drawing/${row?.product_id}`}
      >
        {row?.item_code}
      </Link>
    </div>
  )
}

const ProductTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.product.data.productList)
  const loading = useSelector((state) => state.product.data.loading)

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (props) => {
        const row = props.row.original
        return <div>{row?.name}</div>
      }
    },
    {
      header: 'item code',
      accessorKey: 'item_code',
      cell: (props) => {
        const row = props.row.original
        return <NameColumn row={row} />
      }
    },
    {
      header: 'P. Code',
      accessorKey: 'product_code'
    },
    {
      header: 'Pattern No',
      accessorKey: 'Pattern.number'
    },
    {
      header: 'Category',
      accessorKey: 'Category.name'
    },
    {
      header: 'Mat. Grd. No',
      accessorKey: 'MaterialGrade.number'
    },
    {
      header: 'hsn code',
      accessorKey: 'hsn_code',
      cell: (props) => {
        const row = props.row.original
        return <span className="uppercase">{row.hsn_code || '-'}</span>
      }
    },
    {
      header: 'slt',
      accessorKey: 'standard_lead_time',
      cell: (props) => {
        const row = props.row.original
        return (
          <span>{`${row?.standard_lead_time}${' '}${
            row?.standard_lead_time_type
          }`}</span>
        )
      }
    },
    {
      header: '',
      id: 'product_id',
      cell: (props) => {
        const row = props.row.original
        return <ActionColumn row={row} />
      }
    }
  ]

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.product.data.tableData
  )

  const fetchData = useCallback(() => {
    dispatch(getAllProducts({ pageIndex, pageSize, query }))
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
      <DeleteProductConfirmationDialog />
    </>
  )
}

export default ProductTable
