import React, { useRef } from "react";
import { Input } from "../../../../components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import cloneDeep from "lodash/cloneDeep";
import { getAllWorker, setTableData } from "../store/dataSlice";

const WorkerTableSearch = () => {
  const dispatch = useDispatch();

  const searchInput = useRef();

  const tableData = useSelector((state) => state.worker.data.tableData);

  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val) {
    const newTableData = cloneDeep(tableData);
    newTableData.query = val;
    newTableData.pageIndex = 1;
    if (typeof val === "string" && val.length > 1) {
      fetchData(newTableData);
    }

    if (typeof val === "string" && val.length === 0) {
      fetchData(newTableData);
    }
  }

  const fetchData = (data) => {
    dispatch(getAllWorker(data));
    dispatch(setTableData(data));
  };

  const onEdit = (e) => {
    debounceFn(e.target.value);
  };

  return (
    <Input
      ref={searchInput}
      className="max-w-lg md:w-52"
      size="sm"
      placeholder="Search HR"
      prefix={<HiOutlineSearch className="text-lg" />}
      onChange={onEdit}
    />
  );
};

export default WorkerTableSearch;
