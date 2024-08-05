import React from "react";
import ConsumableItemSerach from "./consumableItemTableSearch";
import { useDispatch } from "react-redux";

const ConsumableItemTableTools = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <ConsumableItemSerach />
    </div>
  );
};

export default ConsumableItemTableTools;
