import React, { useEffect, useState } from "react";
import PrimaryForm from "./components/PrimaryForm";
import InwardTable from "./components/InwardTable";
import { useLocation, useNavigate } from "react-router-dom";
import { injectReducer } from "../../../../store";
import inwardReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { getNewGRN, getPoDetailsByPoId, postInward } from "./store/dataSlice";
import { setPurchaseOrderList } from "./store/stateSlice";
import { Button, Notification, Toast } from "../../../../components/ui";
import { StickyFooter } from "../../../../components/shared/index.js";

injectReducer("inward", inwardReducer);

const Inward = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onSave = async () => {
    const action = await dispatch(
      postInward({
        ...initialData,
        items: PurchaseOrderList.filter(
          (f) => f.actual_quantity !== undefined && f.actual_quantity !== 0
        ),
        inward_date: date,
        bill_no: billNo,
        bill_date: billDate,
        challan_no: ChallanNo,
        challan_date: ChallanDate,
        inward_no: newGrn,
      })
    );
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          InWard Details Successfully Added
        </Notification>,
        {
          placement: "top-end",
        }
      );
      navigate("/super/admin/purchaseOrder/inward/list");
    } else {
      Toast.push(
        <Notification title={"Error"} type="danger" duration={2500}>
          {action?.payload?.data?.message}
        </Notification>,
        {
          placement: "top-end",
        }
      );
    }
  };

  return (
    <>
      <PrimaryForm initialData={initialData} date={date} setDate={setDate} />
      <InwardTable initialData={initialData} />

      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-end py-4"
        stickyClass="border-t bg-white border-gray-200"
      >
        <div className="flex items-center gap-4">
          <Button size="sm" variant="solid" onClick={onSave}>
            Save
          </Button>
        </div>
      </StickyFooter>
    </>
  );
};

export default Inward;
