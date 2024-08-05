import React, { useCallback, useEffect, useMemo } from "react";
import { Badge } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import {
  getAllLedgerListByWorkerId,
  getWorkerDetailsByWorkerId,
  setTableData,
} from "../store/dataSlice";
import useQuery from "../../../../../utils/hooks/useQuery";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";

const typeBgColor = {
  credit: "bg-emerald-500",
  debit: "bg-red-400",
};

const typeTextColor = {
  credit: "text-emerald-500",
  debit: "text-red-400",
};

const ledgerList = [
  {
    type: "Debit",
    amount: 500.0,
    balance: 2500.0,
    payment_type: "Cash",
    description: "Payment for services",
    createdAt: "2023-12-05T14:00:00Z",
  },
  {
    type: "Credit",
    amount: 1000.0,
    balance: 3500.0,
    payment_type: "Credit Card",
    description: "Customer refund",
    createdAt: "2023-12-05T14:30:00Z",
  },
  {
    type: "Debit",
    amount: 300.0,
    balance: 3200.0,
    payment_type: "Bank Transfer",
    description: "Purchase of supplies",
    createdAt: "2023-12-05T15:00:00Z",
  },
];

const LedgerTable = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.workerLedgerList.data.workerLedgerList
  );

  const columns = useMemo(
    () => [
      {
        header: "Transaction Type",
        accessorKey: "type",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge className={typeBgColor[row?.type]} />
              <span
                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                  typeTextColor[row?.type]
                }`}
              >
                {row?.type}
              </span>
            </div>
          );
        },
      },
      {
        header: "amount",
        accessorKey: "amount",
        cell: (props) => {
          const row = props.row.original;
          return (
            <NumericFormat
              displayType="text"
              value={(Math.round(row?.amount * 100) / 100).toFixed(2)}
              prefix={(row.type === "credit" ? "+" : "-") + " " + "₹"}
              thousandSeparator={true}
            />
          );
        },
      },
      {
        header: "balance",
        accessorKey: "balance",
        cell: (props) => {
          const row = props.row.original;
          return (
            <NumericFormat
              displayType="text"
              value={(
                Math.round(
                  (row?.balance < 0 ? -row?.balance : row?.balance) * 100
                ) / 100
              ).toFixed(2)}
              prefix={"₹"}
              thousandSeparator={true}
            />
          );
        },
      },
      {
        header: "Payment Type",
        accessorKey: "payment_type",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {row?.payment_type === null ? "-" : row?.payment_type}
            </div>
          );
        },
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {row?.description === null ? "-" : row?.description}
            </div>
          );
        },
      },
      {
        header: "Date",
        accessorKey: "createdAt",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs(row?.createdAt).format("DD/MM/YYYY")}
            </div>
          );
        },
      },
    ],
    [data]
  );

  const loading = useSelector((state) => state.workerLedgerList.data.loading);
  const { status } = useSelector(
    (state) => state.workerLedgerList.data.filterData
  );

  const searchQuery = useQuery();
  const workerId = searchQuery.get("id");

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.workerLedgerList.data.tableData
  );
  const endDate = useSelector((state) => state.workerLedgerList.state.endDate);
  const startDate = useSelector(
    (state) => state.workerLedgerList.state.startDate
  );

  const fetchData = useCallback(() => {
    dispatch(
      getAllLedgerListByWorkerId({
        pageIndex,
        status,
        pageSize,
        endDate,
        startDate,
        worker_id: Number(workerId),
      })
    );
    dispatch(getWorkerDetailsByWorkerId({ worker_id: Number(workerId) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, status, workerId, endDate]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, workerId, endDate, status]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total, workerId }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, query, status, total, workerId]
  );

  useEffect(() => {
    dispatch(setTableData(tableData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

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
    <DataTable
      columns={columns}
      data={data}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ width: 28, height: 28 }}
      loading={loading}
      pagingData={{ pageIndex, pageSize, query, total, status, workerId }}
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
    />
  );
};

export default LedgerTable;
