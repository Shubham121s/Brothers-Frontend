import React, { useMemo, useCallback, useEffect } from "react";
import { Button, Table, Tooltip } from "../../../../../../components/ui";
import dayjs from "dayjs";
import {
  HiOutlineDocumentDownload,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import useThemeClass from "../../../../../../utils/hooks/useThemeClass";
import DataTable from "../../../../../../components/shared/DataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDrawingByDrawingId,
  getAllDrawingsByProductId,
  setTableData,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import {
  setSelectedDrawing,
  toggleDeleteDrawingDialog,
  toggleEditDrawingDialog,
} from "../store/stateSlice";
import EditDrawingDialog from "./EditDrawingDialog";

import { apiPostDownloadDrawingAttachment } from "../../../../../../services/SuperAdmin/Product/DrawingService";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DrawingDeleteConfirmationDialog from "./DrawingDeleteConfirmationDialog";
const { Tr, Th, Td, THead, TBody } = Table;

const DownloadColumn = ({ row }) => {
  const onDownload = async (pdf_attachment_id, filename) => {
    try {
      const response = await apiPostDownloadDrawingAttachment({
        pdf_attachment_id,
      });

      if (response.data) {
        const blob = new Blob([response?.data], {
          type: "application.pdf",
        });
        console.log(blob);
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${filename}-${row.drawing_revision_number}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.log("error downloading", error);
    }
  };
  return (
    <div className="flex gap-x-4 justify-center">
      <Tooltip
        title={
          <div>
            Download <strong className="text-yellow-400">Process</strong> pdf
          </div>
        }
      >
        <span
          className={`cursor-pointer text-lg`}
          onClick={() => {
            onDownload(row.process_attachment, "Process Sheet");
          }}
        >
          <HiOutlineDocumentDownload />
        </span>
      </Tooltip>

      <Tooltip
        title={
          <div>
            Download <strong className="text-yellow-400">Raw</strong> pdf
          </div>
        }
      >
        <span
          className={`cursor-pointer text-lg`}
          onClick={() => {
            onDownload(row.raw_attachment, "Raw Attachment");
          }}
        >
          <HiOutlineDocumentDownload />
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div>
            Download <strong className="text-yellow-400">Finish</strong> pdf
          </div>
        }
      >
        <span
          className={`cursor-pointer text-lg`}
          onClick={() => {
            onDownload(row.finish_attachment, "Finish Attachment");
          }}
        >
          <HiOutlineDocumentDownload />
        </span>
      </Tooltip>
    </div>
  );
};

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();

  const onEdit = useCallback(() => {
    dispatch(setSelectedDrawing(row));
    dispatch(toggleEditDrawingDialog(true));
  }, [row]);

  const onDelete = () => {
    dispatch(setSelectedDrawing(row));
    dispatch(toggleDeleteDrawingDialog(true));
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      {/* <span className={`cursor-pointer hover:text-red-500`} onClick={onDelete}>
        <HiOutlineTrash />
      </span> */}
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span>
    </div>
  );
};

const DrawingTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        header: "Drawing",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span className="uppercase">{data?.drawing_number}</span>;
        },
      },
      {
        header: "Drg Revision No.",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span className="uppercase">{row.revision_number}</span>;
        },
      },
      {
        header: "Raw weight",
        accessorKey: "raw_weight",
        cell: (props) => {
          const row = props.row.original;
          return <span className="uppercase">{`${row.raw_weight} Kg`}</span>;
        },
      },
      {
        header: "Finish weight",
        accessorKey: "finish_weight",
        cell: (props) => {
          const row = props.row.original;
          return <span className="uppercase">{`${row.finish_weight} Kg`}</span>;
        },
      },
      {
        header: "Scrap weight",
        accessorKey: "scrap_weight",
        cell: (props) => {
          const row = props.row.original;
          const scratch_weight = row.raw_weight - row.finish_weight;
          return (
            <span className="uppercase">{`${scratch_weight.toFixed(
              2
            )} Kg`}</span>
          );
        },
      },
      {
        header: "Reg. Date",
        accessorKey: "createdAt",
        cell: (props) => {
          const row = props.row.original;
          return <span>{dayjs(row.createdAt).format("DD-MMM-YYYY")}</span>;
        },
      },
      {
        header: "downloads",
        accessorKey: "drawing_revision_id",
        cell: (props) => {
          const row = props.row.original;
          return <DownloadColumn row={row} />;
        },
      },
      {
        header: "Action",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} />;
        },
      },
    ],
    []
  );
  const table = useReactTable({
    data: data?.Drawings || [],
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
                  list_status === "reject"
                    ? "bg-red-400 text-white"
                    : list_status === "accept"
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
      <EditDrawingDialog />
      <DrawingDeleteConfirmationDialog />
    </>
  );
};

export default DrawingTable;
