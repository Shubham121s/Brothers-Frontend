import React from "react";

const ConsigneeAndBuyerDetails = ({
  title,
  data,
  address,
  state_code,
  contactPerson,
}) => {
  return (
    <div className="h-full">
      <h6 className="font-normal text-center text-gray-500 print:text-sm uppercase">
        {title}
      </h6>
      <h6 className="text-gray-700 print:text-sm uppercase">{data?.name}</h6>
      <p className="flex font-medium text-gray-500 print:text-sm flex-wrap uppercase">
        {address?.address}
        {", "}
        {address?.country}
        {", "}
        {address?.zip_code}
      </p>
      {title === "Details of Receiver (Billed To)" ? (
        <>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-sm">
              Contact Name
            </p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm uppercase">
              {contactPerson}
            </p>
          </div>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-sm">Phone</p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm">
              {data?.phone || data?.mobile}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex gap-1  justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-sm">State</p>
              <p className="text-gray-700 print:text-sm">-</p>
              <p className="text-gray-500 font-medium print:text-sm">
                {address?.state}
              </p>
            </div>
            <div className="flex gap-1 justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-sm">
                State code
              </p>
              <p className="text-gray-700 print:text-sm">-</p>
              <p className="text-gray-500 font-medium print:text-sm">
                {address.state_code}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-sm">
              Contact Name
            </p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm uppercase">
              {address?.contact_person}
            </p>
          </div>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-sm">Phone</p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm">
              {address.contact_phone || data?.phone || data?.mobile}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex gap-1  justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-sm">State</p>
              <p className="text-gray-700 print:text-sm">-</p>
              <p className="text-gray-500 font-medium print:text-sm">
                {address?.state}
              </p>
            </div>
            <div className="flex gap-1 justify-start uppercase">
              <p className="text-gray-700 font-semibold print:text-sm">
                State code
              </p>
              <p className="text-gray-700 print:text-sm">-</p>
              <p className="text-gray-500 font-medium print:text-sm">
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
