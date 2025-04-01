import React, { useMemo, useRef, useState } from "react";
import { Button, Card, Select, DatePicker } from "../../../../../components/ui";
import {
  setTableData,
  getAllPoWithPagination,
  setEndDate,
  setStartDate,
  getAllPOANumber,
  getAllPoMonths,
  getAllPoNumber,
  getAllPoDates,
  getAllPoYears,
  getAllCustomerName,
  setFilterData,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import PoTableSearch from "./PoTableSearch";
import { HiOutlineFilter } from "react-icons/hi";
import ReportButton from "./ReportButton";
import { Months } from "./constants";
import PoTableFilter from "./PoTableFilter";

const dateFormat = "MMM DD, YYYY";

const { DatePickerRange } = DatePicker;

const PoTableTools = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const poYears = useSelector((state) => state.po_list.data.years);
  const poMonths = useSelector((state) => state.po_list.data.months);
  const poDates = useSelector((state) => state.po_list.data.dates);
  const poNumbers = useSelector((state) => state.po_list.data.poNumbers);
  const poaNumbers = useSelector((state) => state.po_list.data.poaNumbers);
  const startDate = useSelector(
    (state) => state.po_list.data.tableData.startDate
  );
  const customer = useSelector((state) => state.po_list.data.customer);

  const data = useSelector((state) => state.po_list.data.poList);
  const endDate = useSelector((state) => state.po_list.data.tableData.endDate);

  const [poYearValues, setPoYearValues] = useState([]);
  const [poNumberValues, setPoNumberValues] = useState([]);
  const [poaNumberValues, setPoaNumberValues] = useState([]);
  const [monthValues, setMonthValues] = useState([]);
  const [dateValues, setDateValues] = useState([]);
  const [customerValues, setCustomerValues] = useState([]);

  const handleDateChange = (value) => {};

  const inputRef = useRef();

  const tableData = useSelector((state) => state.po_list.data.tableData);

  // const customerOptions = useMemo(() => {
  //   const customers = data.map((item) => ({
  //     value: item.Customer.customer_id,
  //     label: item.Customer.name,
  //   }));

  //   return Array.from(
  //     new Map(customers.map((item) => [item.value, item])).values()
  //   );
  // }, [data]);

  const handleInputChange = (val) => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length > 1) {
      fetchData(newTableData);
    }

    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  };

  const onEdit = (e, type) => {
    const newTableData = cloneDeep(tableData);
    if (type === "customer") {
      setCustomerValues(e);
      let customers = e.map((m) => m.value);
      dispatch(getAllPOANumber({ customer_id: JSON.stringify(customers) }));
      dispatch(getAllPoMonths({ customer_id: JSON.stringify(customers) }));
      dispatch(getAllPoNumber({ customer_id: JSON.stringify(customers) }));
      dispatch(getAllPoDates({ customer_id: JSON.stringify(customers) }));
      newTableData.customer_id = JSON.stringify(customers);
    } else if (type === "poYear") {
      setPoYearValues(e);
      let poYear = e.map((m) => m.value);
      dispatch(
        getAllPOANumber({
          customer_id: newTableData.customer_id,
          year: JSON.stringify(poYear),
        })
      );
      dispatch(
        getAllPoMonths({
          customer_id: newTableData.customer_id,
          year: JSON.stringify(poYear),
        })
      );
      dispatch(
        getAllPoNumber({
          customer_id: newTableData.customer_id,
          year: JSON.stringify(poYear),
        })
      );
      dispatch(
        getAllPoDates({
          customer_id: newTableData.customer_id,
          year: JSON.stringify(poYear),
        })
      );

      newTableData.year = JSON.stringify(poYear);
    } else if (type === "poNumber") {
      setPoNumberValues(e);
      let poNumbers = e.map((m) => m.value);
      newTableData.poNumber = JSON.stringify(poNumbers);
    } else if (type === "poaNumber") {
      setPoaNumberValues(e);
      let poaNumbers = e.map((m) => m.value);
      newTableData.poaNumber = JSON.stringify(poaNumbers);
    } else if (type === "month") {
      setMonthValues(e);
      let months = e.map((m) => m.value);
      dispatch(
        getAllPOANumber({
          customer_id: newTableData.customer_id,
          months: JSON.stringify(months),
          year: newTableData.year,
        })
      );
      dispatch(
        getAllPoNumber({
          customer_id: newTableData.customer_id,
          months: JSON.stringify(months),
          year: newTableData.year,
        })
      );
      dispatch(
        getAllPoDates({
          customer_id: newTableData.customer_id,
          months: JSON.stringify(months),
          year: newTableData.year,
        })
      );
      newTableData.months = JSON.stringify(months);
    } else if (type === "date") {
      setDateValues(e);
      let dates = e.map((m) => m.value);
      dispatch(
        getAllPoNumber({
          customer_id: newTableData.customer_id,
          months: newTableData.months,
          year: newTableData.year,
          date: JSON.stringify(dates),
        })
      );
      dispatch(
        getAllPOANumber({
          customer_id: newTableData.customer_id,
          months: newTableData.months,
          year: newTableData.year,
          date: JSON.stringify(dates),
        })
      );
      newTableData.date = JSON.stringify(dates);
    }

    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const fetchData = (data) => {
    dispatch(setTableData(data));
    dispatch(getAllPoWithPagination(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    dispatch(getAllPOANumber());
    dispatch(getAllPoDates());
    dispatch(getAllPoMonths());
    dispatch(getAllPoNumber());
    dispatch(getAllCustomerName());
    dispatch(getAllPoYears());
    setPoNumberValues([]);
    setPoaNumberValues([]);
    setMonthValues([]);
    setDateValues([]);
    setPoYearValues([]);
    setCustomerValues([]);
    newTableData.query = "";
    newTableData.poNumber = "";
    newTableData.poaNumber = "";
    newTableData.startDate = "";
    newTableData.endDate = "";
    newTableData.months = "";
    newTableData.year = "";
    newTableData.date = "";
    newTableData.customer_id = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ status: "" }));
    fetchData(newTableData);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3>Sale Orders</h3>
        <div className="flex gap-4">
          <PoTableSearch ref={inputRef} onInputChange={handleInputChange} />
          <Button
            size="sm"
            icon={<HiOutlineFilter />}
            onClick={() => setOpen(() => !open)}
          >
            Filter
          </Button>
          <PoTableFilter />
          <Button size="sm" onClick={onClearAll}>
            Clear All
          </Button>
          <ReportButton />
        </div>
      </div>
      {open && (
        <Card className="mb-4">
          <div className="grid grid-cols-5 gap-2">
            <Select
              isMulti
              placeholder="Customer Name"
              size="sm"
              options={customer}
              value={customerValues}
              onChange={(e) => onEdit(e, "customer")}
            />
            <Select
              isMulti
              placeholder="Year"
              size="sm"
              options={poYears}
              value={poYearValues}
              onChange={(e) => onEdit(e, "poYear")}
            />

            <Select
              isMulti
              placeholder="Select Months"
              size="sm"
              options={poMonths}
              value={monthValues}
              onChange={(e) => onEdit(e, "month")}
            />

            <Select
              isMulti
              placeholder="Select Date"
              size="sm"
              options={poDates}
              value={dateValues}
              onChange={(e) => onEdit(e, "date")}
            />
            <Select
              isMulti
              placeholder="Select POA Numbers"
              size="sm"
              options={poaNumbers}
              value={poaNumberValues}
              onChange={(e) => onEdit(e, "poaNumber")}
            />

            <Select
              isMulti
              placeholder="Select PO Numbers"
              size="sm"
              options={poNumbers}
              value={poNumberValues}
              onChange={(e) => onEdit(e, "poNumber")}
            />

            {/* <DatePickerRange
              value={[startDate, endDate]}
              placeholder="Select Range"
              onChange={(e) => onEdit(e, 'months')}
              inputFormat={dateFormat}
              size="sm"
            /> */}
          </div>
        </Card>
      )}
    </>
  );
};

export default PoTableTools;
