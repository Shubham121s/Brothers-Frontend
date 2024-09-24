import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { memo } from 'react'
import { Table } from '../../../../../../../components/ui'
// import NumberFormat from '../../../utils/numberFormat'
// import { InvoiceQuantity } from '../../../utils/quantity'
// import { InvoiceWeight } from '../../../utils/weight'
// import { InvoiceTotal } from '../../../utils/amount'
import {
  setSelectedBox,
  toggleEditBoxDialog
} from '../../../NewDispatch/store/stateSlice'
import { useDispatch } from 'react-redux'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import NewBoxDialog from './NewBoxDialog'
import EditBoxDialog from './EditBoxDialog'
const { Tr, Th, Td, THead, TBody, TFoot } = Table

const TableFooterRows = ({ pageNo, singlePageData = [] }) => {
  return (
    <>
      {/* <Tr style={{ border: '.5px solid #e0e0e0', textAlign: 'center' }}>
                <Td style={{ border: '.5px solid #e0e0e0' }} colSpan='3'></Td>
                <Td style={{ border: '.5px solid #e0e0e0' }} colSpan='3'><div className='text-gray-500'>Total (page {pageNo + 1})</div></Td>
                <Td style={{ border: '.5px solid #e0e0e0' }} colSpan='1'><div className='text-gray-700 text-center'>{InvoiceQuantity(singlePageData)}</div></Td>
                <Td style={{ border: '.5px solid #e0e0e0' }} colSpan='1'></Td>
                <Td style={{ border: '.5px solid #e0e0e0' }}>
                    <NumberFormat value={InvoiceTotal(singlePageData)} />
                </Td>
                <Td style={{ border: '.5px solid #e0e0e0' }} colSpan='1'></Td>
                <Td style={{ border: '.5px solid #e0e0e0' }} colSpan='1'>
                    <NumberFormat value={InvoiceWeight(singlePageData)} />
                </Td>
            </Tr> */}
    </>
  )
}

const Box = [
  {
    length: 10,
    breadth: 12,
    height: 43,
    tare: 223,
    size: 'inch'
  },
  {
    length: 10,
    breadth: 12,
    height: 43,
    tare: 223,
    size: 'inch'
  },
  {
    length: 10,
    breadth: 12,
    height: 43,
    tare: 223,
    size: 'inch'
  },
  {
    length: 10,
    breadth: 12,
    height: 43,
    tare: 223,
    size: 'inch'
  },
  {
    length: 10,
    breadth: 12,
    height: 43,
    tare: 223,
    size: 'inch'
  }
]

const ActionColumn = ({
  row,
  index,
  handleDeleteBox,
  values,
  setFieldValue,
  dispatchList
}) => {
  const dispatch = useDispatch()
  const onEdit = () => {
    dispatch(toggleEditBoxDialog(true))
    dispatch(setSelectedBox({ ...row, index: index + 1 }))
  }
  const onDelete = () => {
    handleDeleteBox?.(values, index, setFieldValue, dispatchList)
  }

  return (
    <div className="flex text-lg">
      <span
        className={`cursor-pointer p-1`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className="cursor-pointer p-1 hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  )
}

const BoxTable = (props) => {
  const {
    handleNewBoxAdd,
    handleDeleteBox,
    className,
    values = [],
    setFieldValue,
    dispatchList,
    handleEditBox
  } = props

  const columns = [
    {
      header: 'Box no',
      accessorKey: 'box',
      cell: (props) => {
        const { index } = props.row
        return (
          <div className="uppercase text-center">
            {`BOX NO ${index + 1 || '-'}`}
          </div>
        )
      }
    },
    {
      header: 'length',
      accessorKey: 'box_length',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="uppercase text-center">
            {Number(row?.box_length)?.toFixed(2)}
          </div>
        )
      }
    },
    {
      header: 'breadth',
      accessorKey: 'box_breadth',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="uppercase text-center">
            {Number(row?.box_breadth)?.toFixed(2)}
          </div>
        )
      }
    },
    {
      header: 'height',
      accessorKey: 'box_height',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="uppercase text-center">
            {Number(row?.box_height)?.toFixed(2)}
          </div>
        )
      }
    },
    {
      header: 'size in',
      accessorKey: 'box_size_type',
      cell: (props) => {
        const row = props.row.original
        return <div className="uppercase text-center">{row?.box_size_type}</div>
      }
    },
    {
      header: 'Box wt. (kg)',
      accessorKey: 'tare_weight',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="uppercase text-center">
            {Number(row?.tare_weight)?.toFixed(3)}
          </div>
        )
      }
    },
    {
      header: '',
      accessorKey: 'action',
      cell: (props) => {
        const { original, index } = props.row
        return (
          <ActionColumn
            row={original}
            index={index}
            values={values}
            setFieldValue={setFieldValue}
            handleDeleteBox={handleDeleteBox}
            dispatchList={dispatchList}
          />
        )
      }
    }
  ]

  const table = useReactTable({
    data: values,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleNewBox = (box) => {
    handleNewBoxAdd(values, box, setFieldValue)
  }

  const handleEditBoxs = (box) => {
    handleEditBox(values, box, setFieldValue)
  }

  return (
    <>
      <Table
        compact={true}
        className="mb-5"
      >
        <THead className={className}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    style={{
                      border: '.5px solid #e0e0e0',
                      textAlign: 'center'
                    }}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      style={{ border: '.5px solid #e0e0e0' }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </TBody>
      </Table>
      <NewBoxDialog
        handleNewBox={handleNewBox}
        boxNo={values.length + 1}
      />
      <EditBoxDialog
        boxNo={values.length + 1}
        handleEditBoxs={handleEditBoxs}
      />
    </>
  )
}
export default memo(BoxTable)
