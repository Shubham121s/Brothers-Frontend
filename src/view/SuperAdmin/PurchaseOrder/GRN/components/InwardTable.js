import React, { useMemo, useEffect, useState } from "react";
import DataTable from "../../../../../components/shared/DataTable";
import {
  Table,
  Tooltip,
  Notification,
  Toast,
} from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { setPurchaseOrderListData } from "../store/stateSlice";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const { Tr, Th, Td, THead, TBody } = Table;
const pushNotification = (title, type, message) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();

  const onView = (field) => {
    let url = field;
    if (!url) {
      return pushNotification("Error", "danger", `File Not Uploaded`);
    }
    const splitString = url.split("/uploads/");
    const transformedString = `https://mastererp.5techg.com/api/static/${splitString[1]}`;
    window.open(transformedString, "_blank");
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <Tooltip
        title={
          <div>
            View <strong className="text-yellow-400">Material TC</strong> Attch.
          </div>
        }
      >
        <span
          className={`cursor-pointer text-lg`}
          onClick={() => {
            onView(row.material_tc);
          }}
        >
          <HiOutlineDocumentDownload />
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div>
            View <strong className="text-yellow-400">Inward Inspe.</strong>{" "}
            Attch.
          </div>
        }
      >
        <span
          className={`cursor-pointer text-lg`}
          onClick={() => {
            onView(row.inward_inspection);
          }}
        >
          <HiOutlineDocumentDownload />
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div>
            View <strong className="text-yellow-400">Invoice</strong> Attch.
          </div>
        }
      >
        <span
          className={`cursor-pointer text-lg`}
          onClick={() => {
            onView(row.invoice);
          }}
        >
          <HiOutlineDocumentDownload />
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div>
            View <strong className="text-yellow-400">Heat Treatment</strong>{" "}
            Attch.
          </div>
        }
      >
        <span
          className={`cursor-pointer text-lg`}
          onClick={() => {
            onView(row.heat_treatment);
          }}
        >
          <HiOutlineDocumentDownload />
        </span>
      </Tooltip>
    </div>
  );
};

const InwardTable = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.grn.state.purchaseOrderList);
  const category = useSelector((state) => state.grn.data.category);

  const columns = useMemo(() => {
    const baseColumn = [
      {
        header: "product code",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.product_code}</span>;
        },
      },
      {
        header: "Product",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.Product?.name}</span>;
        },
      },
      {
        header: "PO quantity",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.ordered_quantity}</span>;
        },
      },

      {
        header: "inwarded Qty",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.actual_quantity}</span>;
        },
      },
      {
        header: "rejected qty",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.rejected_quantity}</span>;
        },
      },
      {
        header: "comments",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row?.comments}</span>;
        },
      },
      {
        header: "",
        accessorKey: "action",
        cell: (props) => {
          const row = props.row.original;
          return <ActionColumn row={row} />;
        },
      },
    ];

    return baseColumn;
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    style={{ border: "1px solid black" }}
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
                    <Td style={{ border: "1px solid black" }} key={cell.id}>
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

export default InwardTable;
