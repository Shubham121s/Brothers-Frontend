import React, { useRef, useEffect } from "react";
import WorkerTable from "./components/WorkerTable";
import { injectReducer } from "../../../store";
import workerReducer from "./store/index";
import { AdaptableCard } from "../../../components/shared";
import WorkerTableTools from "./components/WorkerTableTools";

injectReducer("worker", workerReducer);

const Worker = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.classList.add("slide-in");
    }
  }, []);

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">HR</h3>
        <WorkerTableTools />
      </div>
      <div ref={tableRef}>
        <WorkerTable />
      </div>
    </AdaptableCard>
  );
};

export default Worker;
