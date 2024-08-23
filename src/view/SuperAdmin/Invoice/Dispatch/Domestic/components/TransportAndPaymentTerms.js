import React from "react";

const TransportAndPaymentTerms = ({ data }) => {
  return (
    <div className="">
      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-xs">
          TRANSPORT MODE
        </p>
        <p className="text-gray-700 font-semibold print:text-xs">-</p>
        <p className="text-gray-500 font-medium print:text-xs uppercase">
          {data?.DispatchShippingAndOtherDetail?.shipping_line}
        </p>
      </div>

      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-xs">VEHICLE NO</p>
        <p className="text-gray-700 font-semibold print:text-xs">-</p>
        <p className="text-gray-500 font-medium print:text-xs uppercase">
          {data?.DispatchShippingAndOtherDetail?.vehicle_no}
        </p>
      </div>

      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-xs">
          PAYMENT TERMS
        </p>
        <p className="text-gray-700 font-semibold print:text-xs">-</p>
        <p className="text-gray-500 font-medium print:text-xs uppercase">
          From Date of Invoice
        </p>
      </div>
    </div>
  );
};

export default TransportAndPaymentTerms;
