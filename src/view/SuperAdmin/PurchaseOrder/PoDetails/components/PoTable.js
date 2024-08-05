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
// import EditItemDialog from "./EditItemDialog";
import { setSelectedPoItem, toggleEditPoItemDialog } from "../store/stateSlice";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(toggleEditPoItemDialog(true));
    dispatch(setSelectedPoItem(row));
  };
  const onView = () => {
    dispatch(toggleEditPoItemDialog(true));
    dispatch(setSelectedPoItem(row));
  };

  return row?.list_status === "accepted" ||
    row?.list_status === "rejected" ||
    row?.list_status === "received" ? (
    <span
      className={`cursor-pointer hover:${textTheme} text-lg`}
      onClick={onView}
    >
      <HiOutlineEye />
    </span>
  ) : (
    <span
      className={`cursor-pointer text-lg hover:${textTheme}`}
      onClick={onEdit}
    >
      <HiOutlinePencil />
    </span>
  );
};

const PoTable = ({
  data = [],
  currency = "INR",
  purchase_order_id,
  category,
}) => {
  console.log(data);
  const columns = useMemo(() => {
    const baseColumns = [
      {
        header: "sr no.",
        accessorKey: "",
        cell: (props) => {
          const index = props.row.index;
          return <div className="uppercase">{index + 1}</div>;
        },
      },
      {
        header: "product",
        accessorKey: "",
        cell: (props) => {
          const { name } = props.row.original.Product;
          return <div className="uppercase">{name}</div>;
        },
      },
      {
        header: "drg rev no.",
        accessorKey: "",
        cell: (props) => {
          const { Product } = props.row.original;
          return <div>{Product?.Drawings[0]?.revision_number}</div>;
        },
      },
      {
        header: "remarks",
        accessorKey: "remarks",
        cell: (props) => {
          const { remarks } = props.row.original;
          return <div>{remarks}</div>;
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
        header: `cost (${currency})`,
        accessorKey: "",
        cell: (props) => {
          const { price } = props.row.original;
          return <div>{price.toFixed(2)}</div>;
        },
      },
      {
        header: `gst type`,
        accessorKey: "gst_type",
        cell: (props) => {
          const { gst_type } = props.row.original;
          return <div>{gst_type}</div>;
        },
      },
      {
        header: `gst (%)`,
        accessorKey: "gst",
        cell: (props) => {
          const { gst } = props.row.original;
          return <div>{gst}</div>;
        },
      },
      {
        header: `Amount (${currency})`,
        accessorKey: "amount",
        cell: (props) => {
          const { amount } = props.row.original;
          return <div>{amount.toFixed(2)}</div>;
        },
      },
      {
        header: "received qty",
        accessorKey: "",
        cell: (props) => {
          const { received_quantity } = props.row.original;
          return <div>{received_quantity}</div>;
        },
      },
    ];

    return baseColumns;
  }, [currency, data]);

  const selectedPoItem = useSelector(
    (state) => state.accept_po.state.selectedPoItem
  );

  const table = useReactTable({
    data,
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
                    : list_status === "accepted" || list_status === "received"
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
      {/* <EditItemDialog
        initialData={selectedPoItem}
        currency={currency}
        purchase_order_id={purchase_order_id}
      /> */}
    </>
  );
};

export default memo(PoTable);
