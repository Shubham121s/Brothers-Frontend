import React, { useEffect, useCallback, useMemo } from "react";
import { Badge, Tag } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  getDispatchInvoiceWithPagination,
  setTableData,
} from "../store/dataSlice";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../../components/shared/DataTable";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import {
  setSelectedInvoice,
  toggleInvoiceDialog,
  toggleDetailDialog,
  togglDeleteConfirmationDialog,
} from "../store/stateSlice";

import { MdDetails } from "react-icons/md";
import DetailDialog from "./DetailsDialog";
import DeleteInvoiceConfirmationDialog from "./DeleteConfirmationDialog";

const statusColor = {
  confirm: {
    label: "Dispatched",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  pending: {
    label: "Pending",
    dotClass: "bg-yellow-500",
    textClass: "text-yellow-500",
  },
  cancel: {
    label: "Cancel",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

const typeColor = {
  foreign: {
    label: "Foreign",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  domestic: {
    label: "Domestic",
    bgClass: "bg-pink-100",
    textClass: "text-pink-600",
  },
};

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInvoiceDialog = () => {
    dispatch(toggleInvoiceDialog(true));
    dispatch(setSelectedInvoice(row));
  };

  const onEdit = useCallback(() => {
    if (row?.invoice_type === "domestic")
      navigate(
        `/super/admin/dispatch/domestic/edit/${row?.dispatch_invoice_id}`
      );
    else
      navigate(
        `/super/admin/dispatch/foreign/edit/${row?.dispatch_invoice_id}`
      );
  }, [row]);

  const onDelete = () => {
    dispatch(togglDeleteConfirmationDialog(true));
    dispatch(setSelectedInvoice(row));
  };

  const onDetailsDialog = () => {
    dispatch(toggleDetailDialog(true));
    dispatch(setSelectedInvoice(row));
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <span
        onClick={onInvoiceDialog}
        className={`cursor-pointer hover:text-pink-500 `}
        // to={`/super/admin/dispatch/foreign/dispatch-invoice/${row?.dispatch_invoice_id}`}
      >
        <HiOutlineEye />
      </span>
      <span
        onClick={onDetailsDialog}
        className={`cursor-pointer hover:text-lime-500 `}
        // to={`/super/admin/dispatch/foreign/dispatch-invoice/${row?.dispatch_invoice_id}`}
      >
        <MdDetails />
      </span>
      <span
        onClick={onEdit}
        className={`cursor-pointer hover:${textTheme}`}
        // to={`/super/admin/dispatch/foreign/dispatch-invoice/${row?.dispatch_invoice_id}`}
      >
        <HiOutlinePencil />
      </span>
      <span
        onClick={onDelete}
        className={`cursor-pointer hover:${textTheme}`}
        // to={`/super/admin/dispatch/foreign/dispatch-invoice/${row?.dispatch_invoice_id}`}
      >
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const columns = [
  {
    header: "Invoice No",
    accessorKey: "invoice_no",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.invoice_no || "0"}</span>;
    },
  },
  {
    header: "Buyer Name",
    accessorKey: "DispatchConsignee.name",
    cell: (props) => {
      const { DispatchConsignee } = props.row.original;
      const nameParts = DispatchConsignee?.name.split(" ");

      const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
      return <div className="uppercase">{initials}</div>;
    },
  },
  // {
  //     header: 'C. Code',
  //     accessorKey: 'DispatchConsignee.customer_code',
  //     cell: (props) => {
  //         const row = props.row.original
  //         return (
  //             <span className='uppercase'>{row.DispatchConsignee.customer_code || '-'}</span>
  //         )
  //     }
  // },
  // {
  //     header: 'mobile',
  //     accessorKey: 'DispatchConsignee.mobile',
  //     cell: (props) => {
  //         const row = props.row.original
  //         return (
  //             <span className='uppercase'>{row.DispatchConsignee.mobile || '-'}</span>
  //         )
  //     }
  // },
  {
    header: "Status",
    accessorKey: "status",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <Badge className={statusColor[row.status].dotClass} />
          <span
            className={`ml-2 font-semibold capitalize ${
              statusColor[row.status].textClass
            }`}
          >
            {statusColor[row.status].label}
          </span>
        </div>
      );
    },
  },
  {
    header: "Type",
    accessorKey: "invoice_type",
    cell: (props) => {
      const row = props.row.original;
      return (
        <div className="mr-2">
          <Tag
            className={`${typeColor[row?.invoice_type].bgClass} ${
              typeColor[row?.invoice_type].textClass
            } border-0`}
          >
            {typeColor[row?.invoice_type].label}
          </Tag>
        </div>
      );
    },
  },
  {
    header: "Invoice Date",
    accessorKey: "invoice_date",
    cell: (props) => {
      const row = props.row.original;
      console.log(row);
      return (
        <div className="flex items-center">
          {dayjs(row?.invoice_date).format("DD/MM/YYYY")}
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
    header: "bl detail",
    accessorKey: "bl",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.bl || "-"}</span>;
    },
  },
  {
    header: "cefa datail",
    accessorKey: "cefa",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.cefa || "-"}</span>;
    },
  },
  {
    header: "coo detail",
    accessorKey: "coo",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.coo || "-"}</span>;
    },
  },
  {
    header: "",
    accessorKey: "dispatch_invoice_id",
    cell: (props) => {
      const row = props.row.original;
      return <ActionColumn row={row} />;
    },
  },
];

const DispatchInvoiceTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.dispatch_invoice.data.dispatchInvoiceList
  );
  const loading = useSelector((state) => state.dispatch_invoice.data.loading);
  const { type } = useSelector(
    (state) => state.dispatch_invoice.data.filterData
  );

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.dispatch_invoice.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(
      getDispatchInvoiceWithPagination({
        pageIndex,
        pageSize,
        sort,
        query,
        type,
      })
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
      <DetailDialog />
      <DeleteInvoiceConfirmationDialog />
    </>
  );
};

export default DispatchInvoiceTable;
