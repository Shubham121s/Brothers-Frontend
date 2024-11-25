import React, { useCallback, useEffect, useState } from "react";
import DataTable from "../../../../../components/shared/DataTable";
import { MdOutlineMessage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "../store/dataSlice";
import { useNavigate } from "react-router-dom";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import {
  setSelectedChat,
  setSelectedTask,
  toggleDeleteTaskDialog,
} from "../store/stateSlice";

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEdit = () => {
    navigate(`/product/edit/${row.product_id}`);
  };

  const onDelete = () => {
    dispatch(setSelectedTask(row));
    dispatch(toggleDeleteTaskDialog(true));
  };

  return (
    <div className="flex justify-between text-lg">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onDelete}>
        <HiOutlineTrash />
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
        const row = props.row.original;
        const priority = row?.priority;

        const priorityStyles = {
          high: { color: "red", fontWeight: "bold" },
          medium: { color: "orange", fontWeight: "bold" },
          low: { color: "green", fontWeight: "bold" },
        };

        return (
          <span style={priorityStyles[priority] || { color: "gray" }}>
            {priority}
          </span>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const row = props.row.original;
        const status = row?.status;

        const statusStyles = {
          active: { color: "green", fontWeight: "bold" },
          inactive: { color: "red", fontWeight: "bold" },
        };

        return (
          <span style={statusStyles[status] || { color: "black" }}>
            {status}
          </span>
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
    </div>
  );
};

export default TaskTable;
