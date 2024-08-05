import React, { useMemo, useEffect } from "react";
import DataTable from "../../../../components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import { useDispatch, useSelector } from "react-redux";
import {
  getBreakdown,
  setTableData,
  deleteBreakdown,
} from "../store/dataSlice";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import BreakdownForm from "./breakdownForm";
import {
  toggleNewDialog,
  setSelectedBreakdown,
  toggleDeleteConfirmation,
} from "../store/stateSlice";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import BreakdownDeleteConfirmation from "./breakdownDelete";

const BreakdownTable = () => {
  const ActionColumn = ({ row }) => {
    const dispatch = useDispatch();
    const { textTheme } = useThemeClass();
    // const navigate = useNavigate()

    const onEdit = () => {
      //  dispatch(setSelectedProduct(row.id))
      // dispatch(toggleProductForm(true))
      dispatch(toggleNewDialog(true));
      dispatch(setSelectedBreakdown(row));
    };

    const onDelete = () => {
      dispatch(toggleDeleteConfirmation(true));
      dispatch(setSelectedBreakdown(row));
      // dispatch(deleteBreakdown(row.breakdown_id))
    };

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
    );
  };
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.breakdown.data.tableData
  );

  const filterData = useSelector((state) => state.breakdown.data.filterData);

  const loading = useSelector((state) => state.breakdown.data.loading);

  const data = useSelector((state) => state.breakdown.data.breakdownList);
  console.log(data);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort]);

  // useEffect(() => {
  //     if (tableRef) {
  //         tableRef.current.resetSorting()
  //     }
  // }, [filterData])

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const fetchData = () => {
    dispatch(getBreakdown({ pageIndex, pageSize, sort, query, filterData }));
  };
  let dataWithSrNo = [];
  if (data) {
    dataWithSrNo = data.map((item, index) => ({
      ...item,
      sr_no: index + 1,
    }));
  }
  const dispatch = useDispatch();
  const columns = useMemo(
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
      {
        header: "",
        id: "action",
        cell: (props) => <ActionColumn row={props.row.original} />,
      },
    ],
    []
  );

  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

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
      <BreakdownForm />
      <BreakdownDeleteConfirmation />
    </>
  );
};

export default BreakdownTable;
