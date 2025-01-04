import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Select } from "../../../../../components/ui";
import {
  setTableData,
  setFilterData,
  getDispatchInvoiceWithPagination,
  getAllCustomerOption,
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

  const tableData = useSelector(
    (state) => state.dispatch_invoice.data.tableData
  );

  const data = useSelector(
    (state) => state.dispatch_invoice.data.dispatchInvoiceList
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

  const [customerValues, setCustomerValues] = useState([]);
  const [invoiceNumberValues, setInvoiceNumberValues] = useState([]);

  const [invoiceDatesValues, setInvoiceDatesValues] = useState([]);

  const [filteredInvoiceNumbers, setFilteredInvoiceNumbers] = useState([]);
  const [filteredInvoiceDates, setFilteredInvoiceDates] = useState([]);

  const [filteredData, setFilteredData] = useState({
    invoices: [],
    dates: [],
  });

  const [shouldFilter, setShouldFilter] = useState(false);

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

  useEffect(() => {
    if (shouldFilter) {
      const filter = customerValues.map((item) => item.value);

      const filteredInvoices = data
        .filter((item) => filter.includes(item.DispatchConsignee.customer_id))
        .map((item) => ({ label: item.invoice_no, value: item.invoice_no }));

      console.log("filteredInvoices", filteredInvoices);
      const filteredDates = data
        .filter((item) => filter.includes(item.DispatchConsignee.customer_id))
        .map((item) => ({
          label: item.invoice_date,
          value: item.invoice_date,
        }));

      setFilteredData({
        invoices: filteredInvoices,
        dates: filteredDates,
      });
    }
  }, [data, customerValues]);

  useEffect(() => {
    if (
      shouldFilter &&
      filteredData.invoices.length > 0 &&
      filteredData.dates.length > 0
    ) {
      const timeout = setTimeout(() => {
        setShouldFilter(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [filteredData, shouldFilter]);

  const onEdit = (e, type) => {
    const newTableData = cloneDeep(tableData);

    if (type === "customer") {
      setCustomerValues(e);
      setShouldFilter(true);
      let customer = e.map((m) => m.value);
      newTableData.customer_id = JSON.stringify(customer);
    } else if (type === "invoiceNumber") {
      setInvoiceNumberValues(e);
      let invoiceNumber = e.map((m) => m.value);
      newTableData.invoice_no = JSON.stringify(invoiceNumber);
    } else if (type === "invoiceDates") {
      setInvoiceDatesValues(e);
      let invoiceDates = e.map((m) => m.value);
      newTableData.invoice_date = JSON.stringify(invoiceDates);
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
              placeholder="Invoice Number"
              size="sm"
              options={
                filteredData.invoices.length > 0
                  ? filteredData.invoices
                  : invoiceNumber
              }
              value={invoiceNumberValues}
              onChange={(e) => onEdit(e, "invoiceNumber")}
            />
            <Select
              isMulti
              placeholder="Select Date"
              size="sm"
              options={
                filteredData.dates.length > 0
                  ? filteredData.dates
                  : invoiceDates
              }
              value={invoiceDatesValues}
              onChange={(e) => onEdit(e, "invoiceDates")}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default DispatchInvoiceTableTools;
