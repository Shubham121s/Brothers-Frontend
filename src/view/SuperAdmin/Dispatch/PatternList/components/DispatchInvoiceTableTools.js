import React, { useRef, useState } from "react";
import { Button, Card, Select } from "../../../../../components/ui";
import {
  setTableData,
  setFilterData,
  getDispatchInvoiceWithPagination,
} from "../store/dataSlice";
import DispatchInvoiceTableSearch from "./DispatchInvoiceTableSearch";
import DispatchInvoiceTableFilter from "./DispatchInvoiceTableFilter";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { HiOutlineFilter } from "react-icons/hi";

const DispatchInvoiceTableTools = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const [customerValues, setCustomerValues] = useState([]);

  const tableData = useSelector(
    (state) => state.pattern_invoice.data.tableData
  );
  const customer = useSelector(
    (state) => state.pattern_invoice.data.customerList
  );

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

  const fetchData = (data) => {
    dispatch(setTableData(data));
    dispatch(getDispatchInvoiceWithPagination(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = 1;
    newTableData.query = "";
    newTableData.customer_id = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ type: "" }));
    fetchData(newTableData);
  };

  const onEdit = (e, type) => {
    const newTableData = cloneDeep(tableData);

    if (type === "customer") {
      setCustomerValues(e);

      console.log("customer", e);
      let customer = e.map((m) => m.value);
      console.log("customer", customer);

      newTableData.customer_id = JSON.stringify(customer);
    }

    dispatch(setTableData(newTableData));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-gray-700">Pattern Invoice List</h3>
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
          {/* <DispatchInvoiceTableFilter /> */}
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
          </div>
        </Card>
      )}
    </>
  );
};

export default DispatchInvoiceTableTools;
