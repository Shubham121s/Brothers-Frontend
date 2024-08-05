import React from "react";
import ConsumableItemTable from "./components/consumableItemTable";
import { injectReducer } from "../../../../store";
import consumableItemReducer from "./store";
import ConsumableItemTableTools from "./components/consumableItemTableTools";

injectReducer("consumable_items", consumableItemReducer);

const ConsumableItems = () => {
  return (
    <>
      <div className="flex justify-between mb-2">
        <div></div>
        <ConsumableItemTableTools />
      </div>
      <ConsumableItemTable />
    </>
  );
};
export default ConsumableItems;
