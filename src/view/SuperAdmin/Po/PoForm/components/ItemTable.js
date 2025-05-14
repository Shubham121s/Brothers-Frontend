import { memo, useMemo } from "react";
import { Table } from "../../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ index, onRemoveItem, row, onEditItem }) => {
  const { textTheme } = useThemeClass();
  const onDelete = () => {
    onRemoveItem?.(index);
  };

  const onEdit = () => {
    onEditItem?.(row, index);
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <>
        <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
          <HiOutlinePencil />
        </span>
        <span className="cursor-pointer hover:text-red-500" onClick={onDelete}>
          <HiOutlineTrash />
        </span>
      </>
    </div>
  );
};

const ItemTable = ({
  data = [],
  currency = "",
  onRemoveItem,
  onEditItem,
  type,
}) => {
  console.log(data);
  const columns = useMemo(
    () => [
      {
        header: "po sr no.",
        accessorKey: "serial_number",
      },
      {
        header: "project no.",
        accessorKey: "project_no",
      },
      {
        header: "product",
        accessorKey: "Product.name",
      },
      {
        header: "drg rev no.",
        accessorKey: "revision_number",
      },
      {
        header: "remarks",
        accessorKey: "description",
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
        header: "pending qty",
        accessorKey: "pending_quantity",
        cell: (props) => {
          console.log("type", type);
          const { quantity, pending_quantity } = props.row.original;
          if (type === "edit") {
            return <div>{pending_quantity}</div>;
          }

          return <div>{quantity}</div>;
        },
      },
      {
        header: `rate (${currency})`,
        accessorKey: "unit_price",
        cell: (props) => {
          const { unit_price } = props.row.original;
          return <div>{unit_price}</div>;
        },
      },
      {
        header: `Amount (${currency})`,
        accessorKey: "amount",
        cell: (props) => {
          const { quantity, unit_price } = props.row.original;
          return <div>{(quantity * unit_price).toFixed(2)}</div>;
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
    [currency, data, onRemoveItem]
  );

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
