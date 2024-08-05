import React from "react";
import ItemsTable from "./components/ItemsTable";
import { injectReducer } from "../../../../store";
import itemsReducer from "./store";
import ItemTableTools from "./components/itemTableTools";

injectReducer("items", itemsReducer);

const Items = () => {
  return (
    <>
      <div className="flex justify-between mb-2">
        <div></div>
        <ItemTableTools />
      </div>
      <ItemsTable />
    </>
  );
};
export default Items;
