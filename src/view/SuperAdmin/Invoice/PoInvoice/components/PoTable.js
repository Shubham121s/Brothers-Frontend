import React, { useMemo } from 'react'
import { AdaptableCard } from '../../../../../components/shared'
import { Table } from '../../../../../components/ui'
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import TFoot from '../../../../../components/ui/Table/TFoot'
import dayjs from 'dayjs'
import { InvoiceTotal } from '../utils/InvoiceTotal'

const { Tr, Th, Td, THead, TBody } = Table

const PriceAmount = ({ value }) => {
  return (
    <NumericFormat
      displayType="text"
      value={Number(value).toFixed(2)}
      thousandSeparator={true}
    />
  )
}

const TFootRows = ({ data = [], className, Note = '' }) => {
  const totalAmount = InvoiceTotal(data)
  return (
    <Tr
      style={{
        border: '.2px solid black',
        padding: '3px'
      }}
      className={className}
    >
      <Td
        style={{ border: '.2px solid black', padding: '3px' }}
        colSpan="8"
        className="uppercase"
      >
        <strong>Note</strong> - <span>{Note}</span>
      </Td>
      <Td
        className={`font-semibold ${className}`}
        style={{
          border: '.2px solid black',
          padding: '3px',
          textAlign: 'center'
        }}
        colSpan="1"
      >
        TOTAL
      </Td>
      <Td
        style={{
          border: '.2px solid black',
          padding: '3px',
          textAlign: 'center'
        }}
      >
        <NumericFormat
          displayType="text"
          value={totalAmount.toFixed(2)}
          thousandSeparator={true}
          thousandsGroupStyle="lakh"
        />
      </Td>
    </Tr>
  )
}

const PoTable = ({
  data = [],
  className,
  currency_type = 'INR',
  Note = ''
}) => {
  const columns = useMemo(
    () => [
      {
        header: <span className={className}>po s.no</span>,
        accessorKey: 'PoList.serial_number',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              {`${row?.serial_number}`}
            </div>
          )
        }
      },
      {
        header: <span className={className}>Product</span>,
        accessorKey: 'Product',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              {`${row?.Product?.name}`}
            </div>
          )
        }
      },
      {
        header: <span className={className}>item code</span>,
        accessorKey: 'item_code',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              {row?.Product?.item_code}
            </div>
          )
        }
      },
      {
        header: <span className={className}>drg no.</span>,
        accessorKey: 'item_code',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              {row?.Product?.drawing_number}
            </div>
          )
        }
      },
      {
        header: <span className={className}>po del. date</span>,
        accessorKey: 'delivery_date',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              {dayjs(row?.delivery_date).format('DD-MMM-YYYY')}
            </div>
          )
        }
      },
      {
        header: <span className={className}>Cnf del. date</span>,
        accessorKey: 'accept_delivery_date',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              {dayjs(row?.accept_delivery_date).format('DD-MMM-YYYY')}
            </div>
          )
        }
      },
      {
        header: <span className={className}>qty (NO)</span>,
        accessorKey: 'quantity',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>{row?.quantity}</div>
          )
        }
      },
      {
        header: <span className={className}>Remarks</span>,
        accessorKey: 'accept_description',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              {row?.accept_description}
            </div>
          )
        }
      },
      {
        header: <span className={className}>price ({currency_type})</span>,
        accessorKey: 'unit_price',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              <PriceAmount value={row?.unit_price} />
            </div>
          )
        }
      },
      {
        header: <span className={className}>Total ({currency_type})</span>,
        accessorKey: 'total',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>
              <PriceAmount value={row?.unit_price * row?.quantity} />
            </div>
          )
        }
      },
      {
        header: <span className={className}>Remarks</span>,
        accessorKey: 'description',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className={`text-center ${className}`}>{row?.description}</div>
          )
        }
      }
    ],
    [currency_type, data]
  )

  const sortedData = data.sort((a, b) => a.serial_number - b.serial_number)

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <AdaptableCard className={`mb-1 mt-1 ${className} overflow-hidden`}>
        <div className=" bg-lime-50">
          <h6 className="text-center p-1 text-gray-600">
            ORDER CONFIRMED ITEMS
          </h6>
        </div>
        <Table compact={true}>
          <THead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      className={className}
                      style={{
                        border: '.2px solid black',
                        textAlign: 'center',
                        padding: '3px'
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
                        className={className}
                        key={cell.id}
                        style={{
                          border: '.2px solid black',
                          padding: '3px'
                        }}
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
          <TFoot>
            <TFootRows
              data={data}
              Note={Note}
            />
          </TFoot>
        </Table>
      </AdaptableCard>
    </>
  )
}

export default PoTable
