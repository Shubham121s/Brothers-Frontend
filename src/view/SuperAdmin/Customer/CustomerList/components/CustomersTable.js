import React, { useEffect, useCallback, useMemo } from "react";
import { Badge, Tag } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { getCustomersWithPagination, setTableData } from "../store/dataSlice";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../../components/shared/DataTable";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import {
  setSelectedCustomer,
  togglDeleteConfirmationDialog,
} from "../store/stateSlice";
import DeleteCustomerConfirmationDialog from "./DeleteConfirmationDialog";

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
  supplier: {
    label: "Supplier",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  customer: {
    label: "Customer",
    bgClass: "bg-red-100",
    textClass: "text-red-600",
  },
  both: {
    label: "Both",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-600",
  },
};

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(setSelectedCustomer(row));
    dispatch(togglDeleteConfirmationDialog(true));
  };

  return (
    <div className="flex justify-between text-lg">
      <span className="mr-2">
        {" "}
        <Link
          className={`cursor-pointer hover:${textTheme}`}
          to={`/customer-details/${row?.customer_id}`}
        >
          <HiOutlinePencil />
        </Link>
      </span>
      <span className="cursor-pointer" onClick={onDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const NameColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return <div className="items-center uppercase">{row.name}</div>;
};

const columns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (props) => {
      const row = props.row.original;
      return <NameColumn row={row} />;
    },
  },
  {
    header: "c. code",
    accessorKey: "customer_code",
  },
  {
    header: "v. code",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.vender_code || "-"}</span>;
    },
  },
  {
    header: "mobile",
    accessorKey: "mobile",
    cell: (props) => {
      const row = props.row.original;
      return <span>{row.mobile || "-"}</span>;
    },
  },
  {
    header: "email",
    accessorKey: "email",
    cell: (props) => {
      const row = props.row.original;
      return <span className="lowercase">{row.email || "-"}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <Badge className={statusColor[row.status]?.dotClass} />
          <span
            className={`ml-2 font-semibold capitalize ${
              statusColor[row.status]?.textClass
            }`}
          >
            {statusColor[row.status]?.label}
          </span>
        </div>
      );
    },
  },
  {
    header: "Type",
    accessorKey: "type",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="mr-2">
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
    accessorKey: "createdAt",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          {dayjs(row?.createdAt).format("DD/MM/YYYY")}
        </div>
      );
    },
  },
  {
    header: "",
    accessorKey: "id",
    cell: (props) => {
      const row = props.row.original;
      return <ActionColumn row={row} />;
    },
  },
];

const CustomerTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer.data.customerList);
  const loading = useSelector((state) => state.customer.data.loading);
  const { type } = useSelector((state) => state.customer.data.filterData);

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.customer.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(
      getCustomersWithPagination({ pageIndex, pageSize, sort, query, type })
    );
  }, [pageIndex, pageSize, sort, query, type, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, type]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
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
        pagingData={{ pageIndex, pageSize, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
      <DeleteCustomerConfirmationDialog />
    </>
  );
};

export default CustomerTable;
