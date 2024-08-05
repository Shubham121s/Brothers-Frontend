import React from "react";
import { Card } from "../../../../../../../components/ui";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const PoSerialNumberInformationFields = (props) => {
  const selectedDispatchItem = useSelector(
    (state) => state.edit_foreign_dispatch.state.selectedDispatchItem
  );

  return (
    <Card className="mt-2 bg-orange-50">
      <div className="flex justify-between">
        <strong>PO Sr. No :</strong>{" "}
        <span>{selectedDispatchItem?.PoList?.serial_number || "-"}</span>
      </div>
      <div className="flex justify-between">
        <strong>PO Del Date :</strong>{" "}
        <span>
          {dayjs(selectedDispatchItem?.PoList?.delivery_date).format(
            "DD-MMM-YYYY"
          ) || "-"}
        </span>
      </div>
      <div className="flex justify-between">
        <strong>Item Co. :</strong>{" "}
        <span>{selectedDispatchItem?.item_code}</span>
      </div>
      <div className="flex justify-between">
        <div>
          <strong>Price :</strong>{" "}
          <span>{selectedDispatchItem?.PoList?.unit_price || "-"}</span>
        </div>
        <div>
          <strong>Qty :</strong>{" "}
          <span>{selectedDispatchItem?.PoList?.quantity || "-"}</span>
        </div>
      </div>
    </Card>
  );
};

export default PoSerialNumberInformationFields;
