import React, { useRef } from "react";
import { Button } from "../../../../../../components/ui";
import { setTableData, getAllEnquiry } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { toggleDrawer } from "../store/stateSlice";
// import EnquiryTableSearch from "./EnquiryTableSearch";

const EnquiryTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector((state) => state.quotation.data.tableData);

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
    dispatch(getAllEnquiry(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    fetchData(newTableData);
  };

  const onDrawer = () => {
    dispatch(toggleDrawer(true));
  };

  return (
    <div className="md:flex items-center justify-end gap-2 mb-4">
      {/* <EnquiryTableSearch ref={inputRef} onInputChange={handleInputChange} /> */}
      {/* <Button size="sm" onClick={onClearAll}>
        Clear All
      </Button> */}
      <Button size="sm" variant="solid" color="purple-600" onClick={onDrawer}>
        Create Quotation
      </Button>
    </div>
  );
};

export default EnquiryTableTools;
