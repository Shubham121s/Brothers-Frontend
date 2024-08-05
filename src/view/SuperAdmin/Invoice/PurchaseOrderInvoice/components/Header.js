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
            <p className="text-gray-600">
              BROTHERS INDUSTRIES <br />
              Gat No.882 ,Kirloskarwadi Road, Savantpur, Tal: Palus, Dist.:
              Sangli, Pin-416310,
              <br />
              Maharashtra, India
            </p>
            <p className="text-gray-600">
              Mob : (+91) 7588777800, 9764705724, 99201139101
            </p>
            <p className="text-gray-600">
              E-mail : brothersindustries07@gmail.com{" "}
            </p>
            <p className="text-gray-600">Website : www.brothers.net.in </p>
          </div>
        </div>
      </Card>
      <div className={`grid grid-cols-2 mt-1 gap-1`}>
        <Card className={`col-span-1${className}`} bodyClass="p-2">
          <p>{data?.Customer?.name}</p>
          <p>{data?.Customer?.CustomerPermanentAddress?.address}</p>
          <p>{data?.Customer?.CustomerPermanentAddress?.city}</p>
          <p>{data?.Customer?.CustomerPermanentAddress?.zip_code}</p>
          <p>{data?.Customer?.CustomerPermanentAddress?.state}</p>
          <p>{data?.Customer?.CustomerPermanentAddress?.country}</p>
        </Card>
        <Card className={`col-span-1 ${className}`} bodyClass="p-2">
          {/* <p>
            <strong className="capitalize">CODE :</strong>{" "}
            {data?.Customer?.customer_code}
          </p>
          <p className="capitalize">
            <strong>TYPE :</strong> {data?.Customer?.type.toUpperCase()}
          </p> */}
          <h4 className="text-gray-700">PO : {data.number}</h4>
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
