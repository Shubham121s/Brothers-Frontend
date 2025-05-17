import { memo, useMemo, useState } from "react";
import { Table } from "../../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import EditItemDialog from "./EditItemDialog";
import {
  setSelectedPoItem,
  toggleEditPoItemDialog,
  toggleViewPoItemDialog,
} from "../store/stateSlice";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(toggleEditPoItemDialog(true));
    dispatch(setSelectedPoItem(row));
  };
  const onView = () => {
    dispatch(toggleViewPoItemDialog(true));
    dispatch(setSelectedPoItem(row));
  };

  return (
    <div className="flex jsutify-end gap-4">
      {row?.list_status === "accepted" && (
        <span
          className={`cursor-pointer hover:${textTheme} text-lg`}
          onClick={onView}
        >
          <HiOutlineEye />
        </span>
      )}
      <span
        className={`cursor-pointer text-lg hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
    </div>
  );
};

const PoTable = ({ data = [], currency = "INR", po_id }) => {
  const PoLists = Array.isArray(data?.PoLists) ? data.PoLists : [];
  console.log("data", data);
  const columns = useMemo(
    () => [
      {
        header: "po sr no.",
        accessorKey: "serial_number",
      },
      {
        header: "product",
        accessorKey: "Product.item_name",
        cell: (props) => {
          const { name } = props.row.original.Product;
          return <div className="uppercase">{name}</div>;
        },
      },
      {
        header: "drg rev no.",
        accessorKey: "Drawing.revision_number",
        cell: (props) => {
          const {
            Drawing: { revision_number },
            Product: { drawing_number },
          } = props.row.original;
          return (
            <div className="uppercase">{`${drawing_number}-${revision_number}`}</div>
          );
        },
      },
      {
        header: "remarks",
        accessorKey: "description",
        cell: (props) => {
          const { description } = props.row.original;
          return <div className="uppercase">{description}</div>;
        },
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
        accessorKey: "quantity",
        cell: (props) => {
          const { quantity } = props.row.original;
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
        header: `br dry date`,
        accessorKey: "accept_delivery_date",
        cell: (props) => {
          const { accept_delivery_date } = props.row.original;
          return (
            <div>
              {accept_delivery_date
                ? dayjs(accept_delivery_date)?.format("DD-MMM-YYYY")
                : "-"}
            </div>
          );
        },
      },
      {
        header: ``,
        accessorKey: "action",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} />;
        },
      },
    ],
    [currency, data]
  );

  const selectedPoItem = useSelector(
    (state) => state.accept_po.state.selectedPoItem
  );

  const table = useReactTable({
    data: PoLists,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
            const { list_status } = row.original;
            return (
              <Tr
                key={row.id}
                className={`${
                  list_status === "rejected"
                    ? "bg-red-400 text-white"
                    : list_status === "accepted"
                    ? "bg-emerald-400 text-white"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      style={{
                        textAlign: "center",
                        border: ".2px dashed lightGray",
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
      </Table>
      <EditItemDialog
        initialData={selectedPoItem}
        data={data}
        currency={currency}
        po_id={po_id}
      />
    </>
  );
};

export default memo(PoTable);
