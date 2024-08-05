import React, { useCallback, useEffect, useMemo } from "react";
import { Badge, Tooltip } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import { getAllRawMaterials, setTableData } from "../store/dataSlice";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import {
  setSelectedWorker,
  toggleDeleteConfirmation,
  toggleEditDialog,
  togglePasswordDialog,
} from "../store/stateSlice";
import { useNavigate } from "react-router-dom";
import ItemDialog from "./itemDialog";

const statusColor = {
  true: {
    label: "Active",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  false: {
    label: "In-Active",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { textTheme } = useThemeClass();

  const onEdit = () => {
    dispatch(toggleEditDialog(true));
    dispatch(setSelectedWorker(row));
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedWorker(row));
  };

  const onAttendance = () => {
    navigate(`/super/admin/worker/attendance?id=${row.worker_id}`);
  };

  return (
    <div className="flex text-lg">
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

const IdDetailsColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onView = () => {
    navigate(`super/admin/worker/details?id=${row.worker_id}`);
  };

  return (
    <span
      className={`cursor-pointer font-semibold hover:${textTheme}`}
      onClick={onView}
    >
      #{row?.worker_id}
    </span>
  );
};

const ItemsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLedger = (row) => {
    navigate(`/super/admin/worker/details?id=${row.worker_id}`);
    dispatch(setSelectedWorker(row));
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <IdDetailsColumn row={row} />;
        },
      },
      {
        header: "name",
        accessorKey: "worker_name",
        cell: (props) => {
          const row = props.row.original;
          return <div className="flex items-center">{row?.worker_name}</div>;
        },
      },
      {
        header: "price",
        accessorKey: "worker_mobile",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">+91 {row?.worker_mobile}</div>
          );
        },
      },
      {
        header: "quantity",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <div className="flex items-center">{row?.quantity}</div>;
        },
      },
      {
        header: "status",
        accessorKey: "worker_status",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.worker_status].dotClass} />
              <span
                className={`ml-2 font-semibold capitalize ${
                  statusColor[row.worker_status].textClass
                }`}
              >
                {statusColor[row.worker_status].label}
              </span>
            </div>
          );
        },
      },
      {
        header: "Action",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} />;
        },
      },
    ],
    []
  );

  const data = useSelector((state) => state.items.data.raw_materials);
  const loading = useSelector((state) => state.items.data.loading);
  const { status } = useSelector((state) => state.items.data.filterData);

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.items.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getAllRawMaterials({ pageIndex, pageSize, query, status }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, status]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, status]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total, status }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, query, total, status]
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
        data={data}
        loading={loading}
        pagingData={{ pageIndex, pageSize, query, total, status }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <ItemDialog />
    </>
  );
};

export default ItemsTable;
