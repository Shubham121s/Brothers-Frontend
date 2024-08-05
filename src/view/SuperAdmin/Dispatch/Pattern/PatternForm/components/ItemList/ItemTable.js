import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { memo, useMemo } from "react";
import { Table } from "../../../../../../../components/ui";
import dayjs from "dayjs";
import NumberFormat from "../../../utils/numberFormat";
import { InvoiceQuantity } from "../../../utils/quantity";
import { InvoiceWeight } from "../../../utils/weight";
import { InvoiceTotal } from "../../../utils/amount";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import cloneDeep from "lodash/cloneDeep";
const { Tr, Th, Td, THead, TBody, TFoot } = Table;

const TableFooterRows = ({ pageNo, singlePageData = [] }) => {
  return (
    <>
      <Tr style={{ border: ".5px solid #e0e0e0", textAlign: "center" }}>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="3"></Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="3">
          <div className="text-gray-500">Total (page {pageNo + 1})</div>
        </Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1">
          <div className="text-gray-700 text-center">
            {InvoiceQuantity(singlePageData)}
          </div>
        </Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1"></Td>
        <Td style={{ border: ".5px solid #e0e0e0" }}>
          <NumberFormat value={InvoiceTotal(singlePageData)} />
        </Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1"></Td>
        <Td style={{ border: ".5px solid #e0e0e0" }} colSpan="1">
          <NumberFormat value={InvoiceWeight(singlePageData)} />
        </Td>
      </Tr>
    </>
  );
};

const ActionColumn = (props) => {
  const {
    handleDeleteItemInPoList,
    handleEditItemInPoList,
    row,
    setFieldValue,
    index,
    dispatchList,
  } = props;
  const onDelete = () => {
    handleDeleteItemInPoList?.(dispatchList, setFieldValue, index);
  };

  const onEdit = () => {
    handleEditItemInPoList?.(dispatchList, setFieldValue, index, row);
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <span className="cursor-pointer hover:text-red-500" onClick={onEdit}>
        <HiOutlinePencil />
      </span>
      <span className="cursor-pointer hover:text-red-500" onClick={onDelete}>
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const ItemTable = ({
  dispatchList,
  handleDeleteItemInPoList,
  handleEditItemInPoList,
  currency,
  setFieldValue,
}) => {
  // const [data, setData] = useState(() => initialData)
  console.log(dispatchList);

  const columns = useMemo(() => {
    return [
      {
        header: "PO Sr No.",
        accessorKey: "serial_number",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{`${
              row?.Po?.number + "-" + row?.PoList?.serial_number
            }`}</div>
          );
        },
      },
      {
        header: "Deesciption of goods",
        accessorKey: "serial_number",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">
              <strong>Product : </strong>
              {row?.PoList?.Product?.name}
              <br /> <strong>Item Code : </strong>
              {row?.PoList?.Product?.item_code}
              <br />
              <strong>HSN Code :</strong> {row?.PoList?.Product?.hsn_code}
            </div>
          );
        },
        // columns: [
        //   {
        //     header: "product name",
        //     accessorKey: "name",
        //     cell: (props) => {
        //       const row = props.row.original;
        //       return (
        //         <div className="uppercase text-center">
        //           {row?.PoList?.Product?.name}
        //         </div>
        //       );
        //     },
        //   },
        //   {
        //     header: "item code",
        //     accessorKey: "item_code",
        //     cell: (props) => {
        //       const row = props.row.original;
        //       return (
        //         <div className="uppercase text-center">
        //           {row?.PoList?.Product?.item_code}
        //         </div>
        //       );
        //     },
        //   },
        //   {
        //     header: "hsn code",
        //     accessorKey: "hsn_code",
        //     cell: (props) => {
        //       const row = props.row.original;
        //       return (
        //         <div className="uppercase text-center">
        //           {row?.PoList?.Product?.hsn_code}
        //         </div>
        //       );
        //     },
        //   },
        // ],
      },
      {
        header: "No ",
        accessorKey: "no",
        cell: (props) => {
          const row = props.row.original;
          return <div className="uppercase text-center">{`${row?.no}`}</div>;
        },
        // columns: [
        //   {
        //     header: "qty",
        //     accessorKey: "PoList.quantity",
        //     cell: (props) => {
        //       const row = props.row.original;
        //       return (
        //         <div className="uppercase text-center">{row?.quantity}</div>
        //       );
        //     },
        //   },
        //   {
        //     header: "rate",
        //     accessorKey: "unit_price",
        //     cell: (props) => {
        //       const row = props.row.original;
        //       return (
        //         <div className="uppercase text-center">
        //           {Number(row?.PoList?.unit_price).toFixed(2)}
        //         </div>
        //       );
        //     },
        //   },
        //   {
        //     header: "total",
        //     accessorKey: "net_amount",
        //     cell: (props) => {
        //       const row = props.row.original;
        //       return (
        //         <div className="uppercase text-center">
        //           {Number(row?.PoList?.unit_price * row?.quantity).toFixed(2)}
        //         </div>
        //       );
        //     },
        //   },
        // ],
      },
      {
        header: "qty in sets.",
        accessorKey: "quantity",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{`${row?.quantity}`}</div>
          );
        },
      },
      {
        header: `Rate in ${currency}`,
        accessorKey: "rate",
        cell: (props) => {
          const row = props.row.original;
          return <div className="uppercase text-center">{`${row?.rate}`}</div>;
        },
      },
      {
        header: `amount in ${currency}`,
        accessorKey: "amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="uppercase text-center">{`${(
              row?.quantity * row?.rate
            ).toFixed(2)}`}</div>
          );
        },
      },
      {
        header: "",
        accessorKey: "action",
        cell: (props) => {
          const { index } = props.row;
          const row = props.row.original;
          return (
            <ActionColumn
              index={index}
              setFieldValue={setFieldValue}
              dispatchList={dispatchList}
              handleDeleteItemInPoList={handleDeleteItemInPoList}
              handleEditItemInPoList={handleEditItemInPoList}
              row={row}
            />
          );
        },
      },
    ];
  }, [
    handleDeleteItemInPoList,
    dispatchList,
    handleEditItemInPoList,
    currency,
  ]);

  const table = useReactTable({
    data: dispatchList,
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
                    className="select-none"
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
                      className="select-none"
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
        {/* <TFoot>
                    <TableFooterRows
                        pageNo={index}
                        singlePageData={PoList[index]?.pageList}
                    />
                </TFoot> */}
      </Table>
    </>
  );
};
export default memo(ItemTable);
