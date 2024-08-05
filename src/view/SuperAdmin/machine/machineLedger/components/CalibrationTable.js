import React,{useEffect, useMemo} from "react";
import DataTable from "components/shared/DataTable";
import { getAnnual } from "../store/dataSlice";
import { useSelector ,useDispatch} from "react-redux";
const CalibrationTable = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.retailerLedgerList.data.calibrationList)
    const loading = useSelector((state) => state.retailerLedgerList.data.loading)
    useEffect(() => {
        dispatch(getAnnual())
    }, []);
    let dataWithSrNo = [];
    if (data) {
      dataWithSrNo = data.map((item, index) => ({
        ...item,
        sr_no: index + 1,
      }));
    }
    const columns = useMemo(
        () => [
            {
                header: 'Sr No',
                accessorKey: 'sr_no',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.sr_no}</span>
                },
            },
            {
                header: 'Description',
                accessorKey: 'calibration_description',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_description}</span>
                },
            },
            {
                header: 'Code No.',
                accessorKey: 'calibration_code_no',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_code_no}</span>
                },
            },

            {
                header: 'Serial No',
                accessorKey: 'calibration_serial_no',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_serial_no}</span>
                },
            },
            {
                header: 'Maker',
                accessorKey: 'calibration_maker',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_maker}</span>
                },
            },
            {
                header: 'Range',
                accessorKey: 'calibration_range',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_range}</span>
                },
            },

            {
                header: 'Calibration frequency',
                accessorKey: 'calibration_frequency',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_frequency}</span>
                },
            },
            {
                header: '01 Calibration Date',
                accessorKey: 'calibration_date',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_date}</span>
                },
            },
            {
                header: 'Calibration Agency',
                accessorKey: 'calibration_agency',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_agency}</span>
                },
            },
            {
                header: 'Cal Result',
                accessorKey: 'calibration_result',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_result}</span>
                },
            },
            {
                header: 'Cal Report No.',
                accessorKey: 'calibration_report_no',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.calibration_report_no}</span>
                },
            },
            {
                header: 'Next Due Date',
                accessorKey: 'next_due_date',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.next_due_date}</span>
                },
            },
        
      
        ],
        []
    )
  return (
    <>
     <DataTable columns={columns} data={dataWithSrNo} skeletonAvatarColumns={[0]}
              skeletonAvatarProps={{width:28,height:28}}
              loading={loading} />
    </>
  )
}

export default CalibrationTable