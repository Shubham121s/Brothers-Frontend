import React from "react";
import { injectReducer } from "../../../../store";
import quotationReducer from "./store";
import QuotationTable from "./components/QuotationTable";
import { Card } from "../../../../components/ui";
// import EnquiryTableTools from "./components/EnquiryTableTools";

injectReducer("quotation", quotationReducer);

const Quotation = () => {
  return (
    <>
      <Card className="bg-purple-50">
        {/* <EnquiryTableTools /> */}
        <QuotationTable />
      </Card>
    </>
  );
};

export default Quotation;
