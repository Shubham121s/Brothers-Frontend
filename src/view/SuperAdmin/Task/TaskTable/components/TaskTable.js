import React, { useCallback, useEffect, useState } from "react";
import DataTable from "../../../../../components/shared/DataTable";
import { MdOutlineMessage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "../store/dataSlice";
import { useNavigate } from "react-router-dom";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { HiEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import {
  setSelectedChat,
  setSelectedTask,
  toggleDeleteTaskDialog,
  toggleEyeDialog,
  toggleNewTaskDialog,
} from "../store/stateSlice";
import { Badge, Tag } from "../../../../../components/ui";
import DeleteConfirm from "./DeleteConfirm";

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEdit = () => {
    console.log("click");
    dispatch(toggleNewTaskDialog(true));
  };

  const onDelete = () => {
    console.log("click");
    dispatch(setSelectedTask(row));
    dispatch(toggleDeleteTaskDialog(true));
  };

  const onEye = () => {
    dispatch(setSelectedTask(row));
    dispatch(toggleEyeDialog(true));
  };

  return (
    <div className="flex justify-between text-lg">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onDelete}>
        <HiOutlineTrash />
      </span>
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEye}>
        <HiEye />
      </span>
    </div>
  );
};

const TaskTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.task.data.taskList);

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.task.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getAllTask({ pageIndex, pageSize, query }));
  }, [pageIndex, pageSize, query, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize]);

  const onReply = (row) => {
    console.log("row", row);
    navigate("/task/chat", { state: { record: row } });
  };

  const priorityColor = {
    high: {
      label: "High",
      bgClass: "bg-red-100",
      textClass: "text-red-600",
    },
    low: {
      label: "Low",
      bgClass: "bg-orange-100",
      textClass: "text-orange-600",
    },
    medium: {
      label: "Medium",
      bgClass: "bg-emerald-100",
      textClass: "text-emerald-600",
    },
  };

  const statusColor = {
    active: {
      label: "Active",
      dotClass: "bg-emerald-500",
      textClass: "text-emerald-500",
    },
    inactive: {
      label: "In-Active",
      dotClass: "bg-red-500",
      textClass: "text-red-500",
    },
  };

  const columns = [
    {
      header: "Assigned By",
      accessorKey: "AssignedBy.name",
      cell: (props) => {
        const row = props.row.original;
        return <div>{row["AssignedBy.name"]}</div>;
      },
    },

    {
      header: "Description",
      accessorKey: "description",
      cell: (props) => {
        const row = props.row.original;
        return <div>{row?.description}</div>;
      },
    },
    {
      header: "Task",
      accessorKey: "task",
      cell: (props) => {
        const row = props.row.original;
        return <div>{row.task}</div>;
      },
    },
    {
      header: "Assigned To",
      accessorKey: "AssignedTo.name",
      cell: (props) => {
        const row = props.row.original;
        return <div>{row["AssignedTo.name"]}</div>;
      },
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (props) => {
        const row = props.row?.original;
        const priority = row?.priority;

        return (
          <div>
            <Tag
              className={`${priorityColor[priority]?.bgClass} ${priorityColor[priority]?.textClass} border-0`}
            >
              {priorityColor[priority]?.label || priority}
            </Tag>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex items-center">
            <Badge className={statusColor[row?.status]?.dotClass} />
            <span
              className={`ml-2 font-semibold capitalize ${
                statusColor[row?.status]?.textClass
              }`}
            >
              {statusColor[row?.status]?.label}
            </span>
          </div>
        );
      },
    },
    {
      header: "Reply",
      accessorKey: "reply",
      cell: (props) => {
        const row = props.row.original;
        return (
          <button
            onClick={() => onReply(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <MdOutlineMessage size={25} />
          </button>
        );
      },
    },
    {
      header: "",
      id: "action",
      cell: (props) => {
        const row = props.row.original;
        return <ActionColumn row={row} />;
      },
    },
  ];

  const onSelectChange = (selectedRows) => {
    console.log("Selected rows:", selectedRows);
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        // loading={loading}
        pagingData={{ pageIndex, pageSize, query, total }}
        // onPaginationChange={onPaginationChange}
        // onSelectChange={onSelectChange}
      />
      <DeleteConfirm fetchData={fetchData} />
    </div>
  );
};

export default TaskTable;
