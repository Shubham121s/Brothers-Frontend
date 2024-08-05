import React from "react";
import { Button } from "../../../../components/ui";
import { useDispatch } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import { HiDownload, HiPlusCircle } from "react-icons/hi";

import AnnualTableSearch from "./annualTableSearch";
const AnnualTableTool = () => {
  const dispatch = useDispatch();
  const onDialog = () => {
    dispatch(toggleNewDialog(true));
  };
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <AnnualTableSearch />

      <Button
        onClick={onDialog}
        block
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
      >
        Add Annual Calibration
      </Button>
    </div>
  );
};

export default AnnualTableTool;
