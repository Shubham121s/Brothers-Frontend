import React from "react";

import MachineTable from "./components/machineTable.js";
import { injectReducer } from "../../../store/index.js";
import reducer from "./store";

import MachineTableTool from "./components/machineTableTool.js";
import BreakdownForm from "./components/breakdownForm.js";

injectReducer("machine", reducer);
const Machine = () => {
  return (
    <>
      <div className="flex justify-between gap-4 mb-4">
        <h2>Machine Table</h2>
        <MachineTableTool />
      </div>

      <MachineTable />
    </>
  );
};

export default Machine;
