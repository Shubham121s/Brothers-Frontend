import React from "react";
import { injectReducer } from "../../../../../store";
import enquiryReducer from "./store";
import EnquiryTable from "./components/EnquiryTable";
import { Card } from "../../../../../components/ui";
import EnquiryTableTools from "./components/EnquiryTableTools";

injectReducer("enquiry", enquiryReducer);

const Enquiry = () => {
  return (
    <>
      <Card className="bg-purple-50">
        <div className="flex items-center justify-between" mb-3>
          <h3>Enquiry List</h3>
          <EnquiryTableTools />
        </div>
        <EnquiryTable />
      </Card>
    </>
  );
};

export default Enquiry;
