import React from "react";
import { Card } from "../../../../../../components/ui";

const CompanyDetails = () => {
  return (
    <div className="h-full">
      <h6 className=" text-gray-600">BROTHERS INDUSTRIES</h6>
      <p className="flex font-medium text-gray-600 print:text-sm flex-wrap mb-1">
        Gat No.882 ,Kirloskarwadi Road, Savantpur,
      </p>
      <p className="flex font-medium text-gray-600 print:text-sm flex-wrap mb-1">
        Tal: Palus, Dist.: Sangli, Pin-416310,
      </p>
      <p className="flex font-medium text-gray-600 print:text-sm flex-wrap mb-1">
        Maharashtra, India
      </p>
      <div className="flex gap-1 items-center print:text-sm">
        <p className="text-gray-700 print:text-sm">Phone:</p>
        (+91)<p> 7588777800, 9764705724</p>
      </div>
      <div className="flex gap-1 items-center print:text-sm">
        <p className="text-gray-700 print:text-sm">Email: </p>
        <p>brothersindustries07@gmail.com</p>
      </div>
      <div className="flex gap-1 items-center print:text-sm">
        <p className="text-gray-700 print:text-sm">Website: </p>
        <p>www.brothers.net.in </p>
      </div>
    </div>
  );
};

export default CompanyDetails;
