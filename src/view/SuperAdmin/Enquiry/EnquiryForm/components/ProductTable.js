import React, { useMemo } from "react";
import { AdaptableCard } from "../../../../../components/shared";
import { Table, Button } from "../../../../../components/ui";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { NumericFormat } from "react-number-format";
import { HiOutlinePencil, HiOutlineEye } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
// import { setRemoveSelectedProducts } from "../store/stateSlice";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import {
  toggleSetProductType,
  toggleReviewDialog,
  toggleDeleteSelectedProduct,
} from "../store/stateSlice";
import ReviewDialog from "./reviewDialog";
import { deleteSelectedProduct } from "../store/dataSlice";

const { Tr, Th, Td, THead, TBody } = Table;

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const savedReview = useSelector(
    (state) => state.newEnquiry.state.savedReview
  );

  const onDelete = () => {
    dispatch(toggleDeleteSelectedProduct(row.enquiry_list_id));
    dispatch(deleteSelectedProduct({ enquiry_list_id: row.enquiry_list_id }));
  };

  const onViewDialog = () => {
    dispatch(toggleReviewDialog(true));
    dispatch(toggleSetProductType(row));
  };

  return (
    <div className="flex justify-between text-lg">
      {savedReview.includes(row.enquiry_list_id) ? null : (
        <span
          className={`cursor-pointer hover:${textTheme}`}
          onClick={onViewDialog}
        >
          <HiOutlineEye />
        </span>
      )}
      <span className={`cursor-pointer hover:text-red-500`} onClick={onDelete}>
        <FaTrash />
      </span>
    </div>
  );
};

const SelectedProductTable = () => {
  const data = useSelector((state) => state.newEnquiry.state.selectedProducts);

  const columns = useMemo(
    () => [
      {
        header: "hsn code",
        accessorKey: "hsn_code",
        cell: (props) => {
          const row = props.row.original;
          return <div className="capitalize">{row?.hsn_code}</div>;
        },
      },
      {
        header: "drawing no.",
        accessorKey: "drawing_number",
        cell: (props) => {
          const row = props.row.original;
          return <div className="capitalize">{row?.drawing_number}</div>;
        },
      },
      // {
      //   header: "material grade",
      //   accessorKey: "material_grade",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return <>{row?.material_grade}</>;
      //   },
      // },
      {
        header: "part no.",
        accessorKey: "part_number",
      },
      {
        header: "part name",
        accessorKey: "part_name",
        cell: (props) => {
          const row = props.row.original;
          return <div className="capitalize">{row?.part_name}</div>;
        },
      },
      {
        header: "od",
        accessorKey: "od",
        cell: (props) => {
          const row = props.row.original;
          return <div className="">{row?.od || "-"}</div>;
        },
      },
      {
        header: "id",
        accessorKey: "id",
        cell: (props) => {
          const row = props.row.original;
          return <div className="">{row?.id || "-"}</div>;
        },
      },
      {
        header: "thickness",
        accessorKey: "thickness",
        cell: (props) => {
          const row = props.row.original;
          return <div className="">{row?.thickness || "-"}</div>;
        },
      },
      {
        header: "length",
        accessorKey: "length",
        cell: (props) => {
          const row = props.row.original;
          return <div className="">{row?.length || "-"}</div>;
        },
      },
      {
        header: "width",
        accessorKey: "width",
        cell: (props) => {
          const row = props.row.original;
          return <div className="">{row?.width || "-"}</div>;
        },
      },
      {
        header: "quantity",
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return <div className="">{row?.quantity}</div>;
        },
      },
      {
        // header: 'Total',
        accessorKey: "action",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} />;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AdaptableCard className="mb-4">
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan} className="">
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
              <>
                <Tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id} className="">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              </>
            );
          })}
        </TBody>
      </Table>
      <ReviewDialog />
    </AdaptableCard>
  );
};

export default SelectedProductTable;
