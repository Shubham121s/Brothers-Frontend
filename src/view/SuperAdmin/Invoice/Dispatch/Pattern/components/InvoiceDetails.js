import dayjs from "dayjs";
import React from "react";
import { dispatchList } from "../utils/dispatchList";
const InvoiceDetails = ({ data, location_code }) => {
  const POLists = data?.PatternInvoiceLists?.map((item) =>
    String(item?.Po?.number)
  );
  const POInvoice = Array.from(new Set(POLists));

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
            style={{ fontSize: "13px" }}
          >
            {location_code}
          </h6>
        </div>
      ) : null}
      <div className="h-full flex flex-col ">
        <p className="font-normal  text-gray-500 print:text-xs">
          BUYER ORDER NO
        </p>
        <div className="flex flex-wrap ">
          {POInvoice.map((item, index) => {
            return (
              <div className="flex ml-2" key={item}>
                <p className="text-gray-500 print:text-xs">{index + 1}</p>
                <p className="text-gray-500 print:text-xs">:</p>
                <p className="text-gray-700 print:text-xs">
                  {item}
                  {index === POInvoice.length - 1 ? null : ","}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
