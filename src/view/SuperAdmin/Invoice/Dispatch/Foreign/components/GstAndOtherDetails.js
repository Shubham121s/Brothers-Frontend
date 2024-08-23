import React from "react";

const GstAndOtherDetails = ({ company, shipping }) => {
  return (
    <div className="p-1">
      <div className="flex gap-1 justify-start uppercase mt-2">
        <p className="text-gray-700 font-semibold print:text-sm">IEC CODE</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {company?.iec_code}
        </p>
      </div>
      <div className="flex gap-1  justify-start uppercase">
        <p className="text-gray-700 font-semibold print:text-sm">GSTIN</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {company?.gstin}
        </p>
      </div>
      <div className="flex gap-1  justify-start uppercase">
        <p className="text-gray-700 font-semibold print:text-sm">
          END USE CODE
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {shipping?.end_use_code}
        </p>
      </div>
      <div className="flex gap-1  justify-start uppercase">
        <p className="text-gray-700 font-semibold print:text-sm">PAYMENT</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {shipping?.payment_term}
        </p>
      </div>
    </div>
  );
};

export default GstAndOtherDetails;
