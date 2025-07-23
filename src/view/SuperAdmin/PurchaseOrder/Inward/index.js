import React, { useEffect, useState } from "react";
import PrimaryForm from "./components/PrimaryForm";
import InwardTable from "./components/InwardTable";
import { useLocation, useNavigate } from "react-router-dom";
import { injectReducer } from "../../../../store";
import inwardReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewGRN,
  getPoDetailsByPoId,
  postAttachment,
  postInward,
} from "./store/dataSlice";
import { setPurchaseOrderList } from "./store/stateSlice";
import { Button, Notification, Toast } from "../../../../components/ui";
import { StickyFooter } from "../../../../components/shared/index.js";
import FormData from "form-data";

injectReducer("inward", inwardReducer);

const Inward = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [date, setDate] = useState(new Date());

  const initialData = useSelector((state) => state.inward.data.poDetails);
  const PurchaseOrderList = useSelector(
    (state) => state.inward.state.purchaseOrderList
  );
  const billDate = useSelector((state) => state.inward.state.bill_date);
  const billNo = useSelector((state) => state.inward.state.bill_no);
  const ChallanDate = useSelector((state) => state.inward.state.challan_date);
  const ChallanNo = useSelector((state) => state.inward.state.challan_no);
  const newGrn = useSelector((state) => state.inward.data.newGRN);

  const po_id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(getNewGRN());
    const action = await dispatch(
      getPoDetailsByPoId({ purchase_order_id: po_id })
    );
    if (action.payload.status < 300) {
      dispatch(
        setPurchaseOrderList(action.payload?.data?.data?.PurchaseOrderLists)
      );
    }
  };

  const onSave = async (values, setSubmitting) => {
    let missingFields = [];

    if (!date) missingFields.push("Date");
    if (!billNo) missingFields.push("Bill Number");
    if (!billDate) missingFields.push("Bill Date");
    if (!newGrn) missingFields.push("New GRN");

    if (missingFields.length > 0) {
      const missingFieldsMessage = `Missing fields: ${missingFields.join(
        ", "
      )}`;
      setSubmitting(false);
      return Toast.push(
        <Notification title={"Required"} type="danger" duration={2500}>
          {missingFieldsMessage}
        </Notification>,
        {
          placement: "top-end",
        }
      );
    }

    const itemsWithUser = values.map((item) => ({
      ...item,
      added_by_id: user._id || user.user_id,
      added_by: user.name || user.username,
    }));

    const hasEmptyActualQuantity = itemsWithUser.some(
      (item) => !item.actual_quantity || item.actual_quantity === ""
    );
    if (hasEmptyActualQuantity) {
      Toast.push(
        <Notification title="Error" type="danger" duration={2500}>
          Please enter Actual Quantity for all items.
        </Notification>
      );
      setSubmitting(false);
      return;
    }

    const mainAction = await dispatch(
      postInward({
        ...initialData,
        items: itemsWithUser,
        inward_date: date,
        bill_no: billNo,
        bill_date: billDate,
        challan_no: ChallanNo,
        challan_date: ChallanDate,
        inward_no: newGrn,
        added_by_id: user._id || user.user_id,
        added_by: user.name || user.username,
      })
    );

    if (mainAction.payload.status < 300) {
      setSubmitting(false);
      Toast.push(
        <Notification title={"Success"} type="success" duration={2500}>
          Successfully Inwarded
        </Notification>,
        {
          placement: "top-end",
        }
      );
      setSubmitting(false);
      navigate("/purchaseOrder/inward/list");
    } else {
      Toast.push(
        <Notification title={"Error"} type="danger" duration={2500}>
          {mainAction?.payload?.data?.message}
        </Notification>,
        {
          placement: "top-end",
        }
      );
    }
    setSubmitting(false);
  };

  return (
    <>
      <PrimaryForm initialData={initialData} date={date} setDate={setDate} />
      <InwardTable initialData={initialData} handleSubmit={onSave} />
    </>
  );
};

export default Inward;
