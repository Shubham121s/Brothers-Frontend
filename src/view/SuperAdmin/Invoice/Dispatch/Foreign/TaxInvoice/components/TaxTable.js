import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { Table } from "../../../../../../../components/ui";
import dayjs from "dayjs";
import NumberFormat from "../../utils/numberFormat";
import { InvoiceQuantity } from "../../utils/quantity";
import { dispatchList } from "../../utils/dispatchList";
import { InvoiceTotal } from "../../utils/amount";
import { currencyToWords } from "../../utils/currencyConverter";
const { Tr, Th, Td, THead, TBody, TFoot } = Table;

const TableFooterRows = ({
  pageNo,
  pageCount,
  pageData = [],
  data,
  className,
}) => {
  const {
    bill_type,
    i_gst = 0,
    convert_rate,
  } = data?.DispatchShippingAndOtherDetail;
  const GST_RATE = bill_type === "NON GST" ? 0 : i_gst;
  const pageQuantity = InvoiceQuantity(pageData);
  const totalQuantity = InvoiceQuantity(dispatchList(data?.DispatchLocations));
  const totalAmount = InvoiceTotal(
    dispatchList(data?.DispatchLocations),
    convert_rate
  );
  const pageAmount = InvoiceTotal(pageData, convert_rate);
  const GSTAmount = Number(totalAmount * (GST_RATE / 100)).toFixed(2);
  const GrandTotal = Number(totalAmount) + Number(GSTAmount);
  return (
    <>
      <Tr
        style={{
          border: ".5px dashed lightGray",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="2"
        >
          1 USD = {Number(convert_rate).toFixed(2)} INR
        </Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="3"
        ></Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="2"
          className={`uppercase ${className}`}
        >
          TOTAL(page {pageNo})
        </Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          {pageQuantity}
        </Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".5px dashed lightGray", padding: "3px" }}>
          <NumberFormat value={pageAmount} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px dashed lightGray",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="4"
        ></Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="3"
          className={`uppercase ${className}`}
        >
          Total (page 1 to {pageCount})
        </Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          {totalQuantity}
        </Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".5px dashed lightGray", padding: "3px" }}>
          <NumberFormat value={totalAmount} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px dashed lightGray",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="7"
        ></Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          IGST
        </Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="1"
        >
          {GST_RATE}%
        </Td>
        <Td style={{ border: ".5px dashed lightGray", padding: "3px" }}>
          <NumberFormat value={GSTAmount} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px dashed lightGray",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="7"
          className="text-gray-700 font-semibold uppercase"
        ></Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="2"
          className="text-gray-700 font-semibold"
        >
          GRAND TOTAL
        </Td>
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          className="text-gray-700 font-semibold"
        >
          <NumberFormat value={GrandTotal} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px dashed lightGray",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px dashed lightGray", padding: "3px" }}
          colSpan="2"
          className="uppercase"
        >
          Amount In Words
        </Td>
        <Td
          className="font-semibold uppercase"
          style={{
            border: ".5px dashed lightGray",
            padding: "6px 3px",
            paddingLeft: "10px",
          }}
          colSpan="8"
        >
          {currencyToWords(GrandTotal)}
        </Td>
      </Tr>
    </>
  );
};

const findBox = (boxArray = [], searchKey, searchValue) => {
  const foundObject = boxArray.find((obj) => obj[searchKey] === searchValue);
  return foundObject;
};

const TaxTable = (props) => {
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
            <div className="text-center">{`BOX NO ${
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
        header: <span className={className}>rate (INR)</span>,
        accessorKey: "rate",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="text-center">
              {(
                Number(row?.PoList?.unit_price) *
                Number(data?.DispatchShippingAndOtherDetail?.convert_rate)
              ).toFixed(2)}
            </div>
          );
        },
      },
      {
        header: <span className={className}>total (INR)</span>,
        accessorKey: "net_amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="text-center">
              {(
                (
                  Number(row?.PoList?.unit_price) *
                  Number(data?.DispatchShippingAndOtherDetail?.convert_rate)
                )?.toFixed(2) * parseInt(row?.item_quantity)
              ).toFixed(2)}
            </div>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const table = useReactTable({
    data: pageData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table compact={true}>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    className={className}
                    style={{
                      border: ".5px dashed lightGray",
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
                        border: ".5px dashed lightGray",
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
export default TaxTable;
