import React from "react";
import { injectReducer } from "../../../../../store";
import quotationReducer from "./store";
import QuotationTable from "./components/QuotationTable";
import { Card } from "../../../../../components/ui";
import QuotationTableTools from "./components/QuotationTableTools";

injectReducer("quotation", quotationReducer);

const Enquiry = () => {
  return (
    <>
      <Card className="bg-purple-50">
        <div className="flex items-center justify-between" mb-3>
          <h3>Quotation List</h3>
          <QuotationTableTools />
        </div>
        <QuotationTable />
      </Card>
    </>
  );
};

export default Enquiry;
