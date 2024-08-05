import React from "react";
import { Button } from "../../../../components/ui";
import { useDispatch } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import { HiDownload, HiPlusCircle } from "react-icons/hi";

import MachineTableSearch from "./machineTableSearch";
const MachineTableTool = () => {
  const dispatch = useDispatch();
  const onDialog = () => {
    dispatch(toggleNewDialog(true));
  };
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <MachineTableSearch />

      <Button
        onClick={onDialog}
        block
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
      >
        Add Machine
      </Button>
    </div>
  );
};

export default MachineTableTool;
