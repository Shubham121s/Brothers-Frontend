import React, { useState } from "react";
import { DatePicker, Card } from "../../../../../components/ui";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setInwardDate } from "../store/stateSlice";

const PrimaryForm = ({ initialData, date, setDate }) => {
  const dispatch = useDispatch();

  const handleDatePickerChange = (date) => {
    setDate(date);
    // dispatch(setInwardDate(date));
  };

  return (
    <>
      <div className="grid grid-cols-3 mb-4 gap-4">
        <Card className="mt-2 bg-emerald-50">
          <div className="flex justify-between">
            <strong>Supplier Name :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.name || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Supplier Code :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.customer_code || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Vender Code :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.vender_code || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Type :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.type || "-"}
            </span>
          </div>
        </Card>
        <Card className="mt-2 bg-pink-50">
          <div className="flex justify-between">
            <strong>Mobile :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.mobile || initialData?.Customer?.phone}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Email :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.email || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>PAN No :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.pan || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>GST No :</strong>{" "}
            <span className="uppercase">
              {initialData?.Customer?.gst_no || "-"}
            </span>
          </div>
        </Card>
      </div>
    </>
  );
};

export default PrimaryForm;
