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
  toggleQuotationDialog,
  setSelectedQuotation,
} from "../store/stateSlice";
import QuotationDialog from "./QuotationDialog";
import { getReviewByEnquiryListId } from "../store/dataSlice";
import { useReactToPrint } from "react-to-print";
import FeasibilityTable from "./FeasibilityReport";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row, initialData }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const componentRef = useRef(null);

  const onEdit = () => {
    dispatch(toggleQuotationDialog(true));
    dispatch(setSelectedQuotation(row));
  };

  const onhandlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: async () => {
      try {
        await dispatch(
          getReviewByEnquiryListId({ enquiry_list_id: row.enquiry_list_id })
        );
      } catch (error) {
        // Handle dispatch error here
        console.error("Error occurred during dispatch:", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex justify-center text-lg cursor-pointer"
        onClick={onhandlePrint}
      >
        <HiOutlineEye />
      </div>
      {initialData.status === "PENDING" && (
        <div
          className="flex justify-center text-lg cursor-pointer"
          onClick={onEdit}
        >
          <HiOutlinePencil />
        </div>
      )}

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <FeasibilityTable />
        </div>
      </div>
    </div>
  );
};

const QuotationTable = ({ initialData }) => {
  const data = useSelector(
    (state) => state.quotation_detail.data.quotationList
  );

  const columns = useMemo(
    () => [
      //   {
      //     header: "HSN CODE",
      //     accessorKey: "hsn_code",
      //     cell: (props) => {
      //       const row = props.row.original;
      //       return <div>{row?.hsn_code}</div>;
      //     },
      //   },
      {
        header: "DRAWING NO.",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.drawing_number}</div>;
        },
      },
      {
        header: "PART NO.",
        accessorKey: "part_number",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.part_number}</div>;
        },
      },
      {
        header: "PART NAME",
        accessorKey: "part_name",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.part_name}</div>;
        },
      },
      {
        header: "PART type",
        accessorKey: "part_type",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.part_type}</div>;
        },
      },
      {
        header: "each rate",
        accessorKey: "each_rate",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.each_rate}</div>;
        },
      },
      {
        header: "QUANTITY",
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.quantity}</div>;
        },
      },
      {
        header: "Total amount",
        accessorKey: "final_amount",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.final_amount}</div>;
        },
      },
      {
        header: ``,
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
      <QuotationDialog />
    </>
  );
};

export default QuotationTable;
