import { memo, useMemo, useState, useRef } from "react";
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
import AddProductDialog from "./EditItemDialog";
import {
  setSelectedProductItem,
  toggleAddProductDialog,
  toggleFinishDialog,
} from "../store/stateSlice";
import { FaPlus } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import FeasibilityTable from "./feasibilityReport";
import { getReviewByEnquiryListId } from "../store/dataSlice";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const componentRef = useRef(null);

  const onView = () => {
    dispatch(toggleAddProductDialog(true));

    dispatch(setSelectedProductItem(row));
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
    <div className="flex items-center gap-3">
      <span
        className={`cursor-pointer hover:${textTheme} text-lg`}
        onClick={onhandlePrint}
      >
        <HiOutlineEye />
      </span>
      <span
        className={`cursor-pointer hover:${textTheme} text-sm`}
        onClick={onView}
      >
        <FaPlus />
      </span>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <FeasibilityTable />
        </div>
      </div>
    </div>
  );
};

const EnquiryListTable = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        header: "Part type",
        accessorKey: "part_type",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.part_type}</div>;
        },
      },
      {
        header: "HSN CODE",
        accessorKey: "hsn_code",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.hsn_code}</div>;
        },
      },
      {
        header: "DRAWING NO.",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.drawing_number}</div>;
        },
      },
      {
        header: "MATERIAL GRADE",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.MaterialGrade?.number}</div>;
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
        header: "OD",
        accessorKey: "od",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.od || "-"}</div>;
        },
      },
      {
        header: "ID",
        accessorKey: "id",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.id || "-"}</div>;
        },
      },
      {
        header: "THICKNESS",
        accessorKey: "thickness",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.thickness || "-"}</div>;
        },
      },
      {
        header: "LENGTH",
        accessorKey: "length",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.length || "-"}</div>;
        },
      },
      {
        header: "WIDTH",
        accessorKey: "width",
        cell: (props) => {
          const row = props.row.original;
          return <div>{row?.width || "-"}</div>;
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
        header: ``,
        accessorKey: "action",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} />;
        },
      },
    ],
    [data]
  );

  const selectedPoItem = useSelector(
    (state) => state.enquiry_detail.state.selectedPoItem
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
      <AddProductDialog />
    </>
  );
};

export default memo(EnquiryListTable);
