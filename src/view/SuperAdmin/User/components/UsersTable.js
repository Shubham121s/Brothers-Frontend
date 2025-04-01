import React, { useEffect, useCallback, useMemo } from "react";
import { Badge, Tag } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, setTableData } from "../store/dataSlice";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "./../../../../components/shared/DataTable";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import {
  setSelectedUser,
  toggleDeleteUserDialog,
  toggleEditUserDialog,
  togglePasswordDialog,
} from "../store/stateSlice";
import UserEditFormDialog from "./UserEditDialog";
import UserDeleteConfirmation from "./UserDeleteConfirmation";
import { toggleFormAssignDialog } from "../store/stateSlice";
import { FaAddressBook } from "react-icons/fa";
import RoleAssignDialog from "./FormAssignDialog";
import UserPasswordUpdateDialog from "./UserPasswordUpdateDialog";
import { MdLockOpen } from "react-icons/md";

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

const typeColor = {
  "super-admin": {
    label: "Super Admin",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  "sub-admin": {
    label: "Sub Admin",
    bgClass: "bg-orange-100",
    textClass: "text-orange-600",
  },
  admin: {
    label: "Admin",
    bgClass: "bg-purple-100",
    textClass: "text-purple-600",
  },
  executive: {
    label: "Executive",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-600",
  },
};

const ActionColumn = ({ row }) => {
  const userAuthority = useSelector((state) => state.auth.user.authority);
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(toggleEditUserDialog(true));
    dispatch(setSelectedUser(row));
  };
  const onDelete = () => {
    dispatch(toggleDeleteUserDialog(true));
    dispatch(setSelectedUser(row));
  };

  const onFormAssign = () => {
    dispatch(toggleFormAssignDialog(true));
    dispatch(setSelectedUser(row));
  };

  const onUpdatePassword = () => {
    dispatch(togglePasswordDialog(true));
    dispatch(setSelectedUser(row));
  };

  return (
    <div className="flex justify-end text-lg gap-x-4">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
      <span className="cursor-pointer hover:text-red-500" onClick={onDelete}>
        <HiOutlineTrash />
      </span>
      {userAuthority.includes("super-admin") && (
        <span
          className={`cursor-pointer hover:text-pink-500`}
          onClick={onUpdatePassword}
        >
          <MdLockOpen />
        </span>
      )}
      {userAuthority.includes("super-admin") && (
        <span
          className="cursor-pointer hover:text-purple-500"
          onClick={onFormAssign}
        >
          <FaAddressBook />
        </span>
      )}
    </div>
  );
};

const columns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (props) => {
      const row = props.row?.original;
      return <div className="uppercase">{row?.name}</div>;
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (props) => {
      const row = props.row?.original;
      return <div>{row?.email}</div>;
    },
  },
  {
    header: "mobile",
    accessorKey: "mobile",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (props) => {
      const row = props.row?.original;
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
    header: "Type",
    accessorKey: "type",
    cell: (props) => {
      const row = props.row?.original;
      return (
        <div>
          <Tag
            className={`${typeColor[row?.type]?.bgClass} ${
              typeColor[row?.type]?.textClass
            } border-0`}
          >
            {typeColor[row?.type]?.label}
          </Tag>
        </div>
      );
    },
  },
  {
    header: "Reg. Date",
    accessorKey: "lastOnline",
    cell: (props) => {
      const row = props.row?.original;
      return (
        <div className="flex items-center">
          {dayjs(row?.createdAt).format("MM/DD/YYYY")}
        </div>
      );
    },
  },
  {
    header: "",
    accessorKey: "id",
    cell: (props) => {
      const row = props.row?.original;
      return <ActionColumn row={row} />;
    },
  },
];

const UsersTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.data.userList);
  const loading = useSelector((state) => state.user.data.loading);
  const { type } = useSelector((state) => state.user.data.filterData);

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.user.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getAllUsers({ pageIndex, pageSize, query, type }));
  }, [pageIndex, pageSize, query, type, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, type]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total }),
    [pageIndex, pageSize, query, total]
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
  const { user_id } = useSelector((state) => state.auth.user);
  data.filter((f) => f.user_id != user_id);
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={{ pageIndex, pageSize, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <UserEditFormDialog />
      <UserDeleteConfirmation />
      <RoleAssignDialog />
      <UserPasswordUpdateDialog />
    </>
  );
};

export default UsersTable;
