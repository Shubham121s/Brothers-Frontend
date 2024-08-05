import React from "react";
import FinishGoodSearch from "./finishGoodsTableSearch";
import { useDispatch } from "react-redux";

const FinishGoodsTableTools = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <FinishGoodSearch />
    </div>
  );
};

export default FinishGoodsTableTools;
