import React, { useRef, useEffect, useMemo, useState, memo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { Table, Checkbox } from "../../../../../components/ui";

const { Tr, Th, Td, THead, TBody } = Table;

export const FabricationRawTable = () => {
  const columns = useMemo(() => {
    return [
      {
        header: "Part name",
        accessorKey: "fabrication_part_type",
      },
      {
        header: "length/od",
        accessorKey: "fabrication_length",
      },
      {
        header: "width",
        accessorKey: "fabrication_width",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.fabrication_width || "-"}</div>;
        },
      },
      {
        header: "thickness",
        accessorKey: "thickness",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.thickness || "-"}</div>;
        },
      },
      {
        header: "quantity",
        accessorKey: "fabrication_quantity",
      },
      {
        header: "raw_weight",
        accessorKey: "raw_weight",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.raw_weight || "-"}</div>;
        },
      },
      {
        header: "raw material rate",
        accessorKey: "raw_material_rate",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.raw_material_rate || "-"}</div>;
        },
      },
      {
        header: "amount",
        accessorKey: "amount",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.amount || "-"}</div>;
        },
      },
    ];
  }, []);

  const selectedFabrication = useSelector(
    (state) => state.enquiry_detail.state.selectedFabrication
  );

  const data = useMemo(() => {
    return selectedFabrication.map((m) => {
      const raw_weight =
        m.fabrication_part_type === "PLATE"
          ? m.fabrication_length *
            m.fabrication_width *
            parseFloat(m.thickness) *
            0.00000786 *
            m.fabrication_quantity
          : ((m.fabrication_length *
              m.fabrication_length *
              parseFloat(m.thickness)) /
              160 /
              1000) *
            m.fabrication_quantity;

      const amount = parseFloat(raw_weight) * parseFloat(m.raw_material_rate);

      return {
        ...m,
        raw_weight: parseFloat(raw_weight).toFixed(2),
        amount: parseFloat(amount).toFixed(2),
      };
    });
  }, [selectedFabrication]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th key={header.id} colSpan={header.colSpan}>
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
                  <Td key={cell.id}>
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

export const FabricationScrapTable = () => {
  const columns = useMemo(() => {
    return [
      {
        header: "Part name",
        accessorKey: "fabrication_part_type",
      },
      {
        header: "id",
        accessorKey: "fabricatioin_id",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.fabrication_id || "-"}</div>;
        },
      },
      {
        header: "thickness",
        accessorKey: "thickness",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.thickness || "-"}</div>;
        },
      },
      {
        header: "quantity",
        accessorKey: "fabrication_quantity",
      },
      {
        header: "raw_weight",
        accessorKey: "raw_weight",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.raw_weight || "-"}</div>;
        },
      },
      {
        header: "scrape material rate",
        accessorKey: "fabrication_material_rate",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.fabrication_material_rate || "-"}</div>;
        },
      },
      {
        header: "amount",
        accessorKey: "amount",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.amount || "-"}</div>;
        },
      },
    ];
  }, []);

  const selectedFabrication = useSelector(
    (state) => state.enquiry_detail.state.selectedScrapFabrication
  );

  const data = useMemo(() => {
    return selectedFabrication.map((m) => {
      const raw_weight =
        ((m.fabrication_id * m.fabrication_id * parseFloat(m.thickness)) /
          160 /
          1000) *
        m.fabrication_quantity;

      const amount =
        parseFloat(raw_weight) * parseFloat(m.fabrication_material_rate);

      return {
        ...m,
        raw_weight: parseFloat(raw_weight),
        amount: parseFloat(amount),
      };
    });
  }, [selectedFabrication]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th key={header.id} colSpan={header.colSpan}>
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
                  <Td key={cell.id}>
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

const FabricationTable = () => {
  return (
    <div className="flex justify-between gap-2">
      <FabricationRawTable />

      <FabricationScrapTable />
    </div>
  );
};

export default FabricationTable;
