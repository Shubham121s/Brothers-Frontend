import React, { useRef } from "react";
import { Button } from "../../../../../../components/ui";
import {
  setTableData,
  setFilterData,
  getAllPatterns,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import PatternTableSearch from "./PatternTableSearch";
import PatternTableFilter from "./PatternTableFIlter";
import { toggleNewPatternDialog } from "../store/stateSlice";

const PatternTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector((state) => state.pattern.data.tableData);

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
    dispatch(getAllPatterns(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ status: "" }));
    fetchData(newTableData);
  };

  const onAddPattern = () => {
    dispatch(toggleNewPatternDialog(true));
  };

  return (
    <div className="md:flex items-center justify-end mb-3">
      <div className="md:flex items-center gap-2">
        <PatternTableSearch ref={inputRef} onInputChange={handleInputChange} />
        <PatternTableFilter />
        <div className="flex gap-2">
          <Button size="sm" onClick={onClearAll}>
            Clear All
          </Button>
          <Button size="sm" variant="solid" onClick={onAddPattern}>
            Add Pattern
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatternTableTools;
