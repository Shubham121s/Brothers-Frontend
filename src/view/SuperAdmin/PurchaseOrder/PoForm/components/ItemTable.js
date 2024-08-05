import { memo, useMemo } from "react";
import { Table } from "../../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ index, onRemoveItem, row, onEditItem }) => {
  const { textTheme } = useThemeClass();
  const onDelete = () => {
    onRemoveItem?.(index);
  };

  const onEdit = () => {
    onEditItem?.(row);
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
      <span className="cursor-pointer hover:text-red-500" onClick={onDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const ItemTable = ({ data = [], currency = "", onRemoveItem, onEditItem }) => {
  const columns = useMemo(
    () => [
      {
        header: "Sr no.",
        accessorKey: "",
        cell: (props) => {
          const index = props.row.index;
          return <div>{index + 1}</div>;
        },
      },
      {
        header: "product",
        accessorKey: "Product.name",
      },
      {
        header: "drg rev no.",
        accessorKey: "revision_number",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.Product?.Drawings[0]?.revision_number}</div>;
        },
      },
      {
        header: "remarks",
        accessorKey: "remarks",
      },
      {
        header: "po del date.",
        accessorKey: "delivery_date",
        cell: (props) => {
          const { delivery_date } = props.row.original;
          return <div>{dayjs(delivery_date).format("DD-MMM-YYYY")}</div>;
        },
      },
      {
        header: "po qty",
        accessorKey: "po_quantity",
        cell: (props) => {
          const { quantity } = props.row.original;
          return <div>{quantity}</div>;
        },
      },
      {
        header: `GST Type`,
        accessorKey: "gst_type",
      },
      {
        header: `GST (%)`,
        accessorKey: "gst",
        cell: (props) => {
          const { gst_type, Product, gst } = props.row.original;
          return <div>{(gst_type == "GST" ? gst : "") + "%"}</div>;
        },
      },
      {
        header: `Amount (${currency})`,
        accessorKey: "amount",
        cell: (props) => {
          const { quantity, price, gst_type, gst } = props.row.original;
          let total_amount = 0;

          if (gst_type === "GST" && gst && price && quantity) {
            let gstAmount = 0;
            gstAmount =
              (parseFloat(price) * parseFloat(quantity) * parseFloat(gst)) /
              100;

            const totalWithoutGST = parseFloat(price) * parseFloat(quantity);

            total_amount = (
              parseFloat(gstAmount) + parseFloat(totalWithoutGST)
            ).toFixed(2);
          }
          if (gst_type === "NGST" && price && quantity) {
            const totalWithoutGST = parseFloat(price) * parseFloat(quantity);

            total_amount = parseFloat(totalWithoutGST).toFixed(2);
          }

          return <div>{total_amount}</div>;
        },
      },
      {
        header: ``,
        accessorKey: "action",
        cell: (props) => {
          const { index } = props.row;
          const row = props.row.original;
          return (
            <ActionColumn
              index={index}
              onRemoveItem={onRemoveItem}
              onEditItem={onEditItem}
              row={row}
            />
          );
        },
      },
    ],
    [currency, data, onRemoveItem, onEditItem]
  );

  console.log(data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="relative" compact={true}>
      <THead className="sticky" style={{ top: "-.2px" }}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th
                  style={{
                    textAlign: "center",
                    border: ".2px dashed lightGray",
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
                    key={cell.id}
                    style={{
                      textAlign: "center",
                      border: ".2px dashed lightGray",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
};

export default memo(ItemTable);
