import React from "react";

import AnnualTable from "./components/annualTable.js";
import { injectReducer } from "../../../store/index.js";
import reducer from "./store";
import AnnualTableTool from "./components/annualTableTool.js";

injectReducer("annual", reducer);
const annual = () => {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-4">
        <h4>Annual Calibration</h4>
        <AnnualTableTool />
      </div>

      <AnnualTable />
    </>
  );
};

export default annual;
