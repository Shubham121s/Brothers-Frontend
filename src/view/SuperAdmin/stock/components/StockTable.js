import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Badge, Tooltip } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import { getAllStock, setTableData } from "../store/dataSlice";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import {
  setSelectedStock,
  toggleDeleteConfirmation,
  toggleAddDialog,
} from "../store/stateSlice";
import StockDeleteConfirmation from "./StockDeleteConfirmation";
import StockDialogueForm from "./StockForm";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const statusColor = {
  true: {
    label: "In-Stock",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  outofstock: {
    false: "Out-Of-Stock",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();

  const onEdit = () => {
    dispatch(toggleAddDialog(true));
    dispatch(setSelectedStock(row));
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedStock(row));
  };

  return (
    <div className="flex text-lg">
      <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className="cursor-pointer p-2 hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const StockTable = () => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        header: "p.Code",
        accessorKey: "Product",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {row?.Product?.product_code}
            </div>
          );
        },
      },
      {
        header: "product ",
        accessorKey: "Product",
        cell: (props) => {
          const row = props.row.original;
          return <div className="flex items-center">{row?.Product?.name}</div>;
        },
      },
      {
        header: "category",
        accessorKey: "Product",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {" "}
              {row?.Product?.Category?.name}
            </div>
          );
        },
      },
      {
        header: "current Stock",
        accessorKey: "",
        cell: (props) => {
          const row = props.row.original;
          return <div className="flex items-center"> {row?.current_stock}</div>;
        },
      },
      // {
      //   header: "Cost",
      //   accessorKey: "",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="flex items-center">
      //         <NumericFormat
      //           displayType="text"
      //           value={row?.stock_cost}
      //           prefix={"₹ "}
      //           thousandSeparator={true}
      //           thousandsGroupStyle="lakh"
      //         />
      //       </div>
      //     );
      //   },
      // },
      // {
      //   header: "status",
      //   accessorKey: "stock_status",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="flex items-center">
      //         <Badge className={statusColor[row?.stock_status].dotClass} />
      //         <span
      //           className={`ml-2 font-semibold capitalize ${
      //             statusColor[row?.stock_status].textClass
      //           }`}
      //         >
      //           {statusColor[row?.stock_status].label}
      //         </span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   header: "Storage Location",
      //   accessorKey: "",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="flex items-center">
      //         {row?.stock_storage_location}
      //       </div>
      //     );
      //   },
      // },
      // {
      //   header: "Entry Date",
      //   accessorKey: "",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="flex items-center">{row?.stock_entry_date}</div>
      //     );
      //   },
      // },
      // {
      //   header: "Expiry Date",
      //   accessorKey: "",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return (
      //       <div className="flex items-center">{row?.stock_expiry_date}</div>
      //     );
      //   },
      // },
      // {
      //   header: "Action",
      //   accessorKey: "",
      //   cell: (props) => {
      //     const row = props.row.original;
      //     return <ActionColumn row={row} />;
      //   },
      // },
    ],
    []
  );

  const data = useSelector((state) => state.stock.data.stock);
  const loading = useSelector((state) => state.stock.data.loading);
  const { status } = useSelector((state) => state.stock.data.filterData);

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.stock.data.tableData
  );

  console.log(total);

  const fetchData = useCallback(() => {
    dispatch(getAllStock({ pageIndex, pageSize, query, status }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, status, total]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, status, total]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total, status }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, query, total, status]
  );

  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={{ pageIndex, pageSize, query, total, status }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </>
  );
};

export default StockTable;
