import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  Notification,
  Toast,
  Switcher,
  Button,
  Table
} from '../../../../components/ui'
import { toggleFormAssignDialog } from '../store/stateSlice'
import UserForm from './UserForm'
import {
  getAllUsers,
  getFormModule,
  newUserRegister,
  setShowInMenu,
  updateFormDetail
} from '../store/dataSlice'
import { apiPostNewUserRegister } from '../../../../services/SuperAdmin/UserService'
import { setFormTableData } from '../store/dataSlice'
import dayjs from 'dayjs'
import DataTable from '../../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from '../../../../utils/hooks/useThemeClass'
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table'
const { Tr, Th, Td, THead, TBody } = Table

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

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass()
  const dispatch = useDispatch()

  const onShow = (val) => {
    dispatch(setShowInMenu({ module_id: row.module_id, status: !val }))
  }

  return (
    <div className="flex justify-center gap-x-4">
      <Switcher
        checked={row.show_in_menu}
        color="green-500"
        onChange={onShow}
      />
    </div>
  )
}

const columns = [
  {
    header: 'Name',
    accessorKey: 'Module',
    cell: (props) => {
      const row = props.row?.original
      return <div className="">{row?.title}</div>
    }
  },
  {
    header: 'Show in menu',
    accessorKey: 'id',
    cell: (props) => {
      const row = props.row?.original
      return <ActionColumn row={row} />
    }
  }
]

const RoleAssignDialog = () => {
  const dispatch = useDispatch()
  const [btLading, setBtLoading] = useState(false)
  const newRoleAssignDialog = useSelector(
    (state) => state.user.state.formAssignDialog
  )
  const initialData = useSelector((state) => state.user.state.selectedUser)

  const onDialogClose = () => {
    dispatch(toggleFormAssignDialog(false))
  }

  const handleFormSubmit = async (values) => {
    setBtLoading(true)
    const action = await dispatch(
      updateFormDetail({ formList: data, user_id: initialData.user_id })
    )
    setBtLoading(false)
    if (action?.payload.data?.success) {
      pushNotification('Success', 'success', 'Successfully added')
      return onDialogClose()
    }
    return pushNotification('Error', 'danger', 'Unsuccessfully')
  }

  const data = useSelector((state) => state.user.data.formList)
  const loading = useSelector((state) => state.user.data.formloading)

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.user.data.tableFormData
  )

  const fetchData = useCallback(() => {
    if (newRoleAssignDialog) {
      dispatch(
        getFormModule({
          user_id: initialData.user_id
        })
      )
    }
  }, [dispatch, newRoleAssignDialog])

  useEffect(() => {
    fetchData()
  }, [fetchData, newRoleAssignDialog])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <Dialog
      isOpen={newRoleAssignDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Form Assign</h5>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table
          className="relative"
          compact={true}
        >
          <THead
            className="sticky"
            style={{ top: '-.2px' }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      style={{
                        textAlign: 'center',
                        border: '.2px dashed lightGray'
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
              const { list_status } = row.original
              return (
                <Tr
                  key={row.id}
                  className={`${''}`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        style={{
                          textAlign: 'center',
                          border: '.2px dashed lightGray'
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
        </Table>
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <Button
          size="sm"
          onClick={onDialogClose}
          type="button"
        >
          Discard
        </Button>
        <Button
          size="sm"
          variant="solid"
          loading={btLading}
          onClick={handleFormSubmit}
        >
          {/* {type === 'edit' ? 'Update' : 'Save'} */}
          Save
        </Button>
      </div>
    </Dialog>
  )
}

export default RoleAssignDialog
