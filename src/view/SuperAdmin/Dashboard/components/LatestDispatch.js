import React, { useMemo, useCallback } from "react";
import { Card, Button, Table, Badge, Tag } from "../../../../components/ui";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

const { Tr, Td, TBody, THead, Th } = Table;

const orderStatusColor = {
  delivered: {
    label: "Delivered",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  pending: {
    label: "Pending",
    dotClass: "bg-amber-500",
    textClass: "text-amber-500",
  },
  rejected: {
    label: "Rejected",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

const OrderColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onView = useCallback(() => {
    if (row?.invoice_type === "domestic")
      navigate(
        `/super/admin/dispatch/domestic/edit/${row?.dispatch_invoice_id}`
      );
    else
      navigate(
        `/super/admin/dispatch/foreign/edit/${row?.dispatch_invoice_id}`
      );
  }, [navigate, row]);

  return (
    <span
      className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
      onClick={onView}
    >
      {row.invoice_no}
    </span>
  );
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

const LatestDispatch = ({ data = [], className }) => {
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (props) => <OrderColumn row={props.row.original} />,
      },
      {
        header: "Customer",
        accessorKey: "customer",
        cell: (props) => {
          const row = props.row.original;
          return (
            <span className="uppercase">{row?.DispatchConsignee?.name}</span>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (props) => {
          const { status } = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={orderStatusColor[status].dotClass} />
              <span
                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
              >
                {orderStatusColor[status].label}
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
            <div>
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
        header: "Date",
        accessorKey: "date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{dayjs(row.createdAt)?.format("DD/MM/YYYY")}</span>;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <h4>Latest Dispatch</h4>
        <Button
          size="sm"
          onClick={() => {
            navigate("/super/admin/dispatch-list");
          }}
        >
          View Invoice
        </Button>
      </div>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </Card>
  );
};

export default LatestDispatch;
