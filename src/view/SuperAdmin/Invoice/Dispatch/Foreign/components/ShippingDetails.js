import React from "react";

const ShippingDetails = ({ data }) => {
  return (
    <div className="h-full">
      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">FREIGHT</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.freight}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          EXCISE DOCUMENT
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.excise_document}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          SHIPPING TERMS
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.shipping_term}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          SHIPPING LINE
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.shipping_line}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          INSURANCE BY
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.shipping_insurance}
        </p>
      </div>
    </div>
  );
};

export default ShippingDetails;
