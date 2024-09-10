import React, { useRef } from "react";
import { Button } from "../../../../../../components/ui";
import {
  setTableData,
  setFilterData,
  getAllDrawingsByProductId,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { toggleNewDrawingDialog } from "../store/stateSlice";
import DrawingTableSearch from "./DrawingTableSearch";
import DrawingTableFilter from "./DrawingTableFilter";

const DrawingTableTools = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();

  const tableData = useSelector(
    (state) => state.product_details.data.tableData
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
    dispatch(getAllDrawingsByProductId(data));
  };

  const onClearAll = () => {
    const newTableData = cloneDeep(tableData);
    newTableData.query = "";
    inputRef.current.value = "";
    dispatch(setFilterData({ status: "" }));
    fetchData(newTableData);
  };

  const onAddUser = () => {
    dispatch(toggleNewDrawingDialog(true));
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-gray-700">Drawings</h3>
      <div className="md:flex items-center justify-end gap-2">
        <DrawingTableSearch ref={inputRef} onInputChange={handleInputChange} />
        <DrawingTableFilter />
        <Button size="sm" onClick={onClearAll}>
          Clear All
        </Button>
        <Button size="sm" variant='solid' color="purple-500" onClick={onAddUser}>
                    Add Drawing
                </Button>
      </div>
    </div>
  );
};

export default DrawingTableTools;
