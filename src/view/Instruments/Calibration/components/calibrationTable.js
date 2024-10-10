import React, { useMemo, useEffect, useState } from 'react'
import DataTable from '../../../../components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch, useSelector } from 'react-redux'
import { getAnnual, setTableData, getAllInstrument } from '../store/dataSlice'
import useThemeClass from '../../../../utils/hooks/useThemeClass'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
  setSelectedAnnual,
  toggleEditDialog,
  toggleImageDialog
} from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import CalibrationDeleteConfirmation from './calibrationDeleteConfirmation'
import NewCalibrationDialog from './newCalibrationDialog'
import { Tag } from '../../../../components/ui'
import { FaFileImage } from 'react-icons/fa'
import ImageDialog from './ImageDialog'

const CalibrationTable = () => {
  const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()

    const onOpen = () => {
      dispatch(setSelectedAnnual(row))
      dispatch(toggleImageDialog(true))
    }

    const onEdit = () => {
      dispatch(toggleEditDialog(true))
      dispatch(setSelectedAnnual(row))
    }

    const onDelete = () => {
      dispatch(toggleDeleteConfirmation(true))
      dispatch(setSelectedAnnual(row))
    }

    return (
      <div className="flex justify-center items-center text-lg">
        {row?.certificate && (
          <span
            className="cursor-pointer p-2 hover:text-emerald-500"
            onClick={onOpen}
          >
            <FaFileImage />
          </span>
        )}

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
        header: 'instrument',
        accessorKey: 'Instrument',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className="uppercase">
              {row?.Instrument?.instrument_name}
            </span>
          )
        }
      },
      {
        header: 'Maker',
        accessorKey: 'Instrument',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className="uppercase">
              {row?.Instrument?.instrument_make}
            </span>
          )
        }
      },

      {
        header: 'ID no.',
        accessorKey: 'Instrument',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className="uppercase">{row?.Instrument?.instrument_no}</span>
          )
        }
      },
      {
        header: 'size',
        accessorKey: 'Instrument',
        cell: (props) => {
          const row = props.row.original
          return (
            <span className="uppercase">
              {row?.Instrument?.instrument_size}
            </span>
          )
        }
      },
      {
        header: 'l.c',
        accessorKey: 'Instrument',
        cell: (props) => {
          const row = props.row.original
          return <span>{row?.Instrument?.instrument_lc || '-'}</span>
        }
      },

      {
        header: 'Cal. frequency',
        accessorKey: 'Instrument',
        cell: (props) => {
          const row = props.row.original
          return <span>{row?.Instrument?.instrument_cal_frq} Year</span>
        }
      },
      {
        header: 'Cal. Date',
        accessorKey: 'calibration_date',
        cell: (props) => {
          const row = props.row.original
          return <span>{row?.calibration_date}</span>
        }
      },
      {
        header: 'next cal. date',
        accessorKey: 'next_due_date',
        cell: (props) => {
          const row = props.row.original
          return <span>{row?.next_due_date}</span>
        }
      },
      {
        header: 'Cal certificate no.',
        accessorKey: 'calibration_report_no',
        cell: (props) => {
          const row = props.row.original
          return <span>{row?.calibration_report_no}</span>
        }
      },
      {
        header: 'Cal status',
        accessorKey: 'calibration_result',
        cell: (props) => {
          const row = props.row.original
          return (
            <div>
              <Tag
                className={`bg-orange-100 
              text-orange-600
             border-0`}
              >
                {row?.calibration_result}
              </Tag>
            </div>
          )
        }
      },

      {
        header: 'Action',
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
      <ImageDialog />
    </>
  )
}

export default CalibrationTable
