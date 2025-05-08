import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Table } from "../../../../components/ui";
import dayjs from "dayjs";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import { useDispatch } from "react-redux";

const { Tr, Th, Td, THead, TBody, TFoot } = Table;

const ActionColumn = ({ row, qualityItems, setQualityItems }) => {
  const dispatch = useDispatch();
  //   const onEdit = () => {
  //     dispatch(toggleEditDispatchItemDialog(true));
  //     dispatch(setSelectedDispatchItem(row));
  //   };

  const onDelete = () => {
    const updatedData = qualityItems.filter((item) => item !== row);
    setQualityItems(updatedData);
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      {/* <span
        className="cursor-pointer hover:text-blue-500"
        //   onClick={onEdit}
      >
        <HiOutlinePencil />
      </span> */}

      {qualityItems.length > 1 && (
        <span
          className="cursor-pointer hover:text-red-500 text-gray-600"
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </span>
      )}
    </div>
  );
};

const ItemTable = ({ initialData = [], setQualityItems }) => {
  const columns = useMemo(() => {
    return [
      {
        header: <span className="text-gray-500">Po no. and serial number</span>,
        accessorKey: "PoList",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center text-gray-500">
              {`${row?.Po.number}-${row?.PoList?.serial_number}`}
            </div>
          );
        },
      },
      {
        header: "Project number",
        accessorKey: "project_no",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center text-gray-500">
              {row?.project_no}
            </div>
          );
        },
      },
      {
        header: "Drawing number",
        accessorKey: "drawing_number",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center text-gray-500">
              {row?.drawing_number}
            </div>
          );
        },
      },
      {
        header: "Quantity",
        accessorKey: "PoList.quantity",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center text-gray-500">
              {row?.PoList?.quantity}
            </div>
          );
        },
      },
      {
        header: "",
        accessorKey: "action",
        cell: (props) => {
          const row = props.row.original;
          return (
            <ActionColumn
              row={row}
              qualityItems={initialData}
              setQualityItems={setQualityItems}
            />
          );
        },
      },
    ];
  }, [initialData]);

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
                    className="select-none font-medium !text-gray-600"
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
                      className="select-none font-normal !text-gray-600"
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

export default memo(ItemTable);
