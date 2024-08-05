import React from "react";
import BreakdownTable from "./components/breakdownTable.js";
import { injectReducer } from "../../../store/index.js";
import reducer from "./store";

import BreakdownTableTool from "./components/breakdownTableTool.js";

injectReducer("breakdown", reducer);
const breakdown = () => {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-4">
        <h4>Breakdown Table</h4>
        <BreakdownTableTool />
      </div>

      <BreakdownTable />
    </>
  );
};

export default breakdown;
