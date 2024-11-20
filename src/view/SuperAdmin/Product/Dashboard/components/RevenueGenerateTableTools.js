import React, { useState } from "react";
import debounce from "lodash/debounce";
import { HiOutlineFilter } from "react-icons/hi";
// import { MONTHS } from "../../../../../";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { getAllProductByYearMonth, setTableData } from "../store/dataSlice";
import { Button, Card, Select } from "../../../../../components/ui";

const RevenueGenerateTableTools = () => {
  const [open, setOpen] = useState(false);
  const [productValues, setProductValues] = useState([]);
  const [yearValues, setyearValues] = useState([]);
  const [monthValues, setMonthValues] = useState([]);
  const dispatch = useDispatch();

  console.log("productValues", productValues);
  const tableData = useSelector(
    (state) => state.product_dashboard.data.tableData
  );
  const productOption = useSelector(
    (state) => state.product_dashboard.data.productList
  );

  const yearOption = useSelector(
    (state) => state.product_dashboard.data.yearsList
  );

  console.log("year option", yearOption);

  const tableDatas = useSelector(
    (state) => state.product_dashboard.data.tableData
  );

  console.log("tabelDatas", tableDatas);

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.product_id = "";
    newTableData.year = "";
    newTableData.month = "";

    fetchData(newTableData);
  };

  const debounceFn = debounce((val, type) => handleDebounceFn(val, type), 50);

  function handleDebounceFn(val, type) {
    const newTableData = cloneDeep(tableData);
    if (type === "product") {
      setProductValues(val);
      // let productId = val.map((m) => m.value);
      newTableData.product_id = val;
    } else if (type === "year") {
      setyearValues(val);
      let years = val.map((m) => m.value);
      newTableData.year = JSON.stringify(years);
    } else if (type === "month") {
      setMonthValues(val);
      let months = val.map((m) => m.value);
      newTableData.months = JSON.stringify(months);
    }

    // newTableData.pageIndex = 1;
    // if (val) {
    //   fetchData(newTableData);
    // } else {
    //   fetchData(newTableData);
    // }
    dispatch(setTableData(newTableData));
  }

  const fetchData = (data) => {
    dispatch(setTableData(data));
    dispatch(getAllProductByYearMonth({ ...data }));
  };

  const onEdit = (e, type) => {
    if (type === "product") {
      debounceFn(e.value, type);
    } else if (type === "year") {
      debounceFn(e, type);
    } else if (type === "month") {
      debounceFn(e, type);
    }
  };
  const MONTHS = [
    { label: "JAN", value: 1 },
    { label: "FEB", value: 2 },
    { label: "MAR", value: 3 },
    { label: "APR", value: 4 },
    { label: "MAY", value: 5 },
    { label: "JUN", value: 6 },
    { label: "JUL", value: 7 },
    { label: "AUG", value: 8 },
    { label: "SEP", value: 9 },
    { label: "OCT", value: 10 },
    { label: "NOV", value: 11 },
    { label: "DEC", value: 12 },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        {/* <h3>Master Product Planner</h3> */}
        <div></div>
        <div className="flex gap-4">
          <Button
            size="sm"
            icon={<HiOutlineFilter />}
            onClick={() => setOpen(() => !open)}
          >
            Filter
          </Button>
          <Button size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </div>
      {open && (
        <Card className="mb-4">
          <div className="grid grid-cols-5 gap-2">
            <Select
              isMulti
              placeholder="Select Year"
              size="sm"
              options={yearOption}
              value={yearValues}
              onChange={(e) => onEdit(e, "year")}
            />
            <Select
              isMulti
              placeholder="Select Months"
              size="sm"
              options={MONTHS}
              value={monthValues}
              onChange={(e) => onEdit(e, "month")}
            />
            <Select
              placeholder="Select Product"
              size="sm"
              options={productOption}
              value={productValues}
              onChange={(e) => onEdit(e, "product")}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default RevenueGenerateTableTools;
