import dayjs from "dayjs";
import React from "react";

const InvoiceDetails = ({ data, location_code }) => {
  return (
    <div className="h-full">
      <div className="flex gap-1 items-center">
        <p className="text-center text-gray-500 print:text-xs">INVOICE NO</p>
        <p className="text-center text-gray-500 print:text-xs">-</p>
        <h6
          className="text-center text-gray-700 font-semibold"
          style={{ fontSize: "16px" }}
        >
          {data?.invoice_no}
        </h6>
      </div>
      {location_code ? (
        <div className="flex gap-1 items-center" style={{ marginTop: "-5px" }}>
          <p className="font-normal text-center text-gray-500 print:text-xs">
            LOCATION
          </p>
          <p className="text-center text-gray-500 print:text-xs">-</p>
          <h6
            className="text-center text-gray-700 font-semibold"
            style={{ fontSize: "14px" }}
          >
            {location_code}
          </h6>
        </div>
      ) : null}
      <div className="flex gap-1 items-center" style={{ marginTop: "-7px" }}>
        <p className="font-normal text-center text-gray-500 print:text-xs">
          INVOICE DATE
        </p>
        <p className="text-center text-gray-500 print:text-xs">-</p>
        <h6
          className="text-center text-gray-700 font-semibold"
          style={{ fontSize: "12px" }}
        >
          {dayjs().format("DD MMM, YYYY")}
        </h6>
      </div>
      {/* <div className="flex gap-1 items-center" style={{ marginTop: "-5px" }}>
        <p className="font-normal text-center text-gray-500 print:text-xs">
          EWAY BILL NO
        </p>
        <p className="text-center text-gray-500 print:text-xs">-</p>
        <h6
          className="text-center text-gray-700 font-semibold"
          style={{ fontSize: "12px" }}
        >
          {data?.DispatchShippingAndOtherDetail?.e_way_bill_no}
        </h6>
      </div> */}
    </div>
  );
};

export default InvoiceDetails;
