import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { memo } from 'react'
import { Table, Toast, Notification } from '../../../../../../../components/ui'
import {
  setSelectedBox,
  toggleDeleteBoxDialog,
  toggleEditBoxDialog
} from '../../store/stateSlice'
import { useDispatch } from 'react-redux'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import NewBoxDialog from './NewBoxDialog'
import EditBoxDialog from './EditBoxDialog'
const { Tr, Th, Td, THead, TBody, TFoot } = Table

const pushNotification = (message, type, title) => {
  return Toast.push(
    <Notification
      title={title}
      type={type}
      duration={2500}
    >
      {message}
    </Notification>,
    {
      placement: 'top-center'
    }
  )
}

const ActionColumn = ({
  row,
  index,
  handleDeleteBox,
  values,
  dispatchList
}) => {
  const dispatch = useDispatch()
  const onEdit = () => {
    dispatch(toggleEditBoxDialog(true))
    dispatch(setSelectedBox({ ...row, index: index + 1 }))
  }
  const onDelete = () => {
    console.log(dispatchList)
    console.log(row)
    let boxExists = dispatchList.some((dispatchItem) =>
      dispatchItem.DispatchLists.some(
        (poItem) => poItem.dispatch_box_id === row?.dispatch_box_list_id
      )
    )

    if (boxExists) {
      return pushNotification(
        'Cannot Delete Box Already Added In Product Delete Product First',
        'danger',
        'Error'
      )
    }
    dispatch(setSelectedBox(row))
    dispatch(toggleDeleteBoxDialog(true))
  }

  return (
    <div className="flex text-lg">
      <span
        className={`cursor-pointer p-1`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      {values.length > 1 && (
        <span
          className="cursor-pointer p-1 hover:text-red-500"
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </span>
      )}
    </div>
  )
}

const BoxTable = (props) => {
  const {
    handleNewBoxAdd,
    handleDeleteBox,
    className,
    values = [],
    dispatchList,
    handleEditBox,
    invoiceId
  } = props

  const columns = [
    {
      header: 'Box no',
      accessorKey: 'box',
      cell: (props) => {
        const row = props.row.original
        return (
          <div className="uppercase text-center">
            {`BOX NO ${row?.box_no || '-'}`}
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
      header: 'box wt. (kg)',
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
    handleNewBoxAdd(values, box)
  }

  const handleEditBoxs = (box) => {
    // console.log(box);
    handleEditBox(values, box)
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
        invoiceId={invoiceId}
        boxes={values}
      />
      <EditBoxDialog
        boxNo={values.length + 1}
        handleEditBoxs={handleEditBoxs}
        invoiceId={invoiceId}
        boxes={values}
      />
    </>
  )
}
export default memo(BoxTable)
