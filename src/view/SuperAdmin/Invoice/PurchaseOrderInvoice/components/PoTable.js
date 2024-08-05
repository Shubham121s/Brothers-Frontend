import React, { useMemo } from "react";
import { AdaptableCard } from "../../../../../components/shared";
import { Table } from "../../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { NumericFormat } from "react-number-format";
import TFoot from "../../../../../components/ui/Table/TFoot";
import dayjs from "dayjs";

const { Tr, Th, Td, THead, TBody } = Table;

const PriceAmount = ({ value }) => {
  return (
    <NumericFormat
      displayType="text"
      value={Number(value).toFixed(2)}
      thousandSeparator={true}
    />
  );
};

const TFootRows = ({ data = [], className }) => {
  const totalAmount = data.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );
  return (
    <Tr
      style={{
        border: ".2px dashed lightGray",
        padding: "3px",
        textAlign: "center",
      }}
      className={className}
    >
      <Td
        style={{ border: ".2px dashed lightGray", padding: "3px" }}
        colSpan="7"
      ></Td>
      <Td
        className={`font-semibold ${className}`}
        style={{ border: ".2px dashed lightGray", padding: "3px" }}
        colSpan="1"
      >
        TOTAL
      </Td>
      <Td style={{ border: ".2px dashed lightGray", padding: "3px" }}>
        <NumericFormat
          displayType="text"
          value={totalAmount.toFixed(2)}
          thousandSeparator={true}
          thousandsGroupStyle="lakh"
        />
      </Td>
    </Tr>
  );
};

const PoTable = ({ data = [], className, currency_type = "INR" }) => {
  const columns = useMemo(
    () => [
      {
        header: <span className={className}>s.no</span>,
        accessorKey: "serial_number",
        cell: (props) => {
          const row = props.row.original;
          const index = props.row.index;
          return (
            <div className={`text-center ${className}`}>{`${index + 1}`}</div>
          );
        },
      },

      {
        header: <span className={className}>Product</span>,
        accessorKey: "Product",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>
              {row?.Product?.name}
            </div>
          );
        },
      },
      {
        header: <span className={className}>Drg/Rev no.</span>,
        accessorKey: "Product",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>
              {row?.Product?.drawing_number}/
              {row?.Product?.Drawings[0]?.revision_number}
            </div>
          );
        },
      },
      {
        header: <span className={className}>PO del. date</span>,
        accessorKey: "accept_delivery_date",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>
              {dayjs(row?.delivery_date).format("DD-MMM-YYYY")}
            </div>
          );
        },
      },
      {
        header: <span className={className}>Remarks</span>,
        accessorKey: "remarks",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>{row?.remarks}</div>
          );
        },
      },
      {
        header: <span className={className}>qty (NO)</span>,
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>{row?.quantity}</div>
          );
        },
      },
      {
        header: <span className={className}>price ({currency_type})</span>,
        accessorKey: "price",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>
              <PriceAmount value={row?.price} />
            </div>
          );
        },
      },
      {
        header: <span className={className}>GST </span>,
        accessorKey: "gst",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>
              <PriceAmount value={row?.gst} />
            </div>
          );
        },
      },
      {
        header: <span className={className}>Total ({currency_type})</span>,
        accessorKey: "amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className={`text-center ${className}`}>
              <PriceAmount value={row?.amount} />
            </div>
          );
        },
      },
    ],
    [currency_type, data]
  );

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <AdaptableCard className={`mb-1 mt-1 ${className} overflow-hidden`}>
        <div className=" bg-lime-50">
          <h6 className="text-center p-1 text-gray-600">
            PURCHASE ORDER CONFIRMED ITEMS
          </h6>
        </div>
        <Table compact={true}>
          <THead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      className={className}
                      style={{
                        border: ".2px dashed lightGray",
                        textAlign: "center",
                        padding: "3px",
                      }}
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
                      <Td
                        className={className}
                        key={cell.id}
                        style={{
                          border: ".2px dashed lightGray",
                          padding: "3px",
                        }}
                      >
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
          <TFoot>
            <TFootRows data={data} />
          </TFoot>
        </Table>
      </AdaptableCard>
    </>
  );
};

export default PoTable;
