import { memo, useMemo, useState, useRef } from "react";
import { Button, Table } from "../../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import {
  setSelectedGRNDate,
  setSelectedPoItem,
  toggleEditPoItemDialog,
} from "../store/stateSlice";
import GRNInvoice from "./GRNInvoice";
import { useReactToPrint } from "react-to-print";
import { getGRNDetails } from "../store/dataSlice";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row, initialData }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const componentRef = useRef(null);

  const onhandlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: () =>
      dispatch(
        getGRNDetails({
          date: row.date,
          purchase_order_id: initialData.purchase_order_id,
        })
      ),
  });

  return (
    <>
      <Button
        className=""
        variant="solid"
        color="pink-500"
        size="sm"
        onClick={onhandlePrint}
      >
        Print
      </Button>
      <div style={{ display: "none" }}>
        {/* Add ref to the component */}
        <div ref={componentRef}>
          {/* Add the component for printing */}
          <GRNInvoice initialData={initialData} />
        </div>
      </div>
    </>
  );
};

const GRNTable = ({ initialData }) => {
  const data = useSelector((state) => state.accept_po.data.grn);

  const columns = useMemo(
    () => [
      {
        header: "date",
        accessorKey: "date",
        cell: (props) => {
          const { date } = props.row.original;
          return <div className="uppercase">{date}</div>;
        },
      },

      {
        header: `action`,
        accessorKey: "action",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} initialData={initialData} />;
        },
      },
    ],
    [data]
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
    </>
  );
};

export default GRNTable;
