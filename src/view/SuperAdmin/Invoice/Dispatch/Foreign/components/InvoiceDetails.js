import dayjs from "dayjs";
import React from "react";
import { dispatchList } from "../utils/dispatchList";
const InvoiceDetails = ({ data, location_code }) => {
  const POLists = dispatchList(data?.DispatchLocations)?.map((item) =>
    String(item?.Po?.number)
  );
  const POInvoice = Array.from(new Set(POLists));
  // data?.invoice_date
  return (
    <div className="h-full">
      <div
        className="grid grid-cols-2"
        style={{ borderBottom: "1px dashed black" }}
      >
        <div
          className="flex gap-1 items-center"
          style={{ borderRight: "1px dashed black" }}
        >
          <p className="text-center text-gray-500 print:text-xs">INVOICE NO</p>
          <p className="text-center text-gray-500 print:text-xs">-</p>
          <h6
            className="text-center text-gray-700 font-semibold"
            style={{ fontSize: "16px" }}
          >
            {data?.invoice_no}
          </h6>
        </div>
        <div className="flex gap-1 items-center ml-2">
          <p className="font-normal text-center text-gray-500 print:text-xs">
            INVOICE DATE
          </p>
          <p className="text-center text-gray-500 print:text-xs">-</p>
          <h6
            className="text-center text-gray-700 font-semibold uppercase"
            style={{ fontSize: "11px" }}
          >
            {dayjs(data.invoice_date).format("DD MMM, YYYY")}
          </h6>
        </div>
      </div>

      {location_code ? (
        <div
          className="flex gap-1 items-center"
          style={{ marginTop: "-5px", borderBottom: "1px dashed black" }}
        >
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
        <p className="font-normal text-center  text-gray-500 print:text-xs">
          BUYER ORDER NO
        </p>
        <div className="grid grid-cols-4">
          {POInvoice.map((item, index) => {
            return (
              <div className="flex flex-wrap ">
                <div className="flex ml-2" key={item}>
                  <p className="text-gray-500 print:text-xs">{index + 1}</p>
                  <p className="text-gray-500 print:text-xs">:</p>
                  <p className="text-gray-700 print:text-xs">
                    {item}
                    {index === POInvoice.length - 1 ? null : ","}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
