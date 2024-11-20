import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/shared/DataTable";
import {
  getAllProductByYearMonth,
  getAllProductOption,
  setTableData,
  getAllYears,
} from "../store/dataSlice";
import cloneDeep from "lodash/cloneDeep";

const RevenueGenerate = () => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.product_dashboard.data.productByYearMonthList
  );

  const loading = useSelector((state) => state.product_dashboard.data.loading);
  // const { type } = useSelector(
  //   (state) => state.customer_dashboard.data.filterData
  // );

  const { pageIndex, pageSize, sort, query, total, product_id, year, months } =
    useSelector((state) => state.product_dashboard.data.tableData);

  const fetchData = useCallback(() => {
    dispatch(
      getAllProductByYearMonth({
        pageIndex,
        pageSize,
        product_id,
        year,
        months,
      })
    );
    dispatch(getAllProductOption());
    dispatch(getAllYears());
  }, [pageIndex, pageSize, dispatch, product_id, year, months]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, product_id, year, months]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, product_id, year, months }),
    [pageIndex, pageSize, total, product_id, year, months]
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

  const columns = [
    {
      header: "Product Name",
      accessorKey: "product_name",
      cell: (props) => {
        const row = props.row.original;
        return <span>{row.product_name}</span>;
      },
    },
    {
      header: "Quantity",
      accessorKey: "TOTALQUANTITY",
      cell: (props) => {
        const row = props.row.original;
        return <span>{row.TOTALQUANTITY}</span>;
      },
    },
  ];

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

export default RevenueGenerate;
