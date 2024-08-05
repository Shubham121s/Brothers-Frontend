import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Input,
  DatePicker,
  Select,
} from "../../../../components/ui";
import {
  setTableData,
  getAllPoLists,
  getAllPoNumber,
  getAllProjectNumber,
  getAllSerialNumber,
  getPODates,
  getPODeliveryDates,
  getBrotherDeliveryDate,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import PoListTableSearch from "./PoListSearch";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";

const dateFormat = "MMM DD, YYYY";

const PoListTableTools = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.poList.data.tableData);
  const CustomerOption = useSelector((state) => state.poList.data.customers);
  const materialGradeOption = useSelector(
    (state) => state.poList.data.materialGrades
  );
  const itemCodeOption = useSelector((state) => state.poList.data.itemCodes);
  const productOption = useSelector((state) => state.poList.data.products);
  const RevisionOption = useSelector((state) => state.poList.data.revision);
  const projectNumbers = useSelector(
    (state) => state.poList.data.projectNumber
  );
  const PoNumber = useSelector((state) => state.poList.data.poNumber);
  const serialNumber = useSelector((state) => state.poList.data.serialNumber);
  const PoDates = useSelector((state) => state.poList.data.poDates);
  const PoDeliveryDates = useSelector(
    (state) => state.poList.data.poDeliverydate
  );
  const brotherDeliveryDate = useSelector(
    (state) => state.poList.data.brotherDeliveryDate
  );
  const rawDates = useSelector((state) => state.poList.data.rawDates);
  const machiningDate = useSelector((state) => state.poList.data.machiningDate);

  const {
    po_Date,
    po_del_Date,
    brother_Date,
    customer,
    project_no,
    po_no,
    po_serial_no,
    product,
    item_code,
    revision_no,
    material_grade,
    raw_date,
    machining_date,
  } = useSelector((state) => state.poList.data.tableData);

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.customer = "";
    newTableData.project_no = "";
    newTableData.po_serial_no = "";
    newTableData.product = "";
    newTableData.item_code = "";
    newTableData.revision_no = "";
    newTableData.material_grade = "";
    newTableData.po_no = "";
    newTableData.po_Date = "";
    newTableData.po_del_Date = "";
    newTableData.brother_Date = "";
    newTableData.raw_date = "";
    newTableData.machining_date = "";

    fetchData(newTableData);
  };

  const searchInput = useRef();

  const debounceFn = debounce((val, type) => handleDebounceFn(val, type), 50);

  function handleDebounceFn(val, type) {
    const newTableData = cloneDeep(tableData);
    if (type === "customer") {
      newTableData.customer = val;
    } else if (type === "project_no") {
      newTableData.project_no = val;
    } else if (type === "po_serial_no") {
      newTableData.po_serial_no = val;
    } else if (type === "product_name") {
      newTableData.product = val;
    } else if (type === "item_code") {
      newTableData.item_code = val;
    } else if (type === "revision_number") {
      newTableData.revision_no = val;
    } else if (type === "material_grade") {
      newTableData.material_grade = val;
    } else if (type === "po_number") {
      newTableData.po_no = val;
    } else if (type === "po_date") {
      newTableData.po_Date = val;
    } else if (type === "brothers_date") {
      newTableData.brother_Date = val;
    } else if (type === "po_del_date") {
      newTableData.po_del_Date = val;
    } else if (type === "raw_date") {
      newTableData.raw_date = val;
    } else if (type === "machining_date") {
      newTableData.machining_date = val;
    }

    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length >= 1) {
      fetchData(newTableData);
    }

    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  }

  const fetchData = (data) => {
    dispatch(setTableData(data));
    dispatch(getAllPoLists(data));
  };

  const onEdit = (e, type) => {
    if (type === "customer") {
      dispatch(getAllPoNumber({ customer_id: e.value }));
      dispatch(getPODates({ customer_id: e.value }));
      dispatch(getPODeliveryDates({ customer_id: e.value }));
      dispatch(getBrotherDeliveryDate({ customer_id: e.value }));
      debounceFn(e.value, type);
    } else if (type === "material_grade") {
      debounceFn(e.value, type);
    } else if (type === "item_code") {
      debounceFn(e.value, type);
    } else if (type === "product_name") {
      debounceFn(e.value, type);
    } else if (type === "revision_number") {
      debounceFn(e.value, type);
    } else if (type === "project_no") {
      debounceFn(e.value, type);
    } else if (type === "po_number") {
      dispatch(getAllProjectNumber({ number: e.value }));
      dispatch(getAllSerialNumber({ number: e.value }));
      debounceFn(e.value, type);
    } else if (type === "po_serial_no") {
      debounceFn(e.value, type);
    } else if (type === "po_date") {
      debounceFn(e.value, type);
    } else if (type === "po_del_date") {
      debounceFn(e.value, type);
    } else if (type === "brothers_date") {
      debounceFn(e.value, type);
    } else if (type === "raw_date") {
      debounceFn(e.value, type);
    } else if (type === "machining_date") {
      debounceFn(e.value, type);
    } else {
      debounceFn(e.targert.value, type);
    }
  };

  const handleDateChange = (value, type) => {
    const newTableData = cloneDeep(tableData);
    if (type === "po_date") {
      newTableData.po_Date = value;
    } else if (type === "po_del_date") {
      newTableData.po_del_Date = value;
    } else if (type === "brothers_date") {
      newTableData.brother_Date = value;
    } else if (type === "raw_date") {
      newTableData.raw_date = value;
    } else if (type === "machining_date") {
      newTableData.machining_date = value;
    }
    fetchData(newTableData);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3>Master Product Planner</h3>
        <div className="flex gap-4">
          <Button
            size="sm"
            icon={<HiOutlineFilter />}
            onClick={() => setOpen(() => !open)}
          >
            Filter
          </Button>
          {/* <PoListTableSearch ref={inputRef} onInputChange={handleInputChange} /> */}
          <Button size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </div>
      {open && (
        <Card className="mb-4">
          <div className="grid grid-cols-5 gap-2">
            <Select
              options={CustomerOption}
              value={CustomerOption.filter(
                (currency) => currency.value === customer
              )}
              placeholder="Select Customer"
              onChange={(e) => onEdit(e, "customer")}
              size="sm"
            />
            {/* <Input
              ref={searchInput}
              className=""
              size="sm"
              placeholder="Project No."
              value={project_no}
              prefix={<HiOutlineSearch className="text-lg" />}
              onChange={(e) => onEdit(e, "project_no")}
            /> */}
            <Select
              options={PoNumber}
              value={PoNumber?.filter((currency) => currency.value === po_no)}
              placeholder="Select Po Number"
              onChange={(e) => onEdit(e, "po_number")}
              size="sm"
            />
            <Select
              options={projectNumbers}
              value={projectNumbers?.filter(
                (currency) => currency.value === project_no
              )}
              placeholder="Select Project Number"
              onChange={(e) => onEdit(e, "project_no")}
              size="sm"
            />
            {/* <Input
              ref={searchInput}
              className=""
              size="sm"
              placeholder="Po No."
              value={po_no}
              prefix={<HiOutlineSearch className="text-lg" />}
              onChange={(e) => onEdit(e, "po_number")}
            /> */}
            {/* <Input
              ref={searchInput}
              className=""
              size="sm"
              placeholder="Po Serial Number"
              value={po_serial_no}
              prefix={<HiOutlineSearch className="text-lg" />}
              onChange={(e) => onEdit(e, "po_serial_no")}
            /> */}
            <Select
              options={serialNumber}
              value={serialNumber?.filter(
                (currency) => currency.value === po_serial_no
              )}
              placeholder="Select Serial Number"
              onChange={(e) => onEdit(e, "po_serial_no")}
              size="sm"
            />
            <Select
              options={productOption}
              value={productOption.filter(
                (currency) => currency.value === product
              )}
              onChange={(e) => onEdit(e, "product_name")}
              placeholder="Select Product"
              size="sm"
            />

            <Select
              options={itemCodeOption}
              value={itemCodeOption.filter(
                (currency) => currency.value === item_code
              )}
              placeholder="Select Item Code"
              onChange={(e) => onEdit(e, "item_code")}
              size="sm"
            />
            <Select
              options={RevisionOption}
              value={RevisionOption.filter(
                (currency) => currency.value === revision_no
              )}
              onChange={(e) => onEdit(e, "revision_number")}
              placeholder="Select Revision Number"
              size="sm"
            />

            <Select
              options={materialGradeOption}
              value={materialGradeOption.filter(
                (currency) => currency.value === material_grade
              )}
              onChange={(e) => onEdit(e, "material_grade")}
              placeholder="Select Material Grade"
              size="sm"
            />
            <Select
              options={PoDates}
              value={PoDates.filter((currency) => currency.value === po_Date)}
              onChange={(e) => onEdit(e, "po_date")}
              placeholder="Select PO Date"
              size="sm"
            />
            {/* <DatePicker
              ref={searchInput}
              value={po_Date}
              onChange={(value) => {
                console.log(value);
                handleDateChange(value, "po_date");
              }}
              disableDate={disableCertainDate}
              inputFormat={dateFormat}
              size="sm"
              placeholder="PO Date"
            /> */}
            <Select
              options={PoDeliveryDates}
              value={PoDeliveryDates.filter(
                (currency) => currency.value === po_del_Date
              )}
              onChange={(e) => onEdit(e, "po_del_date")}
              placeholder="Select Po Delivery Date"
              size="sm"
            />
            {/* <DatePicker
              ref={searchInput}
              value={po_del_Date}
              onChange={(value) => handleDateChange(value, "po_del_date")}
              inputFormat={dateFormat}
              size="sm"
              placeholder="PO Delivery Date"
            /> */}
            <Select
              options={brotherDeliveryDate}
              value={brotherDeliveryDate?.filter(
                (currency) => currency.value === brother_Date
              )}
              onChange={(e) => onEdit(e, "brothers_date")}
              placeholder="Select Brother Date"
              size="sm"
            />
            {/* <DatePicker
              ref={searchInput}
              value={brother_Date}
              onChange={(value) => handleDateChange(value, "brothers_date")}
              inputFormat={dateFormat}
              size="sm"
              placeholder="Brothers Delivery Date"
            /> */}
            <Select
              options={rawDates}
              value={rawDates?.filter(
                (currency) => currency.value === raw_date
              )}
              onChange={(e) => onEdit(e, "raw_date")}
              placeholder="Select Raw Date"
              size="sm"
            />
            {/* <DatePicker
              ref={searchInput}
              value={raw_date}
              onChange={(value) => handleDateChange(value, "raw_date")}
              inputFormat={dateFormat}
              size="sm"
              placeholder="Raw Date"
            /> */}
            <Select
              options={machiningDate}
              value={machiningDate?.filter(
                (currency) => currency.value === machining_date
              )}
              onChange={(e) => onEdit(e, "machining_date")}
              placeholder="Select Machining Date"
              size="sm"
            />
            {/* <DatePicker
              ref={searchInput}
              value={machining_date}
              onChange={(value) => handleDateChange(value, "machining_date")}
              inputFormat={dateFormat}
              size="sm"
              placeholder="Machining Date"
            /> */}
          </div>
        </Card>
      )}
    </>
  );
};

export default PoListTableTools;
