import React, { useEffect, useCallback, useMemo } from "react";
import { Badge, Tag } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  getDynamicDashboardData,
  setTableData,
  getAllCustomerOption,
  getAllYears,
} from "../store/dataSlice";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../../components/shared/DataTable";

const NameColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return <div className="items-center uppercase">{row.name}</div>;
};

const columns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (props) => {
      const row = props.row.original;
      return <NameColumn row={row} />;
    },
  },
  {
    header: "Sales",
    cell: (props) => {
      const row = props.row.original;
      return <span className="uppercase">{"₹ " + row?.GRANDTOTAL}</span>;
    },
  },
];

const CustomerDashboardTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.customer_dashboard.data.customerData
  );

  const loading = useSelector((state) => state.customer_dashboard.data.loading);
  const { type } = useSelector(
    (state) => state.customer_dashboard.data.filterData
  );

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.customer_dashboard.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getDynamicDashboardData({ pageIndex, pageSize }));
    dispatch(getAllCustomerOption());
    dispatch(getAllYears());
  }, [pageIndex, pageSize, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize, total]
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
        pagingData={{ pageIndex, pageSize, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </>
  );
};

export default CustomerDashboardTable;
