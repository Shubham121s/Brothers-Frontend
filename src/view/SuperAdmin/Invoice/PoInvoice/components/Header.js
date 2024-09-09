import dayjs from "dayjs";
import React from "react";
import { Card } from "../../../../../components/ui";
const Header = ({ data, className }) => {
  return (
    <div>
      <h3 className="flex justify-center mb-2 text-gray-700">
        ORDER ACCEPTANCE
      </h3>
      <Card className={`${className}`} bodyClass="p-2" style={{border:".1px solid black"}}>
        <div className="grid text-end items-center grid-cols-2">
          <div className="h-full flex justify-start items-center">
            <img
              src="/img/logo/logo.png"
              alt="Company Logo"
              className="col-span-1"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="col-span-1 pb-0">
          <strong className=" text-gray-600">BROTHERS INDUSTRIES</strong>
      <p className="flex font-medium text-gray-600 print:text-xs flex-wrap  uppercase">
        Gat No.882 ,Kirloskarwadi Road, Sawantpur,
      </p>
      <p className="flex font-medium text-gray-600 print:text-xs flex-wrap  uppercase">
        Tal: Palus, Dist.: Sangli, Pin-416310,
      </p>
      <p className="flex font-medium text-gray-600 print:text-xs flex-wrap  uppercase">
        Maharashtra, India
      </p>
      <div className="flex gap-1 items-center print:text-xs uppercase">
        <p className="text-gray-700 print:text-xs uppercase">Phone:</p>
        (+91)<p> 7588777800, 9764705724</p>
      </div>
      <div className="flex gap-1 items-center print:text-xs ">
        <p className="text-gray-700 print:text-xs uppercase">Email: </p>
        <p>brothersindustries07@gmail.com</p>
      </div>
      <div className="flex gap-1 items-center print:text-xs ">
        <p className="text-gray-700 print:text-xs uppercase">Website: </p>
        <p>www.brothers.net.in </p>
      </div>
          </div>
        </div>
      </Card>
      <div className={`grid grid-cols-2 mt-1 gap-1 print:text-xs`}>
        <Card className={`col-span-1${className}`} bodyClass="p-2" style={{border:".1px solid black"}}>
          <p>{data?.Customer?.name}</p>
          <p>{data?.Customer?.CustomerPermanentAddress?.address}, {data?.Customer?.CustomerPermanentAddress?.city}, {data?.Customer?.CustomerPermanentAddress?.zip_code}, {data?.Customer?.CustomerPermanentAddress?.state}, {data?.Customer?.CustomerPermanentAddress?.country}</p>
          
        </Card>
        <Card className={`col-span-1 ${className}`} bodyClass="p-2" style={{border:".1px solid black"}}>
          {/* <p>
            <strong className="capitalize">CODE :</strong>{" "}
            {data?.Customer?.customer_code}
          </p>
          <p className="capitalize">
            <strong>TYPE :</strong> {data?.Customer?.type.toUpperCase()}
          </p> */}
          <strong className="text-gray-700">POA : {data.poa}</strong>
          <p>
            <strong>PO NUMBER :</strong> {data.number}
          </p>
          <p>
            <strong>PO DATE :</strong> {dayjs(data.date).format("DD/MM/YYYY")}
          </p>
          <p className="uppercase">
            <span className="font-semibold">POA DATE :</span>
            <span> </span>
            <span> {dayjs(Date.now()).format("dddd, DD MMMM, YYYY")}</span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Header;
