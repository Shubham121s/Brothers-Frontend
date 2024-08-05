import React, { useMemo, useEffect, useState } from "react";
import DataTable from "../../../../../components/shared/DataTable";
import { Table } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { setPurchaseOrderListData } from "../store/stateSlice";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const { Tr, Th, Td, THead, TBody } = Table;

const InwardTable = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.grn.state.purchaseOrderList);
  const category = useSelector((state) => state.grn.data.category);

  const columns = useMemo(() => {
    const baseColumn = [
      {
        header: "product code",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.product_code}</span>;
        },
      },
      {
        header: "Product",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.name}</span>;
        },
      },
      {
        header: "PO quantity",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.ordered_quantity}</span>;
        },
      },

      {
        header: "inwarded Qty",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.actual_quantity}</span>;
        },
      },
      {
        header: "rejected qty",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.rejected_quantity}</span>;
        },
      },
      {
        header: "comments",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.comments}</span>;
        },
      },
    ];

    return baseColumn;
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    style={{ border: "1px solid black" }}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
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
                    <Td style={{ border: "1px solid black" }} key={cell.id}>
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
    </>
  );
};

export default InwardTable;
