import React from "react";

const ConsigneeAndBuyerDetails = ({ title, data, address, shipping }) => {
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
      {title === "Consignee" && (
        <>
          <div className="flex gap-1 justify-start ">
            <p className="text-gray-700 font-semibold print:text-sm uppercase">
              Email
            </p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm ">
              {data?.email}
            </p>
          </div>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-sm">
              Contact Name
            </p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm uppercase">
              {shipping.contact_person}
            </p>
          </div>
          <div className="flex gap-1 justify-start uppercase">
            <p className="text-gray-700 font-semibold print:text-sm">Contact</p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm uppercase">
              {address?.contact_phone || data?.mobile || data?.phone}
            </p>
          </div>
        </>
      )}
      {title === "buyer" && (
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
            <p className="text-gray-700 font-semibold print:text-sm">Contact</p>
            <p className="text-gray-700 print:text-sm">-</p>
            <p className="text-gray-500 font-medium print:text-sm uppercase">
              {address?.contact_phone || data?.mobile || data?.phone}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ConsigneeAndBuyerDetails;
