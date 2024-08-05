import React, { useMemo, useEffect, useState } from "react";
import DataTable from "../../../../../components/shared/DataTable";
import { Card, Input, Table } from "../../../../../components/ui";
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

  const data = useSelector((state) => state.inward.state.purchaseOrderList);

  const handleInputChange = (row, field, value) => {
    dispatch(
      setPurchaseOrderListData({ id: row.purchase_order_list_id, field, value })
    );
  };

  const columns = useMemo(
    () => [
      {
        header: "product code",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.product_code}</span>;
        },
      },
      {
        header: "part name",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.part_name}</span>;
        },
      },
      {
        header: "Description",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.description}</span>;
        },
      },
      {
        header: "thickness",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.thickness}</span>;
        },
      },
      {
        header: "Unit",
        accessorKey: "unit",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.unit_measurement || "-"}</span>;
        },
      },
      {
        header: "weight",
        accessorKey: "weight",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.weight || "-"}</span>;
        },
      },
      {
        header: "PO quantity",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.quantity}</span>;
        },
      },
      {
        header: "total weight",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.weight * row?.quantity || "-"}</span>;
        },
      },
      {
        header: "Actual desc.",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <Input
              type="text"
              size="sm"
              style={{ width: "180px" }}
              onChange={(e) =>
                handleInputChange(row, "actual_description", e.target.value)
              }
            />
          );
        },
      },
      {
        header: "Actual thickness",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <Input
              type="text"
              size="sm"
              style={{ width: "180px" }}
              onChange={(e) =>
                handleInputChange(row, "actual_thickness", e.target.value)
              }
            />
          );
        },
      },
      {
        header: "Actual weight",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <Input
              type="text"
              size="sm"
              style={{ width: "180px" }}
              onChange={(e) =>
                handleInputChange(row, "actual_weight", e.target.value)
              }
            />
          );
        },
      },
      {
        header: "Actual Inward Qty",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <Input
              type="text"
              size="sm"
              style={{ width: "180px" }}
              onChange={(e) =>
                handleInputChange(row, "actual_quantity", e.target.value)
              }
            />
          );
        },
      },
      {
        header: "rejected Qty",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <Input
              type="text"
              style={{ width: "180px" }}
              size="sm"
              onChange={(e) =>
                handleInputChange(row, "rejected_quantity", e.target.value)
              }
            />
          );
        },
      },
      {
        header: "v code",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return (
            <Input
              type="text"
              style={{ width: "180px" }}
              size="sm"
              onChange={(e) => handleInputChange(row, "v_code", e.target.value)}
            />
          );
        },
      },
      {
        header: "Comments",
        accessorKey: "comments",
        cell: (props) => {
          const row = props.row.original;
          return (
            <Input
              type="text"
              size="sm"
              style={{ width: "180px" }}
              onChange={(e) =>
                handleInputChange(row, "comments", e.target.value, row)
              }
            />
          );
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

  return (
    <>
      {/* <Table>
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
      </Table> */}
      <div className="grid grid-cols-3 gap-4">
        {data.map((m) => (
          <Card className="bg-orange-100">
            <div className="flex justify-between">
              <strong>Product Code :</strong>{" "}
              <span className="uppercase">{m?.Product?.product_code}</span>
            </div>
            <div className="flex justify-between">
              <strong>Part name :</strong>{" "}
              <span className="uppercase">{m?.Product?.name}</span>
            </div>
            <div className="flex justify-between">
              <strong>Remarks :</strong>{" "}
              <span className="uppercase">{m?.remarks}</span>
            </div>
            {m?.Product?.category === "raw_material" && (
              <>
                {" "}
                <div className="flex justify-between">
                  <strong>Thickness :</strong>{" "}
                  <span className="uppercase">{m?.Product?.thickness}</span>
                </div>
                <div className="flex justify-between">
                  <strong>unit :</strong>{" "}
                  <span className="uppercase">
                    {m?.Product?.unit_measurement}
                  </span>
                </div>
                <div className="flex justify-between">
                  <strong>weight :</strong>{" "}
                  <span className="uppercase">{m?.Product?.weight}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <strong>PO quantity :</strong>{" "}
              <span className="uppercase">{m?.quantity}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                type="text"
                size="sm"
                placeholder="Actual Quantity"
                style={{ width: "180px" }}
                onChange={(e) =>
                  handleInputChange(m, "actual_quantity", e.target.value)
                }
              />
              <Input
                type="text"
                placeholder="Rejected Quantity"
                style={{ width: "180px" }}
                size="sm"
                onChange={(e) =>
                  handleInputChange(m, "rejected_quantity", e.target.value)
                }
              />

              <Input
                type="text"
                size="sm"
                placeholder="Comments"
                style={{ width: "180px" }}
                onChange={(e) =>
                  handleInputChange(m, "comments", e.target.value)
                }
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default InwardTable;
