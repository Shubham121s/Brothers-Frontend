import React, { useEffect, useCallback, useMemo, useState } from "react";
import {
  Badge,
  Tag,
  Input,
  Dialog,
  Button,
} from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomerOption,
  getAllInvoiceDate,
  getAllInvoiceNumber,
  getAllMonths,
  getAllYears,
  getDispatchInvoiceWithPagination,
  setTableData,
} from "../store/dataSlice";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../../components/shared/DataTable";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import {
  setSelectedInvoice,
  toggleInvoiceDialog,
  toggleDetailDialog,
  togglDeleteConfirmationDialog,
} from "../store/stateSlice";

import { MdDetails } from "react-icons/md";
import DetailDialog from "./DetailsDialog";
import DeleteInvoiceConfirmationDialog from "./DeleteConfirmationDialog";

const PasswordDialog = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "Brothers2025@") {
      setError("");
      setPassword("");
      setShowPassword(false);
      onConfirm();
      onClose();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    setShowPassword(false);
    onClose();
  };

  const handleCancel = () => {
    setPassword("");
    setError("");
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      onRequestClose={handleClose}
      width={420}
    >
      <div className="p-8">
        <h4 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Authorization Required
        </h4>
        <p className="mb-8 text-center text-gray-600 text-base">
          To edit completed invoices, please enter your password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pr-12 ${error ? "border-red-500" : ""}`}
                style={{
                  height: "3rem",
                  fontSize: "1rem",
                  paddingRight: "3rem",
                }}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-6">
            <Button
              variant="plain"
              onClick={handleCancel}
              className="px-8 py-3 text-base font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="blue-600"
              type="submit"
              disabled={!password.trim()}
              className="px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

const statusColor = {
  confirmed: {
    label: "Completed",
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
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const onInvoiceDialog = () => {
    dispatch(toggleInvoiceDialog(true));
    dispatch(setSelectedInvoice(row));
  };

  const onEdit = useCallback(() => {
    if (row?.invoice_type === "domestic")
      navigate(`/dispatch/domestic/edit/${row?.dispatch_invoice_id}`);
    else navigate(`/dispatch/foreign/edit/${row?.dispatch_invoice_id}`);
  }, [row, navigate]);

  const onDelete = () => {
    dispatch(togglDeleteConfirmationDialog(true));
    dispatch(setSelectedInvoice(row));
  };

  const onDetailsDialog = () => {
    dispatch(toggleDetailDialog(true));
    dispatch(setSelectedInvoice(row));
  };

  const handlePasswordConfirm = () => {
    onEdit();
  };

  const handleEditClick = () => {
    if (row.status === "confirmed") {
      setShowPasswordDialog(true);
    } else {
      onEdit();
    }
  };

  return (
    <>
      <div className="flex justify-center text-lg gap-x-4">
        <span
          onClick={onInvoiceDialog}
          className={`cursor-pointer hover:text-pink-500 `}
        >
          <HiOutlineEye />
        </span>
        <span
          onClick={onDetailsDialog}
          className={`cursor-pointer hover:text-lime-500 `}
        >
          <MdDetails />
        </span>
        <span
          onClick={handleEditClick}
          className={`cursor-pointer hover:${textTheme} text-lg ${
            row.status === "confirmed" ? "opacity-50" : ""
          }`}
          title={
            row.status === "confirmed"
              ? "Click to enter password for editing"
              : ""
          }
        >
          <HiOutlinePencil />
        </span>
        <span
          onClick={onDelete}
          className={`cursor-pointer hover:${textTheme}`}
        >
          <HiOutlineTrash />
        </span>
      </div>
      <PasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onConfirm={handlePasswordConfirm}
      />
    </>
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
    header: "Customer Name",
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

  const {
    pageIndex,
    pageSize,
    sort,
    query,
    total,
    invoice_no,
    invoice_date,
    customer_id,
    year,
    months,
  } = useSelector((state) => state.dispatch_invoice.data.tableData);

  const fetchData = useCallback(() => {
    dispatch(
      getDispatchInvoiceWithPagination({
        pageIndex,
        pageSize,
        sort,
        query,
        type,
        customer_id,
        invoice_no,
        invoice_date,
        year,
        months,
      })
    );
  }, [
    pageIndex,
    pageSize,
    sort,
    query,
    type,
    dispatch,
    customer_id,
    invoice_no,
    invoice_date,
    year,
    months,
  ]);

  useEffect(() => {
    fetchData();
  }, [
    fetchData,
    pageIndex,
    pageSize,
    sort,
    type,
    customer_id,
    invoice_no,
    invoice_date,
    year,
    months,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(getAllCustomerOption());
    dispatch(getAllInvoiceNumber());
    dispatch(getAllInvoiceDate());
    dispatch(getAllYears());
    dispatch(getAllMonths());
    // dispatch(getAllPoDates());
  }, [dispatch]);

  const tableData = useMemo(
    () => ({
      pageIndex,
      pageSize,
      sort,
      query,
      total,
      customer_id,
      invoice_no,
      invoice_date,
      year,
      months,
    }),
    [
      pageIndex,
      pageSize,
      sort,
      query,
      total,
      customer_id,
      invoice_no,
      invoice_date,
      year,
      months,
    ]
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
