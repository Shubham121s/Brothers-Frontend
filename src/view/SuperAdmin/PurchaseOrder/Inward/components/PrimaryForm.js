import React, { useState } from "react";
import { DatePicker, Card, Input } from "../../../../../components/ui";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setBillDate,
  setBillNo,
  setChallanNo,
  setChallanDate,
} from "../store/stateSlice";

const PrimaryForm = ({ initialData, date, setDate }) => {
  const dispatch = useDispatch();
  const billDate = useSelector((state) => state.inward.state.bill_date);
  const ChallanDate = useSelector((state) => state.inward.state.challan_date);
  const newGrn = useSelector((state) => state.inward.data.newGRN);

  const handleDatePickerChange = (date) => {
    setDate(date);
    // dispatch(setInwardDate(date));
  };

  const handleBillDate = (date) => {
    dispatch(setBillDate(date));
  };

  const handleChallanDate = (date) => {
    dispatch(setChallanDate(date));
  };

  const handleInputChange = (field, value) => {
    if (field === "bill_no") {
      dispatch(setBillNo(value));
    } else if (field === "challan_no") {
      dispatch(setChallanNo(value));
    }
  };

  return (
    <>
      <h4 className="text-center mb-3">PO No: {initialData?.number || "-"}</h4>

      <div className="grid grid-cols-2 mb-4 gap-4">
        <Card className="bg-green-100 ">
          <div className="flex justify-between mb-3">
            <h4 className="">Primary Document Details</h4>
            <h5 className="font-semibold">{newGrn}</h5>
          </div>
          <DatePicker
            placeholder="Inward Date"
            className="mb-2"
            value={date}
            disabled={true}
            onChange={handleDatePickerChange}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Bill No."
              onChange={(e) => handleInputChange("bill_no", e.target.value)}
            />
            <DatePicker
              placeholder="Bill Date"
              value={billDate}
              onChange={handleBillDate}
            />
            <Input
              placeholder="Challan No."
              onChange={(e) => handleInputChange("challan_no", e.target.value)}
            />
            <DatePicker
              placeholder="Challan Date"
              value={ChallanDate}
              onChange={handleChallanDate}
            />
          </div>
        </Card>
        <div>
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
          </Card>
          <Card className="mt-2 bg-pink-50">
            <div className="flex justify-between">
              <strong>Mobile :</strong>{" "}
              <span className="uppercase">
                {initialData?.Customer?.mobile || "-"}
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
      </div>
    </>
  );
};

export default PrimaryForm;
