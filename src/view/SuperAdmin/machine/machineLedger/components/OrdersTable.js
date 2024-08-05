import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Badge } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import DataTable from "../../../../components/shared/DataTable";
import {
  getAllRetailerOrdersByRetailerId,
  setFilterDataOrder,
} from "../store/dataSlice";
import { NumericFormat } from "react-number-format";
import useQuery from "../../../../utils/hooks/useQuery";

const orderStatusBgColor = {
  confirmed: "bg-emerald-500",
  pending: "bg-yellow-500",
  rejected: "bg-red-400",
};

const statusBgColor = {
  paid: "bg-emerald-500",
  pending: "bg-yellow-500",
  rejected: "bg-red-400",
};

const statusTextColor = {
  paid: "text-emerald-500",
  pending: "text-yellow-500",
  rejected: "text-red-400",
};
const orderStatusTextColor = {
  confirmed: "text-emerald-500",
  pending: "text-yellow-500",
  rejected: "text-red-400",
};

const OrderColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  return (
    <span
      className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
    >
      #{row.order_id}
    </span>
  );
};

const RetailerOrdersTable = () => {
  const dispatch = useDispatch();
  const findQuery = useQuery();
  const columns = useMemo(
    () => [
      {
        header: "Order",
        accessorKey: "order_id",
        cell: (props) => <OrderColumn row={props.row.original} />,
      },
      {
        header: "Retailer Name",
        accessorKey: "Retailer",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center capitalize">
              {row?.Retailer?.retailer_name}
            </div>
          );
        },
      },
      {
        header: "Order status",
        accessorKey: "order_status",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={orderStatusBgColor[row?.order_status]} />
              <span
                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                  orderStatusTextColor[row?.order_status]
                }`}
              >
                {row?.order_status}
              </span>
            </div>
          );
        },
      },
      {
        header: "Bill amount",
        accessorKey: "Bill",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <NumericFormat
                displayType="text"
                value={Number(row?.Bill?.billing_amount).toFixed(2)}
                prefix={"₹ "}
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
              />
            </div>
          );
        },
      },
      {
        header: "Pending amount",
        accessorKey: "Bill",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <NumericFormat
                displayType="text"
                value={Number(row?.Bill?.pending_amount).toFixed(2)}
                prefix={"₹ "}
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
              />
            </div>
          );
        },
      },
      {
        header: "Bill status",
        accessorKey: "Bill",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={statusBgColor[row?.Bill?.bill_status]} />
              <span
                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                  statusTextColor[row?.Bill?.bill_status]
                }`}
              >
                {row?.Bill?.bill_status}
              </span>
            </div>
          );
        },
      },
      {
        header: "Order date",
        accessorKey: "created_at",
        cell: (props) => {
          const row = props.row.original;
          return <span>{dayjs(row.created_at).format("DD/MM/YYYY")}</span>;
        },
      },
    ],
    []
  );

  const retailerId = findQuery.get("id");

  // const data = useSelector((state) => state.retailerLedgerList.data.orderList);
  // const loading = useSelector(
  //   (state) => state.retailerLedgerList.data.orderLoading
  // );
  // const  } = useSelector(
  //     (state) => state.adminOrderList.data.filterData
  // )

  // const { pageIndex, pageSize, query, total } = useSelector(
  //   (state) => state.retailerLedgerList.data.tableDataOrder
  // );

  // const fetchData = useCallback(() => {
  //   dispatch(
  //     getAllRetailerOrdersByRetailerId({
  //       pageIndex,
  //       pageSize,
  //       query,
  //       total,
  //       retailer_id: retailerId,
  //     })
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageIndex, pageSize, query, retailerId]);

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pageIndex, pageSize, query, retailerId]);

  // const tableData = useMemo(
  //   () => ({ pageIndex, pageSize, query, total }),
  //   [pageIndex, pageSize, query, total]
  // );

  // const onPaginationChange = (page) => {
  //   const newTableData = cloneDeep(tableData);
  //   newTableData.pageIndex = page;
  //   dispatch(setFilterDataOrder(newTableData));
  // };

  // const onSelectChange = (value) => {
  //   const newTableData = cloneDeep(tableData);
  //   newTableData.pageSize = Number(value);
  //   newTableData.pageIndex = 1;
  //   dispatch(setFilterDataOrder(newTableData));
  // };

  return (
    <DataTable
      columns={columns}
      // data={data}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ width: 28, height: 28 }}
      // loading={loading}
      // pagingData={{ pageIndex, pageSize, query, total }}
      // onPaginationChange={onPaginationChange}
      // onSelectChange={onSelectChange}
    />
  );
};

export default RetailerOrdersTable;
