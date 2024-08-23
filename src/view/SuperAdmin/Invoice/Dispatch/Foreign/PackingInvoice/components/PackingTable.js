import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Table } from "../../../../../../../components/ui";
import dayjs from "dayjs";
import { InvoiceWeight } from "../../utils/weight";
import { dispatchList } from "../../utils/dispatchList";
import { InvoiceQuantity } from "../../utils/quantity";
const { Tr, Th, Td, THead, TBody, TFoot } = Table;

const TableFooterRows = ({
  pageNo,
  pageCount,
  pageData = [],
  data,
  className,
}) => {
  const pageWeight = InvoiceWeight(pageData);
  const totalWeight = InvoiceWeight(dispatchList(data?.DispatchLocations));
  const pageQuantity = InvoiceQuantity(pageData);
  const totalQuantity = InvoiceQuantity(dispatchList(data?.DispatchLocations));

  return (
    <>
      <Tr
        style={{
          border: ".2px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="5"
        ></Td>
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="2"
          className={`uppercase ${className}`}
        >
          Total (page {pageNo})
        </Td>
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          {pageQuantity}
        </Td>
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".2px solid black", padding: "3px" }}>
          {pageWeight}
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".2px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="5"
        ></Td>
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="2"
          className={`uppercase ${className}`}
        >
          Total (page 1 to {pageCount})
        </Td>
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          {totalQuantity}
        </Td>
        <Td
          style={{ border: ".2px solid black", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".2px solid black", padding: "3px" }}>
          {totalWeight}
        </Td>
      </Tr>
    </>
  );
};

const findBox = (boxArray = [], searchKey, searchValue) => {
  const foundObject = boxArray.find((obj) => obj[searchKey] === searchValue);
  return foundObject;
};

const PackingTable = (props) => {
  const {
    pageData = [],
    data,
    pageNo = 1,
    pageCount = 1,
    boxes = [],
    className,
  } = props;

  const columns = useMemo(() => {
    return [
      {
        header: <span className={className}>project no</span>,
        accessorKey: "project_number",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="capitalize text-center">
              {`${row?.PoList?.project_no || "-"}`}
            </div>
          );
        },
      },

      {
        header: <span className={className}>po & serial no</span>,
        accessorKey: "serial_number",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">
              {`${row?.Po?.number}-${row?.PoList?.serial_number}`}
            </div>
          );
        },
      },
      {
        header: <span className={className}>delivery date</span>,
        accessorKey: "delivery_date",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="capitalize text-center">
              {dayjs(row?.PoList?.delivery_date).format("DD-MMM-YYYY")}
            </div>
          );
        },
      },
      {
        header: <span className={className}>product name</span>,
        accessorKey: "name",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{row?.item_name || "-"}</div>
          );
        },
      },
      {
        header: <span className={className}>item code</span>,
        accessorKey: "item_code",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{row?.item_code || "-"}</div>
          );
        },
      },
      {
        header: <span className={className}>hsn code</span>,
        accessorKey: "hsn_code",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{row?.hsn_code || "-"}</div>
          );
        },
      },
      {
        header: <span className={className}>Box no</span>,
        accessorKey: "box_no",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="text-center">{`${
              findBox(boxes, "dispatch_box_list_id", row?.dispatch_box_id)
                ?.box_no
            }`}</div>
          );
        },
      },
      {
        header: <span className={className}>Qty (no)</span>,
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return <div className="text-center">{row?.item_quantity}</div>;
        },
      },
      {
        header: <span className={className}>weight (kg)</span>,
        accessorKey: "item_weight",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="text-center">
              {Number(row?.item_weight).toFixed(3)}
            </div>
          );
        },
      },
      {
        header: <span className={className}>total (kg)</span>,
        accessorKey: "net_amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="text-center">
              {(
                Number(row?.item_weight) * parseInt(row?.item_quantity)
              )?.toFixed(3)}
            </div>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, data]);

  const table = useReactTable({
    data: pageData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table compact={true} className="overflow-hidden">
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    className={className}
                    style={{
                      border: ".2px solid black",
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
                        border: ".2px solid black",
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
          <TableFooterRows
            className={className}
            pageNo={pageNo}
            pageData={pageData}
            data={data}
            pageCount={pageCount}
          />
        </TFoot>
      </Table>
    </>
  );
};
export default PackingTable;
