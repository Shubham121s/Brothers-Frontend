import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Select } from "../../../../../components/ui";
import {
  setTableData,
  setFilterData,
  getDispatchInvoiceWithPagination,
  getAllCustomerOption,
  getAllInvoiceNumber,
  getAllInvoiceDate,
  getAllYears,
  getAllMonths,
} from "../store/dataSlice";
import DispatchInvoiceTableSearch from "./DispatchInvoiceTableSearch";
import DispatchInvoiceTableFilter from "./DispatchInvoiceTableFilter";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { HiOutlineFilter } from "react-icons/hi";
import { use } from "react";

const DispatchInvoiceTableTools = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);

  const tableData = useSelector(
    (state) => state.dispatch_invoice.data.tableData
  );

  const data = useSelector(
    (state) => state.dispatch_invoice.data.customerInvoiceDatesList
  );

  const customer = useSelector(
    (state) => state.dispatch_invoice.data.customerOption
  );

  const invoiceNumber = useSelector(
    (state) => state.dispatch_invoice.data.invoiceNumberList
  );

  const invoiceDates = useSelector(
    (state) => state.dispatch_invoice.data.invoiceDateList
  );

  const years = useSelector((state) => state.dispatch_invoice.data.years);
  const months = useSelector((state) => state.dispatch_invoice.data.months);

  const invoiceNumberOptions = isCustomerSelected
    ? data?.length
      ? data.flatMap((group) =>
          group.invoices.map((invoice) => ({
            value: invoice.invoice_no,
            label: invoice.invoice_no,
          }))
        )
      : []
    : invoiceNumber;

  const invoiceDateOptions = isCustomerSelected
    ? data?.length
      ? data.map((item) => ({
          value: item.date,
          label: item.date,
        }))
      : []
    : invoiceDates;
  const [customerValues, setCustomerValues] = useState([]);
  const [invoiceNumberValues, setInvoiceNumberValues] = useState([]);
  const [yearsValue, setYearsValue] = useState([]);
  const [monthValues, setMonthValues] = useState([]);
  const [invoiceDatesValues, setInvoiceDatesValues] = useState([]);

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
      let customer = e.map((m) => m.value);
      newTableData.customer_id = JSON.stringify(customer);
      setIsCustomerSelected(customer.length > 0);
    } else if (type === "invoiceNumber") {
      setInvoiceNumberValues(e);
      let invoiceNumber = e.map((m) => m.value);
      newTableData.invoice_no = JSON.stringify(invoiceNumber);
    } else if (type === "invoiceDates") {
      setInvoiceDatesValues(e);
      let invoiceDates = e.map((m) => m.value);
      newTableData.invoice_date = JSON.stringify(invoiceDates);
    } else if (type === "year") {
      setYearsValue(e);

      let Year = e.map((m) => m.value);

      dispatch(
        getAllInvoiceDate({
          customer_id: newTableData.customer_id,
          year: JSON.stringify(Year),
        })
      );
      newTableData.year = JSON.stringify(Year);
    } else if (type === "month") {
      setMonthValues(e);
      let months = e.map((m) => m.value);
      newTableData.months = JSON.stringify(months);
    }

    dispatch(setTableData(newTableData));
  };
  const fetchData = (data) => {
    dispatch(setTableData(data));
    dispatch(getDispatchInvoiceWithPagination(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = 1;
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ type: "" }));
    dispatch(getAllCustomerOption());
    dispatch(getAllInvoiceNumber());
    dispatch(getAllInvoiceDate());
    dispatch(getAllYears());
    dispatch(getAllMonths());
    setCustomerValues([]);
    setInvoiceNumberValues([]);
    setInvoiceDatesValues([]);
    setYearsValue([]);
    setMonthValues([]);
    newTableData.months = "";
    newTableData.year = "";
    newTableData.invoice_date = "";
    newTableData.invoice_no = "";
    newTableData.customer_id = "";
    fetchData(newTableData);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700">Invoice List</h3>
        <div className="flex items-center gap-2 mb-4">
          <DispatchInvoiceTableSearch
            ref={inputRef}
            onInputChange={handleInputChange}
          />
          <Button
            size="sm"
            icon={<HiOutlineFilter />}
            onClick={() => setOpen(() => !open)}
          >
            Filter
          </Button>
          <DispatchInvoiceTableFilter />
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
              options={years}
              value={yearsValue}
              onChange={(e) => onEdit(e, "year")}
            />

            <Select
              isMulti
              placeholder="Select Months"
              size="sm"
              options={months}
              value={monthValues}
              onChange={(e) => onEdit(e, "month")}
            />

            <Select
              isMulti
              placeholder="Select Date"
              size="sm"
              options={invoiceDateOptions}
              value={invoiceDatesValues}
              onChange={(e) => onEdit(e, "invoiceDates")}
            />

            <Select
              isMulti
              placeholder="Invoice Number"
              size="sm"
              options={invoiceNumberOptions}
              value={invoiceNumberValues}
              onChange={(e) => onEdit(e, "invoiceNumber")}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default DispatchInvoiceTableTools;
