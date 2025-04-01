import React from "react";
import { Card } from "../../../../../../components/ui";

const ShippingDetailsInformationFields = (props) => {
  const { data } = props;
  return (
    <Card className="mt-2">
      <h6 className="font-normal text-center text-gray-500 uppercase mb-1">
        Shipping Address
      </h6>
      <div className="flex justify-between">
        <strong>Place of receipt :</strong>{" "}
        <span>{data?.place_of_receipt || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Port of discharge :</strong>{" "}
        <span>{data?.port_of_discharge || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Port of loading :</strong>{" "}
        <span>{data?.port_of_loading || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Country of goods :</strong>{" "}
        <span>{data?.country_of_goods || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Country of destination :</strong>{" "}
        <span>{data?.country_of_destination || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>Final destination :</strong>{" "}
        <span>{data?.final_destination || "-"}</span>
      </div>
    </Card>
  );
};

export default ShippingDetailsInformationFields;
