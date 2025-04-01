import React from "react";
import { Card } from "../../../../../../components/ui";

const BuyerInformationFields = (props) => {
  const { data, address, title } = props;

  return (
    <Card className="mt-2">
      <h6 className="font-normal text-center text-gray-500 uppercase mb-1">
        {title}
      </h6>
      <h6 className="text-gray-600 font-semibold uppercase">{data?.name}</h6>
      <div className="flex justify-between">
        <strong>Customer Code :</strong>{" "}
        <span>{data?.customer_code || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Vender Code :</strong> <span>{data?.vender_code || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Mobile :</strong> <span>{data?.mobile || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Email :</strong> <span>{data?.email || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>PAN No :</strong> <span>{data?.pan || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>GST No :</strong> <span>{data?.gst_no || "-"}</span>
      </div>
    </Card>
  );
};

export default BuyerInformationFields;
