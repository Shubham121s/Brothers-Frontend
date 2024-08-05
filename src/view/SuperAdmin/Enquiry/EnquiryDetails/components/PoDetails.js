import React from "react";
import { Card } from "../../../../../components/ui";
import dayjs from "dayjs";

const statusColor = {
  delivered: {
    label: "Delivered",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    bgClass: "bg-red-50",
    textClass: "text-red-600",
  },
  processing: {
    label: "Processing",
    bgClass: "bg-yellow-50",
    textClass: "text-yellow-600",
  },
  pending: {
    label: "Pending",
    bgClass: "bg-blue-50",
    textClass: "text-blue-600",
  },
};

const PoDetails = ({ initialData }) => {
  return (
    <div className="grid md:grid-cols-3 gap-2 mb-3">
      <Card className="mt-2 bg-emerald-50">
        <div className="flex justify-between">
          <strong>Customer Name :</strong>{" "}
          <span className="uppercase">
            {initialData[0]?.Enquiry?.Customer?.name || "-"}
          </span>
        </div>
        {/* <div className="flex justify-between">
          <strong>Customer Code :</strong>{" "}
          <span className="uppercase">
            {initialData?.Customer?.customer_code || "-"}
          </span>
        </div> */}
        <div className="flex justify-between">
          <strong>RFQ Number :</strong>{" "}
          <span className="uppercase">
            {initialData[0]?.enquiry?.rfq_number || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <strong>Domestic/Export :</strong>{" "}
          <span className="uppercase">
            {initialData[0]?.Enquiry?.domestic_export || "-"}
          </span>
        </div>
      </Card>
      <Card className="mt-2 bg-pink-50">
        <div className="flex justify-between">
          <strong>ENQ Reference :</strong>{" "}
          <span className="uppercase">
            {initialData[0]?.Enquiry?.enq_ref || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <strong>Email :</strong>{" "}
          <span className="uppercase">
            {initialData[0]?.Enquiry?.buyer_mail || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <strong>Name :</strong>{" "}
          <span className="uppercase">
            {initialData[0]?.Enquiry?.buyer_name || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <strong>mobile :</strong>{" "}
          <span className="uppercase">
            {initialData[0]?.Enquiry?.buyer_mobile || "-"}
          </span>
        </div>
      </Card>
      <Card className={`mt-2 ${statusColor[initialData?.status]?.bgClass}`}>
        <div className="flex justify-between">
          <strong>Inquery Date :</strong>{" "}
          <span>
            {dayjs(initialData[0]?.Enquiry?.enquiry_date).format(
              "DD-MMM-YYYY"
            ) || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <strong>Total Items :</strong>{" "}
          <span>{initialData.length || "-"}</span>
        </div>
      </Card>
    </div>
  );
};

export default PoDetails;
