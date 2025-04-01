import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { memo, useMemo } from "react";
import { Table } from "../../../../../../../components/ui";
import dayjs from "dayjs";
import NumberFormat from "../../utils/numberFormat";
import { InvoiceTotal } from "../../utils/amount";
import { InvoiceQuantity } from "../../utils/quantity";
import { dispatchList } from "./../../utils/dispatchList";
import { currencyToWords } from "../../utils/currencyConverter";
const { Tr, Th, Td, THead, TBody, TFoot } = Table;

const TableFooterRows = ({
  pageNo,
  pageCount,
  pageData = [],
  data,
  className,
}) => {
  const pageAmount = data?.reduce(
    (acc, curr) => acc + curr.rate * curr.item_quantity,
    0
  );
  const pageQuantity = InvoiceQuantity(pageData);
  const totalQuantity = data?.reduce(
    (acc, curr) => acc + curr.item_quantity,
    0
  );
  // const totalAmount = InvoiceTotal(dispatchList(data?.DispatchLocations));

  const [{ remark = "" }] = data;
  const cleanRemark = remark?.replace(/<\/?p>/g, "");

  return (
    <>
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
          colSpan="3"
        ></Td>
        <Td
          style={{ border: ".2px dashed lightGray", padding: "3px" }}
          colSpan="2"
          className={`uppercase ${className}`}
        ></Td>
        <Td
          style={{ border: ".2px dashed lightGray", padding: "3px" }}
          colSpan=""
          className={className}
        >
          {totalQuantity}
        </Td>
        <Td
          style={{ border: ".2px dashed lightGray", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".2px dashed lightGray", padding: "3px" }}>
          <NumberFormat value={pageAmount.toFixed(2)} />
        </Td>
      </Tr>
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
          colSpan="2"
          className="uppercase"
        >
          Remark
        </Td>
        <Td
          className="font-semibold uppercase"
          style={{
            border: ".2px dashed lightGray",
            padding: "6px 3px",
            paddingLeft: "10px",
          }}
          colSpan="8"
        >
          {cleanRemark}
        </Td>
      </Tr>
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
          colSpan="2"
          className="uppercase"
        >
          Amount In Words
        </Td>
        <Td
          className="font-semibold uppercase"
          style={{
            border: ".2px dashed lightGray",
            padding: "6px 3px",
            paddingLeft: "10px",
          }}
          colSpan="8"
        >
          {currencyToWords(pageAmount)}
        </Td>
      </Tr>
    </>
  );
};

const findBox = (boxArray = [], searchKey, searchValue) => {
  const foundObject = boxArray.find((obj) => obj[searchKey] === searchValue);
  return foundObject;
};

const DispatchTable = (props) => {
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
      // {
      //   header: <span className={className}>project no</span>,
      //   accessorKey: "project_number",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="capitalize text-center">
      //         {`${row?.PoList?.project_no || "-"}`}
      //       </div>
      //     );
      //   },
      // },

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
      // {
      //   header: <span className={className}>delivery date</span>,
      //   accessorKey: "delivery_date",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="capitalize text-center">
      //         {dayjs(row?.PoList?.delivery_date).format("DD-MMM-YYYY")}
      //       </div>
      //     );
      //   },
      // },
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
        header: <span className={className}>no</span>,
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return <div className="text-center">{row?.no}</div>;
        },
      },
      {
        header: <span className={className}>Qty in sets.</span>,
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return <div className="text-center">{row?.item_quantity}</div>;
        },
      },
      {
        header: <span className={className}>rate in (usd)</span>,
        accessorKey: "rate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="text-center">{Number(row?.rate).toFixed(2)}</div>
          );
        },
      },
      {
        header: <span className={className}>amount in (USD)</span>,
        accessorKey: "net_amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="text-center">
              {(Number(row?.rate) * parseInt(row?.item_quantity)).toFixed(2)}
            </div>
          );
        },
      },
      //   {
      //     header: <span className={className}>Box no</span>,
      //     accessorKey: "DispatchBox.box_no",
      //     cell: (props) => {
      //       const row = props.row.original;
      //       return (
      //         <div className="text-center">{`BOX NO ${
      //           findBox(boxes, "dispatch_box_list_id", row?.dispatch_box_id)
      //             ?.box_no
      //         }`}</div>
      //       );
      //     },
      //   },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, data]);

  const table = useReactTable({
    data: data || [],
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
              <Tr key={row.id} className="p-0">
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
export default memo(DispatchTable);
