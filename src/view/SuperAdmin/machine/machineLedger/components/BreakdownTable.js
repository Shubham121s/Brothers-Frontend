import React,{useEffect, useMemo} from "react";
import { getMachineById } from "../store/dataSlice";
import DataTable from "components/shared/DataTable";
import { useSelector ,useDispatch} from "react-redux";
const BreakdownTable = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.retailerLedgerList.data.breakdownList)
    let dataWithSrNo = [];
    if (data) {
      dataWithSrNo = data.map((item, index) => ({
        ...item,
        sr_no: index + 1,
      }));
    }
    const loading = useSelector((state) => state.retailerLedgerList.data.loading)
  
  const column1s = useMemo(
    () => [
      {
        header: "Sr No",
        accessorKey: "sr_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.sr_no}</span>;
        },
      },
      {
        header: "Date",
        accessorKey: "breakdown_date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.breakdown_date}</span>;
        },
      },
      {
        header: "Breakdown Time",
        accessorKey: "breakdown_time",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.breakdown_time}</span>;
        },
      },

      {
        header: "Machine Number",
        accessorKey: "machine_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.machine_no}</span>;
        },
      },
      {
        header: "Machine Problem",
        accessorKey: "machine_problem",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.machine_problem}</span>;
        },
      },
      {
        header: "Action Taken",
        accessorKey: "action_taken",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.action_taken}</span>;
        },
      },
      {
        header: "Maintenance Person & Firm",
        accessorKey: "maintenance",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.maintenance}</span>;
        },
      },
      {
        header: "Cost",
        accessorKey: "cost",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.cost}</span>;
        },
      },
      {
        header: "Responsible Person(vpi)",
        accessorKey: "responsible_person",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.responsible_person}</span>;
        },
      },
      {
        header: "Spare Consumed",
        accessorKey: "spare_consumed",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.spare_consumed}</span>;
        },
      },
      {
        header: "Spare Cost",
        accessorKey: "spare_cost",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.spare_cost}</span>;
        },
      },
      {
        header: "Complete date",
        accessorKey: "complete_date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.complete_date}</span>;
        },
      },
      {
        header: "Complete Time",
        accessorKey: "complete_time",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.complete_time}</span>;
        },
      },
      {
        header: "Total downtime",
        accessorKey: "total_downtime",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.total_downtime}</span>;
        },
      },
      {
        header: "Total cost",
        accessorKey: "total_cost",
        cell: (props) => {
          const row = props.row.original;
          const totalCost = Number(row.cost) + Number(row.spare_cost);
          return <span>{totalCost}</span>;
        },
      },
      {
        header: "Remarks",
        accessorKey: "remarks",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.remarks}</span>;
        },
      },
    ],
    []
  );
  return <>
    <DataTable columns={column1s} data={dataWithSrNo} skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ width: 28, height: 28 }}
      loading={loading}  />
  </>;
};

export default BreakdownTable;
