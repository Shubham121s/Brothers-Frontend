import React, { useMemo, useEffect } from "react";
import DataTable from "../../../../components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import { useDispatch, useSelector } from "react-redux";
import { getMachine, setTableData } from "../store/dataSlice";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { FaRegEye } from "react-icons/fa";
import MachineForm from "./machineForm";
import {
  toggleNewDialog,
  setSelectedMachine,
  toggleNewDialogBreakdown,
} from "../store/stateSlice";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import { GrVmMaintenance } from "react-icons/gr";
import BreakdownForm from "./breakdownForm";
import { deleteMachine } from "../store/dataSlice";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import MachineDeleteConfirmation from "./machineDelete";

const MachineTable = () => {
  const ActionColumn = ({ row }) => {
    const dispatch = useDispatch();
    const { textTheme } = useThemeClass();
    const navigate = useNavigate();

    const onEdit = () => {
      //  dispatch(setSelectedProduct(row.id))
      // dispatch(toggleProductForm(true))
      dispatch(toggleNewDialog(true));
      dispatch(setSelectedMachine(row));
    };

    const onDelete = () => {
      dispatch(toggleDeleteConfirmation(true));
      dispatch(setSelectedMachine(row));
      // dispatch(deleteMachine(row.id));
    };
    const onMove = () => {
      // navigate(`/retailer/${row.id}`)
      navigate(`/ledger/${row.machine_id}`);
    };
    const onMaintainance = () => {
      dispatch(toggleNewDialogBreakdown(true));
      dispatch(setSelectedMachine(row));
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
        <span
          className="cursor-pointer p-2 hover:text-green-500"
          onClick={onMove}
        >
          <FaRegEye />
        </span>
        <span
          className="cursor-pointer p-2 hover:text-blue-500"
          onClick={onMaintainance}
        >
          <GrVmMaintenance />
        </span>
      </div>
    );
  };
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.machine.data.tableData
  );

  const filterData = useSelector((state) => state.machine.data.filterData);

  const loading = useSelector((state) => state.machine.data.loading);

  const data = useSelector((state) => state.machine.data.machineList);
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
    dispatch(getMachine({ pageIndex, pageSize, sort, query, filterData }));
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
        header: "Machine Name",
        accessorKey: "machine_name",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.machine_name}</span>;
        },
      },
      {
        header: "Machine Type",
        accessorKey: "machine_type",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.machine_type}</span>;
        },
      },

      {
        header: "Machine Model",
        accessorKey: "machine_model",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.machine_model}</span>;
        },
      },
      {
        header: "Machine Description",
        accessorKey: "machine_description",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.machine_description}</span>;
        },
      },
      {
        header: "Company Name",
        accessorKey: "company_name",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.company_name}</span>;
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
      <MachineForm />
      <BreakdownForm />
      <MachineDeleteConfirmation />
    </>
  );
};

export default MachineTable;
