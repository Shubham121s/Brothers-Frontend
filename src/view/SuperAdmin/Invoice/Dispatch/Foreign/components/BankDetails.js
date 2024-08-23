import React from "react";

const BankDetails = ({ data }) => {
  return (
    <div className="h-full">
      <div className="flex gap-1 justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          BENEFICIARY NAME
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.beneficiary_name}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">BANK NAME</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.bank_name}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          BANK ACCOUNT NO
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.account_no}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">IFSC CODE</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.ifsc_code}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">SWIFT CODE</p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.swift_code}
        </p>
      </div>
      <div className="flex gap-1  justify-start capitalize">
        <p className="text-gray-700 font-semibold print:text-sm">
          BANK AD CODE
        </p>
        <p className="text-gray-700 print:text-sm">-</p>
        <p className="text-gray-500 font-medium print:text-sm">
          {data?.bank_ad_code}
        </p>
      </div>
    </div>
  );
};

export default BankDetails;
