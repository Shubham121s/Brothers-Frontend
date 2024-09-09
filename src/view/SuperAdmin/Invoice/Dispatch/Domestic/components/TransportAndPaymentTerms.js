import React from "react";

const TransportAndPaymentTerms = ({ data }) => {
  return (
    <div className="">
      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          TRANSPORT MODE
        </p>
        <p className="text-gray-700 font-semibold print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm uppercase">
          {data?.DispatchShippingAndOtherDetail?.shipping_line}
        </p>
      </div>

      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">VEHICLE NO</p>
        <p className="text-gray-700 font-semibold print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm uppercase">
          {data?.DispatchShippingAndOtherDetail?.vehicle_no}
        </p>
      </div>

      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          PAYMENT TERMS
        </p>
        <p className="text-gray-700 font-semibold print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm uppercase">
          30 days From Date of Invoice
        </p>
      </div>
    </div>
  );
};

export default TransportAndPaymentTerms;
