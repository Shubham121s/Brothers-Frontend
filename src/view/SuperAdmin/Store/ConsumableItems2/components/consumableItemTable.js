import React, { useCallback, useEffect, useMemo } from "react";
import { Badge, Tooltip } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import { getAllConsumableItem, setTableData } from "../store/dataSlice";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import {
  setSelectedConsumableItem,
  toggleDeleteConfirmation,
  toggleEditDialog,
} from "../store/stateSlice";
import { useNavigate } from "react-router-dom";
import ConsumableItemEdit from "./consumableItemEdit";
import ConsumableItemNew from "./consumableItemNew";
import dayjs from "dayjs";

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
    dispatch(setSelectedConsumableItem(row));
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedConsumableItem(row));
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

const IdDetailsColumn = ({ row, index }) => {
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
      #{index}
    </span>
  );
};

const ConsumableItemTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <IdDetailsColumn row={row} index={props.row.index + 1} />;
        },
      },
      {
        header: "name",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <div className="flex items-center">{row?.item_name}</div>;
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
        header: "added",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs(row?.createdAt).format("YYYY-DD-MM")}
            </div>
          );
        },
      },
      // {
      //   header: "",
      //   accessorKey: "worker_status",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="flex items-center">
      //         <Badge className={statusColor[row.worker_status].dotClass} />
      //         <span
      //           className={`ml-2 font-semibold capitalize ${
      //             statusColor[row.worker_status].textClass
      //           }`}
      //         >
      //           {statusColor[row.worker_status].label}
      //         </span>
      //       </div>
      //     );
      //   },
      // },
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

  const data = useSelector(
    (state) => state.consumable_items.data.consumableItems
  );
  const loading = useSelector((state) => state.consumable_items.data.loading);
  const { status } = useSelector(
    (state) => state.consumable_items.data.filterData
  );

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.consumable_items.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getAllConsumableItem({ pageIndex, pageSize, query, status }));
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
      <ConsumableItemEdit />
      <ConsumableItemNew />
    </>
  );
};

export default ConsumableItemTable;
