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

const ItemTable = ({ initialData = [], dispatchList, setFieldValue }) => {
  const currency = initialData[0].Po.currency_type;
  console.log("currency", currency);
  const columns = useMemo(() => {
    return [
      {
        header: "PO Sr No.",
        accessorKey: "PoList",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{`${
              row?.Po?.number + "-" + row?.PoList?.serial_number
            }`}</div>
          );
        },
      },
      {
        header: "Description of goods",
        accessorKey: "name",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">
              <strong>Product : </strong>
              {row?.item_name}
              <br /> <strong>Item Code : </strong>
              {row?.item_code}
              <br />
              <strong>HSN Code :</strong> {row?.hsn_code}
            </div>
          );
        },
      },
      {
        header: "No ",
        accessorKey: "no",
        cell: (props) => {
          const row = props.row.original;
          return <div className="uppercase text-center">{`${row?.no}`}</div>;
        },
      },
      {
        header: "qty in sets.",
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{`${row?.item_quantity}`}</div>
          );
        },
      },
      {
        header: `Rate in ${currency}`,
        accessorKey: "rate",
        cell: (props) => {
          const row = props.row.original;
          return <div className="uppercase text-center">{`${row?.rate}`}</div>;
        },
      },
      {
        header: `amount in ${currency}`,
        accessorKey: "amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">
              {Number(row?.item_quantity * row?.rate).toFixed(2)}
            </div>
          );
        },
      },

      {
        header: "-",
        accessorKey: "action",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} initialData={initialData} />;
        },
      },
    ];
  }, [initialData, dispatchList]);

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
