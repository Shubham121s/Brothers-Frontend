import React from "react";
import { injectReducer } from "../../../../store";
import patternInvoiceReducer from "./store";
import { Card } from "../../../../components/ui";
import DispatchInvoiceTableTools from "./components/DispatchInvoiceTableTools";
import DispatchInvoiceTable from "./components/DispatchInvoiceTable";
import InvoiceDialog from "./components/InvoiceDialog";

injectReducer("pattern_invoice", patternInvoiceReducer);

const PatternList = () => {
  return (
    <>
      <DispatchInvoiceTableTools />
      <Card>
        <DispatchInvoiceTable />
        <InvoiceDialog />
      </Card>
    </>
  );
};

export default PatternList;
