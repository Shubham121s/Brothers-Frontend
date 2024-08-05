import React from "react";
import { Button } from "../../../../components/ui";
import { useDispatch } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";
import { HiDownload, HiPlusCircle } from "react-icons/hi";

import BreakdownTableSearch from "./breakdownTableSearch";
const BreakdownTableTool = () => {
  const dispatch = useDispatch();
  const onDialog = () => {
    dispatch(toggleNewDialog(true));
  };
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <BreakdownTableSearch />

      <Button
        onClick={onDialog}
        block
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
      >
        Add Breakdown
      </Button>
    </div>
  );
};

export default BreakdownTableTool;
