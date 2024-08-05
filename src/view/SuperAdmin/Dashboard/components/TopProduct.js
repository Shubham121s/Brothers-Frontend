import React, { useMemo } from "react";
import {
  Card,
  Button,
  Table,
  Avatar,
  Tag,
  Tooltip,
} from "../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FiPackage } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useThemeClass from "../../../../utils/hooks/useThemeClass";

const { Tr, Td, TBody, THead, Th } = Table;

const statusColor = {
  delivered: {
    label: "Delivered",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    bgClass: "bg-red-100",
    textClass: "text-red-600",
  },
  processing: {
    label: "Processing",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-600",
  },
  pending: {
    label: "Pending",
    bgClass: "bg-blue-100",
    textClass: "text-blue-600",
  },
};

const PoAColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return (
    <Tooltip
      title={
        <div>
          View <strong className="text-yellow-400">Purchase</strong> Order
        </div>
      }
    >
      <Link
        className={`hover:${textTheme} font-semibold`}
        to={`/super/admin/po-details/${row?.po_id}`}
      >
        {row?.poa}
      </Link>
    </Tooltip>
  );
};

const TopProduct = ({ data = [], className }) => {
  const columns = [
    {
      header: "POa",
      accessorKey: "poa",
      cell: (props) => {
        const row = props.row.original;
        return <PoAColumn row={row} />;
      },
    },
    {
      header: "PO Number",
      accessorKey: "number",
      cell: (props) => {
        const row = props.row.original;
        return <div className="uppercase">{row?.number}</div>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="mr-2">
            <Tag
              className={`${statusColor[row?.status]?.bgClass} ${
                statusColor[row?.status]?.textClass
              } border-0`}
            >
              {statusColor[row?.status]?.label}
            </Tag>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4>Latest POs</h4>
        <Button
          size="sm"
          onClick={() => {
            return navigate("/super/admin/po/list");
          }}
        >
          View POs
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

export default TopProduct;
