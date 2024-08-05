import React from "react";
import { dispatchList } from "../utils/dispatchList";
import dayjs from "dayjs";

const PoDetails = ({ data }) => {
  return (
    <>
      <div className="flex gap-1 items-center" style={{ marginTop: "-7px" }}>
        <p className="font-normal text-center text-gray-500 print:text-xs">
          INVOICE DATE
        </p>
        <p className="text-center text-gray-500 print:text-xs">-</p>
        <h6
          className="text-center text-gray-700 font-semibold"
          style={{ fontSize: "11px" }}
        >
          {dayjs(data?.invoice_date).format("DD MMM, YYYY")}
        </h6>
      </div>
    </>
  );
};

export default PoDetails;
