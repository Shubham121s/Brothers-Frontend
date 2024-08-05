import React from "react";
import StockTable from "./components/StockTable";
import StockTableTools from "./components/StockTableTools";
import { injectReducer } from "../../../store";
import stockReducer from "./store";
import { AdaptableCard } from "../../../components/shared";

injectReducer("stock", stockReducer);

const Stock = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Stock</h3>
        <StockTableTools />
      </div>
      <StockTable />
    </AdaptableCard>
  );
};

export default Stock;
