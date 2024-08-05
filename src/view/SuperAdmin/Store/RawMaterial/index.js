import React from "react";
import RawMaterialTable from "./components/rawMaterialTable";
import { injectReducer } from "../../../../store";
import rawMaterialReducer from "./store";
import unusedItemReducer from "../ConsumableItems/store";
import finishGoodsReducer from "../FinishedGoods/store";
import RawMaterialTableTools from "./components/rawMaterialTableTools";

injectReducer("raw_material", rawMaterialReducer);
injectReducer("unused_item", unusedItemReducer);
injectReducer("finish_goods", finishGoodsReducer);

const RawMaterial = () => {
  return (
    <>
      <div className="flex justify-between mb-2">
        <div></div>
        <RawMaterialTableTools />
      </div>
      <RawMaterialTable />
    </>
  );
};
export default RawMaterial;
