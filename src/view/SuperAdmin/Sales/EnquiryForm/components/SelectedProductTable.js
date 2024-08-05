import { memo, useMemo } from "react";
import { Table } from "../../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { HiOutlineTrash } from "react-icons/hi";
import { deleteSelectedPoItem } from "../store/StateSlice";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ index }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteSelectedPoItem(index));
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <span className="cursor-pointer hover:text-red-500" onClick={onDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const SelectedProductTable = ({ data = [], currency = "" }) => {
  const columns = useMemo(
    () => [
      {
        header: "product",
        accessorKey: "Product.name",
      },
      {
        header: "drg rev no.",
        accessorKey: "revision_number",
      },
      //   {
      //     header: "remarks",
      //     accessorKey: "description",
      //   },
      {
        header: "Expected del date.",
        accessorKey: "expected_delivery_date",
        cell: (props) => {
          const { expected_delivery_date } = props.row.original;
          return (
            <div>{dayjs(expected_delivery_date).format("DD-MMM-YYYY")}</div>
          );
        },
      },
      {
        header: "qty",
        accessorKey: "",
        cell: (props) => {
          const { quantity } = props.row.original;
          return <div>{quantity}</div>;
        },
      },
      {
        header: ``,
        accessorKey: "action",
        cell: (props) => {
          const { Product } = props.row.original;
          return <ActionColumn index={Product?.product_id} />;
        },
      },
    ],
    [currency, data]
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

export default memo(SelectedProductTable);
