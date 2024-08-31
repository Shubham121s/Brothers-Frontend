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
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import useThemeClass from "./../../../../../../../utils/hooks/useThemeClass";
import { useDispatch } from "react-redux";
import {
  setSelectedDispatchItem,
  toggleEditDispatchItemDialog,
  togglDeleteConfirmationDialog,
} from "../../store/stateSlice";
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

const ActionColumn = ({ row, initialData }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const onEdit = () => {
    dispatch(toggleEditDispatchItemDialog(true));
    dispatch(setSelectedDispatchItem(row));
  };

  const onDelete = () => {
    dispatch(togglDeleteConfirmationDialog(true));
    dispatch(setSelectedDispatchItem(row));
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
      {initialData.length > 1 && (
        <span
          className={`cursor-pointer hover:${textTheme}`}
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </span>
      )}
    </div>
  );
};

const findBox = (boxArray = [], searchKey, searchValue) => {
  const foundObject = boxArray.find((obj) => obj[searchKey] === searchValue);
  return foundObject;
};

const ItemTable = ({ initialData = [], dispatchList, boxes }) => {
  console.log(boxes);
  const columns = useMemo(() => {
    return [
      {
        header: "POs details & Delivery Date",
        columns: [
          {
            header: "project no",
            accessorKey: "project_no",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {`${row?.PoList?.project_no || "-"}`}
                </div>
              );
            },
          },

          {
            header: "po no & sr no",
            accessorKey: "PoList",
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
                <div className="uppercase text-center">{row?.item_name}</div>
              );
            },
          },
          {
            header: "item code",
            accessorKey: "item_code",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">{row?.item_code}</div>
              );
            },
          },
          {
            header: "hsn code",
            accessorKey: "hsn_code",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">{row?.hsn_code}</div>
              );
            },
          },
        ],
      },
      {
        header: "qty (No) & amount (USD)",
        columns: [
          {
            header: "qty",
            accessorKey: "PoList.quantity",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {row?.item_quantity}
                </div>
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
              return (
                <div className="uppercase text-center">
                  {Number(row?.PoList?.unit_price * row?.item_quantity).toFixed(
                    2
                  )}
                </div>
              );
            },
          },
        ],
      },
      {
        header: "Box & Weight (Kg)",
        columns: [
          {
            header: "Box",
            accessorKey: "DispatchBox.box_no",
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
            header: "weight",
            accessorKey: "weight",
            cell: (props) => {
              const row = props.row.original;
              console.log(row.item_weight);
              return (
                <div className="uppercase text-center">
                  {Number(row?.item_weight).toFixed(3)}
                </div>
              );
            },
          },
          {
            header: "total",
            accessorKey: "total_weight",
            cell: (props) => {
              const row = props.row.original;
              return (
                <div className="uppercase text-center">
                  {Number(row?.item_weight * row?.item_quantity).toFixed(3)}
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
              const row = props.row.original;
              return <ActionColumn row={row} initialData={initialData} />;
            },
          },
        ],
      },
    ];
  }, [initialData, dispatchList]);

  console.log(initialData);

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
