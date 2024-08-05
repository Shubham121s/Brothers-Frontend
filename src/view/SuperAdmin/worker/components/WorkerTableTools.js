import React from "react";
import WorkerTableSearch from "./WorkerTableSearch";
import WorkerTableFilter from "./WorkerTableFilter";
import { Button } from "../../../../components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";

const WorkerTableTools = () => {
  const dispatch = useDispatch();
  const onAdd = () => {
    dispatch(toggleNewDialog(true));
  };
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <WorkerTableSearch />
      <WorkerTableFilter />
      <Button
        onClick={onAdd}
        variant="solid"
        size="sm"
        icon={<HiPlusCircle className="mr-1" />}
        className="block lg:inline-block md:mb-0 mb-4 h-full"
      >
        Add HR
      </Button>
    </div>
  );
};

export default WorkerTableTools;
