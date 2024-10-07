import React, { useMemo, useEffect } from 'react'
import DataTable from '../../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch, useSelector } from 'react-redux'
import { getAnnual, setTableData, getAllInstrument } from '../store/dataSlice'
import useThemeClass from '../../../../utils/hooks/useThemeClass'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
  setSelectedAnnual,
  toggleNewDialog,
  toggleEditDialog
} from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import CalibrationDeleteConfirmation from './calibrationDeleteConfirmation'
import NewCalibrationDialog from './newCalibrationDialog'

const CalibrationTable = () => {
  const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    // const navigate = useNavigate()

    const onEdit = () => {
      dispatch(toggleEditDialog(true))
      dispatch(setSelectedAnnual(row))
    }

    const onDelete = () => {
      dispatch(toggleDeleteConfirmation(true))
      dispatch(setSelectedAnnual(row))
    }

    return (
      <div className="flex justify-end text-lg">
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onEdit}
        >
          <HiOutlinePencil />
        </span>
        <span
          className="cursor-pointer p-2 hover:text-red-500"
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </span>
      </div>
    )
  }
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.annual.data.tableData
  )

  const filterData = useSelector((state) => state.annual.data.filterData)

  const loading = useSelector((state) => state.annual.data.loading)

  const data = useSelector((state) => state.annual.data.annualList)
  // console.log(data)

  let dataWithSrNo = []
  if (data) {
    dataWithSrNo = data.map((item, index) => ({
      ...item,
      sr_no: index + 1
    }))
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort])

  // useEffect(() => {
  //     if (tableRef) {
  //         tableRef.current.resetSorting()
  //     }
  // }, [filterData])

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  )

  const fetchData = () => {
    dispatch(getAnnual({ pageIndex, pageSize, sort, query, filterData }))
    dispatch(getAllInstrument())
  }
  const dispatch = useDispatch()
  const columns = useMemo(
    () => [
      {
        header: 'Sr No',
        accessorKey: 'sr_no',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.sr_no}</span>
        }
      },
      {
        header: 'Description',
        accessorKey: 'calibration_description',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_description}</span>
        }
      },
      {
        header: 'Code No.',
        accessorKey: 'calibration_code_no',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_code_no}</span>
        }
      },

      {
        header: 'Serial No',
        accessorKey: 'calibration_serial_no',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_serial_no}</span>
        }
      },
      {
        header: 'Maker',
        accessorKey: 'calibration_maker',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_maker}</span>
        }
      },
      {
        header: 'Range',
        accessorKey: 'calibration_range',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_range}</span>
        }
      },

      {
        header: 'Calibration frequency',
        accessorKey: 'calibration_frequency',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_frequency}</span>
        }
      },
      {
        header: '01 Calibration Date',
        accessorKey: 'calibration_date',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_date}</span>
        }
      },
      {
        header: 'Calibration Agency',
        accessorKey: 'calibration_agency',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_agency}</span>
        }
      },
      {
        header: 'Cal Result',
        accessorKey: 'calibration_result',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_result}</span>
        }
      },
      {
        header: 'Cal Report No.',
        accessorKey: 'calibration_report_no',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.calibration_report_no}</span>
        }
      },
      {
        header: 'Next Due Date',
        accessorKey: 'next_due_date',
        cell: (props) => {
          const row = props.row.original
          return <span>{row.next_due_date}</span>
        }
      },
      {
        header: '',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />
      }
    ],
    []
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
        data={dataWithSrNo}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <CalibrationDeleteConfirmation />
      <NewCalibrationDialog />
    </>
  )
}

export default CalibrationTable
