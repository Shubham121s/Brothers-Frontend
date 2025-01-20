import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { memo, useMemo } from "react";
import { Table } from "../../../../../../../components/ui";
import dayjs from "dayjs";
import NumberFormat from "../../../utils/numberFormat";
import { InvoiceQuantity } from "../../../utils/quantity";
import { InvoiceWeight } from "../../../utils/weight";
import { InvoiceTotal } from "../../../utils/amount";
import { HiOutlineTrash } from "react-icons/hi";
const { Tr, Th, Td, THead, TBody, TFoot } = Table;

const TableFooterRows = ({ pageNo, singlePageData = [] }) => {
  return (
    <>
      <Tr style={{ border: ".5px solid #e0e0e0", textAlign: "center" }}>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="3"></Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="3">
          <div className="text-gray-500">Total (page {pageNo + 1})</div>
        </Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1">
          <div className="text-gray-700 text-center">
            {InvoiceQuantity(singlePageData)}
          </div>
        </Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1"></Td>
        <Td style={{ border: ".5px solid #e0e0e0" }}>
          <NumberFormat value={InvoiceTotal(singlePageData)} />
        </Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1"></Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1">
          <NumberFormat value={InvoiceWeight(singlePageData)} />
        </Td>
      </Tr>
    </>
  );
};

const ActionColumn = (props) => {
  const {
    dispatchList,
    handleDeleteItemInPoList,
    setFieldValue,
    locationIndex,
    index,
  } = props;
  const onDelete = () => {
    handleDeleteItemInPoList?.(
      dispatchList,
      locationIndex,
      setFieldValue,
      index
    );
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <span className="cursor-pointer hover:text-red-500" onClick={onDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const ItemTable = ({
  initialData = [],
  locationIndex,
  dispatchList,
  handleDeleteItemInPoList,
  setFieldValue,
}) => {
  const columns = useMemo(() => {
    return [
      {
        header: "POs details & Delivery Date",
        columns: [
          {
            header: "po no & sr no",
            accessorKey: "PoList",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {`${row?.Po.number}-${row?.PoList?.serial_number}`}
                </div>
              );
            },
          },
          {
            header: "Delivery Date",
            accessorKey: "delivery_date",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {dayjs(row?.PoList?.delivery_date).format("DD-MM-YYYY")}
                </div>
              );
            },
          },
        ],
      },
      {
        header: "Description of goods",
        columns: [
          {
            header: "product name",
            accessorKey: "name",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {row?.PoList?.Product?.name}
                  <div className="flex justify-center">
                    <div
                      dangerouslySetInnerHTML={{ __html: row?.remarks || "" }}
                    ></div>
                  </div>
                </div>
              );
            },
          },
          {
            header: "item code",
            accessorKey: "item_code",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {row?.PoList?.Product?.item_code}
                </div>
              );
            },
          },
          {
            header: "hsn code",
            accessorKey: "hsn_code",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {row?.PoList?.Product?.hsn_code}
                </div>
              );
            },
          },
          {
            header: "GST(%)",
            accessorKey: "gst_percentage",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {row?.PoList?.Product?.gst_percentage || 0}
                </div>
              );
            },
          },
        ],
      },
      {
        header: "qty (No) & amount (INR)",
        columns: [
          {
            header: "qty",
            accessorKey: "PoList.quantity",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">{row?.quantity}</div>
              );
            },
          },
          {
            header: "rate",
            accessorKey: "unit_price",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {Number(row?.PoList?.unit_price).toFixed(2)}
                </div>
              );
            },
          },
          {
            header: "total",
            accessorKey: "net_amount",
            cell: (props) => {
              const row = props.row.original;
              const rowCharges = row?.rowCharges || 0;
              const machineCharges = row?.machineCharges || 0;
              const total =
                row?.PoList?.unit_price * row?.quantity +
                rowCharges +
                machineCharges;
              return (
                <div className="uppercase text-center">
                  {Number(total).toFixed(2)}
                </div>
              );
            },
          },
        ],
      },
      {
        header: "-",
        columns: [
          {
            header: "",
            accessorKey: "action",
            cell: (props) => {
              const { index } = props.row;
              return (
                <ActionColumn
                  index={index}
                  locationIndex={locationIndex}
                  setFieldValue={setFieldValue}
                  dispatchList={dispatchList}
                  handleDeleteItemInPoList={handleDeleteItemInPoList}
                />
              );
            },
          },
        ],
      },
    ];
  }, [initialData, setFieldValue, handleDeleteItemInPoList, dispatchList]);

  const table = useReactTable({
    data: initialData,
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
                    style={{
                      border: ".5px solid #e0e0e0",
                      textAlign: "center",
                    }}
                    className="select-none"
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
                      key={cell.id}
                      style={{ border: ".5px solid #e0e0e0" }}
                      className="select-none"
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
        {/* <TFoot>
                    <TableFooterRows
                        pageNo={index}
                        singlePageData={PoList[index]?.pageList}
                    />
                </TFoot> */}
      </Table>
    </>
  );
};
export default memo(ItemTable);
