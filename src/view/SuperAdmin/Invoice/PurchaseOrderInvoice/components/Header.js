import dayjs from "dayjs";
import React from "react";
import { Card } from "../../../../../components/ui";
const Header = ({ data, className }) => {
  return (
    <div>
      <h3 className="flex justify-center mb-2 text-gray-700">PURCHASE ORDER</h3>
      <Card className={`${className}`} bodyClass="p-2">
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
          <h6 className=" text-gray-600">BROTHERS INDUSTRIES</h6>
      <p className="flex font-medium text-gray-600 print:text-sm flex-wrap mb-1 uppercase">
        Gate No.882 ,Kirloskarwadi Road, Sawantpur,
      </p>
      <p className="flex font-medium text-gray-600 print:text-sm flex-wrap mb-1 uppercase">
        Tal: Palus, Dist.: Sangli, Pin-416310,
      </p>
      <p className="flex font-medium text-gray-600 print:text-sm flex-wrap mb-1 uppercase">
        Maharashtra, India
      </p>
      <div className="flex gap-1 items-center print:text-sm uppercase">
        <p className="text-gray-700 print:text-sm uppercase">Phone:</p>
        (+91)<p> 7588777800, 9764705724</p>
      </div>
      <div className="flex gap-1 items-center print:text-sm ">
        <p className="text-gray-700 print:text-sm uppercase">Email: </p>
        <p>brothersindustries07@gmail.com</p>
      </div>
      <div className="flex gap-1 items-center print:text-sm ">
        <p className="text-gray-700 print:text-sm uppercase">Website: </p>
        <p>www.brothers.net.in </p>
      </div>
          </div>
        </div>
      </Card>
      <div className={`grid grid-cols-2 mt-1 gap-1 print:text-xs`}>
        <Card className={`col-span-1${className}`} bodyClass="p-2">
          <p>{data?.Customer?.name}</p>
          <p>{data?.Customer?.CustomerPermanentAddress?.address}, {data?.Customer?.CustomerPermanentAddress?.city}, {data?.Customer?.CustomerPermanentAddress?.zip_code}, {data?.Customer?.CustomerPermanentAddress?.state}, {data?.Customer?.CustomerPermanentAddress?.country}</p>
        </Card>
        <Card className={`col-span-1 ${className}`} bodyClass="p-2">
          {/* <p>
            <strong className="capitalize">CODE :</strong>{" "}
            {data?.Customer?.customer_code}
          </p>
          <p className="capitalize">
            <strong>TYPE :</strong> {data?.Customer?.type.toUpperCase()}
          </p> */}
          <h6 className="text-gray-700">PO : {data.number}</h6>
          <p>
            <strong>PO NUMBER :</strong> {data.number}
          </p>
          <p>
            <strong>PO DATE :</strong> {dayjs(data.date).format("DD/MM/YYYY")}
          </p>
          <p>
            <span className="font-semibold">PRINT DATE :</span>
            <span> </span>
            <span> {dayjs(Date.now()).format("dddd, DD MMMM, YYYY")}</span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Header;
