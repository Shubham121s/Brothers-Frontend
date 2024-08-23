import React from "react";

const ConsigneeAndBuyerDetails = ({ title, data, address, state_code }) => {
  return (
    <div className="h-full">
      <h6 className="font-normal text-center text-gray-500 print:text-xs uppercase">
        {title}
      </h6>
      <h6 className="text-gray-700 print:text-xs uppercase">{data?.name}</h6>
      <p className="flex font-medium text-gray-500 print:text-xs flex-wrap uppercase">
        {address?.address}
        {", "}
        {address?.country}
        {", "}
        {address?.zip_code}
      </p>
      {title === "Details of Receiver (Billed To)" ? (
        <>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-xs">Contact</p>
            <p className="text-gray-700 print:text-xs">-</p>
            <p className="text-gray-500 font-medium print:text-xs uppercase">
              {data?.mobile || data?.phone}
            </p>
          </div>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-xs">Phone</p>
            <p className="text-gray-700 print:text-xs">-</p>
            <p className="text-gray-500 font-medium print:text-xs">
              {data?.phone || data?.mobile}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex gap-1  justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-xs">State</p>
              <p className="text-gray-700 print:text-xs">-</p>
              <p className="text-gray-500 font-medium print:text-xs">
                {address?.state}
              </p>
            </div>
            <div className="flex gap-1 justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-xs">
                State code
              </p>
              <p className="text-gray-700 print:text-xs">-</p>
              <p className="text-gray-500 font-medium print:text-xs">
                {address.state_code}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-xs">Contact</p>
            <p className="text-gray-700 print:text-xs">-</p>
            <p className="text-gray-500 font-medium print:text-xs uppercase">
              {address?.contact_person}
            </p>
          </div>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-xs">Phone</p>
            <p className="text-gray-700 print:text-xs">-</p>
            <p className="text-gray-500 font-medium print:text-xs">
              {address.contact_phone || data?.phone || data?.mobile}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex gap-1  justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-xs">State</p>
              <p className="text-gray-700 print:text-xs">-</p>
              <p className="text-gray-500 font-medium print:text-xs">
                {address?.state}
              </p>
            </div>
            <div className="flex gap-1 justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-xs">
                State code
              </p>
              <p className="text-gray-700 print:text-xs">-</p>
              <p className="text-gray-500 font-medium print:text-xs">
                {address.state_code}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConsigneeAndBuyerDetails;
