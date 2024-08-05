import React from "react";
import FinishGoodTable from "./components/finishGoodsTable";
import { injectReducer } from "../../../../store";
import finishGoodsReducer from "./store";
import rawMaterialReducer from "../RawMaterial/store";
import FinishGoodsTableTools from "./components/finishGoodsTableTools";

injectReducer("finish_goods", finishGoodsReducer);
injectReducer("raw_material", rawMaterialReducer);

const FinishGood = () => {
  return (
    <>
      <div className="flex justify-between mb-2">
        <div></div>
        <FinishGoodsTableTools />
      </div>
      <FinishGoodTable />
    </>
  );
};
export default FinishGood;
