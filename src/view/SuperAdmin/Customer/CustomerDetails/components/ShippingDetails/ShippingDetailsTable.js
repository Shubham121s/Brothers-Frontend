import React, { useCallback } from "react";
import { Button, Card, Table } from "../../../../../../components/ui";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import useThemeClass from "../../../../../../utils/hooks/useThemeClass";
import { useDispatch } from "react-redux";
import {
  setSelectedShippingDetails,
  toggleDeleteShippingDetailsDialog,
  toggleEditShippingDetailsDialog,
  toggleNewShippingDetailsDialog,
} from "../../store/stateSlice";
import ShippingDetailsDeleteDialog from "./ShippingDetailsDeleteDialog";
import EditShippingDetailsDialog from "./EditShippingDetailsDialog";
const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = useCallback(() => {
    dispatch(setSelectedShippingDetails(row));
    dispatch(toggleEditShippingDetailsDialog(true));
  }, [row]);
  const onDelete = useCallback(() => {
    dispatch(setSelectedShippingDetails(row));
    dispatch(toggleDeleteShippingDetailsDialog(true));
  }, [row]);

  return (
    <div className="flex justify-end text-lg gap-x-4">
      <span className={`cursor-pointer hover:text-red-400`} onClick={onDelete}>
        <HiOutlineTrash />
      </span>
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
    </div>
  );
};

const columns = [
  {
    header: "pre carriage by",
    accessorKey: "pre_carriage_by",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.pre_carriage_by || "-"}</span>;
    },
  },

  {
    header: "place of receipt",
    accessorKey: "place_of_receipt",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.place_of_receipt || "-"}</span>;
    },
  },
  {
    header: "port of discharge",
    accessorKey: "port_of_discharge",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.port_of_discharge || "-"}</span>;
    },
  },
  {
    header: "country of origin of goods",
    accessorKey: "country_of_goods",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.country_of_goods || "-"}</span>;
    },
  },
  {
    header: "country of final destination",
    accessorKey: "destination",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.destination || "-"}</span>;
    },
  },
  {
    header: "port of loading",
    accessorKey: "port_of_loading",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.port_of_loading || "-"}</span>;
    },
  },
  {
    header: "final destination",
    accessorKey: "final_destination",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{row?.final_destination || "-"}</span>;
    },
  },
  {
    header: "",
    accessorKey: "shipping_id",
    cell: (props) => {
      const row = props.row.original;
      return <ActionColumn row={row} />;
    },
  },
];

const ShippingDetailsTable = ({ className, data = [] }) => {
  const dispatch = useDispatch();

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      {/* <div className='flex justify-between items-center mb-5'>
                <h4>Shipping Details</h4>
                <Button onClick={onAddShipping} size='sm' variant='solid'>New Shipping</Button>
            </div> */}
      <Table compact={true}>
        <THead>
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
      <ShippingDetailsDeleteDialog />
      <EditShippingDetailsDialog />
    </>
  );
};

export default ShippingDetailsTable;
