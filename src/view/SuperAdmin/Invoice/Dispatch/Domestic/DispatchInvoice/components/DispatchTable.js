import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { memo, useMemo } from "react";
import { Table } from "../../../../../../../components/ui";
import dayjs from "dayjs";
import { InvoiceQuantity } from "../../utils/quantity";
import { dispatchList } from "../../utils/dispatchList";
import { InvoiceTotal } from "../../utils/amount";
import NumberFormat from "../../utils/numberFormat";
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
    c_gst = 0,
    s_gst = 0,
    packing_charges = 0,
    remark = "",
    fright_charges = 0,
    other_charges = 0,
  } = data?.DispatchShippingAndOtherDetail;
  const GST_RATE =
    bill_type === "NON GST" ? 0 : bill_type === "IGST" ? i_gst : c_gst + s_gst;
  const pageQuantity = InvoiceQuantity(pageData);
  const totalQuantity = InvoiceQuantity(dispatchList(data?.DispatchLocations));
  const totalAmount = InvoiceTotal(dispatchList(data?.DispatchLocations));
  const pageAmount = InvoiceTotal(pageData);
  const packingAmount = parseFloat(packing_charges ? packing_charges : 0);
  const packingTotalAmount = packingAmount + packingAmount * (GST_RATE / 100);
  const fightAmount = parseFloat(fright_charges ? fright_charges : 0);
  const GSTAmount = parseFloat(
    (totalAmount + packingAmount) * (GST_RATE / 100)
  ).toFixed(2);
  const GrandTotal = Math.round(
    Number(totalAmount) +
      Number(packingAmount) +
      Number(GSTAmount) +
      fightAmount
  );
  const RoundOff =
    Number(totalAmount) +
    Number(packingAmount) +
    Number(GSTAmount) +
    fightAmount -
    GrandTotal;

  return (
    <>
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="3"
        ></Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="2"
          className={`uppercase ${className}`}
        >
          TOTAL(page {pageNo})
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          {pageQuantity}
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".5px solid black", padding: "3px" }}>
          <NumberFormat value={pageAmount} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="2"
        ></Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="3"
          className={`uppercase ${className}`}
        >
          Total (page 1 to {pageCount})
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          {totalQuantity}
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td
          style={{
            border: ".5px solid black",
            padding: "3px",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <NumberFormat value={totalAmount} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="5"
        ></Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
          className={`uppercase ${className}`}
        >
          P & F Charges
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
          className={`uppercase ${className}`}
        >
          {GST_RATE}%
        </Td>

        <Td style={{ border: ".5px solid black", padding: "3px" }}>
          <NumberFormat value={packingTotalAmount.toFixed(2)} />
        </Td>
      </Tr>
      {bill_type === "IGST" ? (
        <Tr
          style={{
            border: ".5px solid black",
            padding: "3px",
            textAlign: "center",
          }}
          className={className}
        >
          <Td
            style={{ border: ".5px solid black", padding: "3px" }}
            colSpan="5"
          ></Td>
          <Td
            style={{ border: ".5px solid black", padding: "3px" }}
            colSpan="1"
            className={className}
          >
            IGST
          </Td>
          <Td
            style={{ border: ".5px solid black", padding: "3px" }}
            colSpan="1"
          >
            {GST_RATE}%
          </Td>
          <Td style={{ border: ".5px solid black", padding: "3px" }}>
            <NumberFormat value={GSTAmount} />
          </Td>
        </Tr>
      ) : bill_type === "GST" ? (
        <>
          <Tr
            style={{
              border: ".5px solid black",
              padding: "3px",
              textAlign: "center",
            }}
            className={className}
          >
            <Td
              style={{ border: ".5px solid black", padding: "3px" }}
              colSpan="5"
            ></Td>
            <Td
              style={{ border: ".5px solid black", padding: "3px" }}
              colSpan="1"
              className={className}
            >
              CGST
            </Td>
            <Td
              style={{ border: ".5px solid black", padding: "3px" }}
              colSpan="1"
            >
              {c_gst}%
            </Td>
            <Td style={{ border: ".5px solid black", padding: "3px" }}>
              <NumberFormat value={Number(GSTAmount / 2).toFixed(2)} />
            </Td>
          </Tr>
          <Tr
            style={{
              border: ".5px solid black",
              padding: "3px",
              textAlign: "center",
            }}
            className={className}
          >
            <Td
              style={{ border: ".5px solid black", padding: "3px" }}
              colSpan="5"
            ></Td>
            <Td
              style={{ border: ".5px solid black", padding: "3px" }}
              colSpan="1"
              className={className}
            >
              SGST
            </Td>
            <Td
              style={{ border: ".5px solid black", padding: "3px" }}
              colSpan="1"
            >
              {s_gst}%
            </Td>
            <Td style={{ border: ".5px solid black", padding: "3px" }}>
              <NumberFormat value={Number(GSTAmount / 2).toFixed(2)} />
            </Td>
          </Tr>
        </>
      ) : null}
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="5"
        ></Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          FREIGHT CHARGES
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".5px solid black", padding: "3px" }}>
          <NumberFormat value={fightAmount.toFixed(2)} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="5"
        ></Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
          className={className}
        >
          ROUND OFF
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="1"
        ></Td>
        <Td style={{ border: ".5px solid black", padding: "3px" }}>
          <NumberFormat value={parseFloat(RoundOff).toFixed(2)} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
          textAlign: "center",
        }}
        className={className}
      >
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="5"
          className="text-gray-700 font-semibold uppercase"
        ></Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          colSpan="2"
          className="text-gray-700 font-semibold"
        >
          GRAND TOTAL
        </Td>
        <Td
          style={{ border: ".5px solid black", padding: "3px" }}
          className="text-gray-700 font-semibold"
        >
          <NumberFormat value={GrandTotal} />
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
        }}
        className={className}
      >
        <Td
          style={{
            border: ".5px solid black",
            padding: "3px",
            textAlign: "center",
          }}
          colSpan="2"
          className="uppercase"
        >
          Remark
        </Td>
        <Td
          className="font-semibold uppercase"
          style={{
            border: ".5px solid black",
            padding: "6px 3px",
            paddingLeft: "10px",
          }}
          colSpan="7"
        >
          {remark}
        </Td>
      </Tr>
      <Tr
        style={{
          border: ".5px solid black",
          padding: "3px",
        }}
        className={className}
      >
        <Td
          style={{
            border: ".5px solid black",
            padding: "3px",
            textAlign: "center",
          }}
          colSpan="2"
          className="uppercase"
        >
          Amount In Words
        </Td>
        <Td
          className="font-semibold uppercase"
          style={{
            border: ".5px solid black",
            padding: "6px 3px",
            paddingLeft: "10px",
          }}
          colSpan="7"
        >
          {currencyToWords(GrandTotal)}
        </Td>
      </Tr>
    </>
  );
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
      {
        header: <span className={className}>po & serial no</span>,
        accessorKey: "po_serial_number",
        cell: (props) => {
          const row = props.row.original;
          return (
            <p className="uppercase text-center">
              {`${row?.Po?.number}-${row?.PoList?.serial_number}`}
            </p>
          );
        },
      },
      {
        header: <span className={className}>HSN Code</span>,
        accessorKey: "hsn_code",
        size: 100,
        cell: (props) => {
          const row = props.row.original;
          return (
            <p className="capitalize text-center">
              {`${row?.hsn_code || "-"}`}
            </p>
          );
        },
      },
      {
        header: <span className={className}>delivery</span>,
        accessorKey: "po_delivery_date",
        size: 80,
        cell: (props) => {
          const row = props.row.original;
          return (
            <p className="capitalize text-center">
              {dayjs(row?.PoList?.delivery_date).format("DD-MMM-YYYY")}
            </p>
          );
        },
      },
      {
        header: <span className={className}>product name</span>,
        accessorKey: "product_name",
        size: 220,
        cell: (props) => {
          const row = props.row.original;
          return (
            <div>
              <p className="uppercase">{row?.item_name}</p>
              <div className="">
                <div
                  dangerouslySetInnerHTML={{ __html: row?.remarks || "" }}
                ></div>
              </div>
            </div>
          );
        },
      },
      {
        header: <span className={className}>item code</span>,
        accessorKey: "item_code",
        size: 110,
        cell: (props) => {
          const row = props.row.original;
          return <p className="uppercase text-center">{row?.item_code}</p>;
        },
      },
      {
        header: <span className={className}>Qty (no)</span>,
        accessorKey: "quantity",
        size: 100,
        cell: (props) => {
          const row = props.row.original;
          return <p className="text-center">{row?.item_quantity}</p>;
        },
      },
      {
        header: <span className={className}>rate</span>,
        accessorKey: "rate",
        size: 80,
        cell: (props) => {
          const row = props.row.original;
          return (
            <p className="text-center">
              {Number(row?.PoList?.unit_price).toFixed(2)}
            </p>
          );
        },
      },
      {
        header: <span className={className}>total</span>,
        accessorKey: "net_amount",
        size: 80,
        cell: (props) => {
          const row = props.row.original;
          return (
            <p className="text-center">
              {Number(row?.PoList?.unit_price * row.item_quantity).toFixed(2)}
            </p>
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
                const columnSize = header.column.columnDef.size || "auto";
                return (
                  <Th
                    className={className}
                    style={{
                      border: ".5px solid black",
                      textAlign: "center",
                      alignItems: "middle",
                      verticalAlign: "middle",
                      width: columnSize,
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
                        border: ".5px solid black",
                        textAlign: "center",
                        alignItems: "middle",
                        // padding: "6px 4px",
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
