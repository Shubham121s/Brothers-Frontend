import React, { useEffect, useState, useRef } from "react";
import PrimaryForm from "./components/PrimaryForm";
import InwardTable from "./components/InwardTable";
import { useLocation } from "react-router-dom";
import { injectReducer } from "../../../../store";
import inwardReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { getInwardDetailsById } from "./store/dataSlice";
import { setPurchaseOrderList } from "./store/stateSlice";
import { Button } from "../../../../components/ui";
import { StickyFooter } from "../../../../components/shared/index.js";
import { HiOutlinePrinter } from "react-icons/hi";
import GRNInvoice from "./components/GRNInvoice.js";
import { useReactToPrint } from "react-to-print";

injectReducer("grn", inwardReducer);

const Inward = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const initialData = useSelector((state) => state.grn.data.inwardDetails);

  const po_id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const action = await dispatch(getInwardDetailsById({ inward_id: po_id }));
    if (action.payload.status < 300) {
      dispatch(setPurchaseOrderList(action.payload?.data?.data?.InWardDetails));
    }
  };

  const [printLoading, setPrintLoading] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setPrintLoading(false);
    },
    onBeforePrint: () => {
      setPrintLoading(true);
    },
  });

  return (
    <>
      <PrimaryForm initialData={initialData} />
      <InwardTable initialData={initialData} />

      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-end py-4"
        stickyClass="border-t bg-white border-gray-200"
      >
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="solid"
            icon={<HiOutlinePrinter className="mr-1" />}
            onClick={handlePrint}
            loading={printLoading}
          >
            Print
          </Button>
        </div>
      </StickyFooter>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <GRNInvoice initialData={initialData} />
        </div>
      </div>
    </>
  );
};

export default Inward;
