import React, { useRef } from 'react'
import { Button } from '../../../../components/ui'
import { setTableData, setFilterData, getAllUsers } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import UserTableFilter from './UserTableFilter'
import UserTableSearch from './UserTableSearch'
import { toggleNewUserDialog } from '../store/stateSlice'

const UsersTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.user.data.tableData)

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getAllUsers(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ type: '' }))
        fetchData(newTableData)
    }


    const onAddUser = () => {
        dispatch(toggleNewUserDialog(true))
    }

    return (
        <div className="md:flex items-center justify-end gap-2 mb-4">
            <UserTableSearch
                ref={inputRef}
                onInputChange={handleInputChange}
            />
            <UserTableFilter />
            <Button size="sm" onClick={onClearAll}>
                Clear All
            </Button>
            <Button size="sm" variant='solid' onClick={onAddUser}>
                Add User
            </Button>
        </div>
    )
}

export default UsersTableTools
