import React, { useCallback } from 'react'
import { Table } from '../../../../../../components/ui'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from '../../../../../../utils/hooks/useThemeClass'
import { useDispatch } from 'react-redux'
import ShippingAddressDeleteDialog from './ShippingAddressDeleteDialog'
import EditShippingAddressDialog from './EditShippingAddressDialog'
import { setSelectedShippingAddress, toggleDeleteShippingAddressDialog, toggleEditShippingAddressDialog } from '../../store/stateSlice'
const { Tr, Th, Td, THead, TBody } = Table


const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()
    const onEdit = useCallback(() => {
        dispatch(setSelectedShippingAddress(row))
        dispatch(toggleEditShippingAddressDialog(true))
    }, [row])
    const onDelete = useCallback(() => {
        dispatch(setSelectedShippingAddress(row))
        dispatch(toggleDeleteShippingAddressDialog(true))
    }, [row])

    return (
        <div className="flex justify-end text-lg gap-x-4">
            <span
                className={`cursor-pointer hover:text-red-400`}
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
            <span
                className={`cursor-pointer hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
        </div>
    )
}


const columns = [
    {
        header: 'Address',
        accessorKey: 'address',
        cell: (props) => {
            const row = props.row.original
            return <span className='uppercase'>{row?.address || '-'}</span>
        }
    },
    {
        header: 'Country',
        accessorKey: 'country',
        cell: (props) => {
            const row = props.row.original
            return <span className='uppercase'>{row?.country || '-'}</span>
        }
    },
    {
        header: 'State',
        accessorKey: 'state',
        cell: (props) => {
            const row = props.row.original
            return <span className='uppercase'>{row?.state || '-'}</span>
        }
    },
    {
        header: 'City',
        accessorKey: 'city',
        cell: (props) => {
            const row = props.row.original
            return <span className='uppercase'>{row?.city || '-'}</span>
        }
    },
    {
        header: 'ZIP Code',
        accessorKey: 'zip_code',
        cell: (props) => {
            const row = props.row.original
            return <span className='uppercase'>{row?.zip_code || '-'}</span>
        }
    },
    {
        header: 'C. person',
        accessorKey: 'contact_person',
        cell: (props) => {
            const row = props.row.original
            return <span className='uppercase'>{row?.contact_person || '-'}</span>
        }
    },
    {
        header: 'C. phone',
        accessorKey: 'contact_phone',
        cell: (props) => {
            const row = props.row.original
            return <span className='uppercase'>{row?.contact_phone || '-'}</span>
        }
    },
    {
        header: '',
        accessorKey: 'address_id',
        cell: (props) => {
            const row = props.row.original
            return <ActionColumn row={row} />
        }
    },
]

const ShippingAddressTable = ({ data = [] }) => {

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <>
            <Table compact={true}>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        style={{ textAlign: 'center', border: '.2px dashed lightGray' }}
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
                                        <Td key={cell.id}
                                            style={{ textAlign: 'center', border: '.2px dashed lightGray' }}
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
            <ShippingAddressDeleteDialog />
            <EditShippingAddressDialog />
        </>
    )
}

export default ShippingAddressTable