import React from "react";
import ConditionTable from "./components/ConditionTable";
import { injectReducer } from "../../../../../store";
import poConditionReducer from "./store";
import ConditionTableTools from "./components/ConditionTableTools";

injectReducer("condition", poConditionReducer);
const Condition = () => {
  return (
    <>
      <ConditionTableTools />
      <ConditionTable />
      {/* <CategoryNewFormDialog /> */}
    </>
  );
};

export default Condition;
