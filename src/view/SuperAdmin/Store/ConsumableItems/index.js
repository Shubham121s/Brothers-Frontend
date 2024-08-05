import React from "react";
import { injectReducer } from "../../../../store";
import rawMaterialReducer from "../RawMaterial/store";
import ConsumableItemTableTools from "./components/consumableItemTableTools";
import unusedItemReducer from "./store";
import UnusedItemTable from "./components/unusedItems";

injectReducer("unused_item", unusedItemReducer);
injectReducer("raw_material", rawMaterialReducer);

const UnUsedItems = () => {
  return (
    <>
      <div className="flex justify-between mb-2">
        <div></div>
        <ConsumableItemTableTools />
      </div>
      <UnusedItemTable />
    </>
  );
};
export default UnUsedItems;
