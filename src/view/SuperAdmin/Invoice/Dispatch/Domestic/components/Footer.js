import React from "react";
import BankDetails from "../components/BankDetails";
import Signature from "../components/Signature";
import TransportAndPaymentTerms from "./TransportAndPaymentTerms";
const Footer = ({ data }) => {
  return (
    <>
      <div
        className="grid grid-cols-6 gap-2 mt-2"
        style={{
          borderBottom: "1px dashed black",
          borderTop: "1px dashed black",
        }}
      >
        <div className="col-span-2 h-full p-2">
          <div
            className="h-full flex "
            style={{ borderRight: "1px dashed black" }}
          >
            <TransportAndPaymentTerms data={data} />
          </div>
        </div>
        <div className="col-span-2 h-full p-2">
          <div className="h-full" style={{ borderRight: "1px dashed black" }}>
            <BankDetails data={data?.DispatchBankDetail} />
          </div>
        </div>
        <div className="col-span-2 h-full p-2">
          <div className="h-full">
            <Signature />
          </div>
        </div>
      </div>
      <div
        className="p-2"
        style={{ borderBottom: "1px dashed black" }}
      >
        {/* <div className="col-span-6 h-full p-2">
          <div className="h-full">
            <div className="print:text-sm flex items-center font-medium">
              <span>
                
              </span>
            </div>
          </div>
        </div> */}
        <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
        decleration
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
        we declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
        </p>
      </div>
      </div>
      <div className="flex items-center justify-center print:text-sm">
        <strong className="text-gray-600" style={{ height: "10px" }}>
          ******************
        </strong>
        <strong className="text-gray-600">THIS IS COMPUTER GENERATED INVOICE</strong>
        <strong className="text-gray-600" style={{ height: "10px" }}>
          ******************
        </strong>
      </div>
    </>
  );
};

export default Footer;
