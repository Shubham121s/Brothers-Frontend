import React from "react";

const PortDetails = ({ data }) => {
  return (
    <div className="h-full">
      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          PRE-CARRIEGE BY
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 print:text-sm">{data?.pre_carriage_by}</p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          PLACE OF RECEIPT
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 print:text-sm">{data?.place_of_receipt}</p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          VESSEL / FLIGHT NO
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 print:text-sm">GNX 200</p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          PORT OF DISCHARGE
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 print:text-sm">{data?.port_of_discharge}</p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">NOTIFY</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 print:text-sm">
          BUYER/APPLICANT MENTIONED ABOVE
        </p>
      </div>
    </div>
  );
};

export default PortDetails;
