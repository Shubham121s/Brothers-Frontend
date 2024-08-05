import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { injectReducer } from "../../../../store/index.js";
import { useDispatch, useSelector } from "react-redux";
import acceptPoReducer from "./store/index.js";
import {
  getAllGRN,
  getPoDetailsByPoId,
  updatePurchaseOrderStatus,
} from "./store/dataSlice.js";
import {
  Container,
  DoubleSidedImage,
  Loading,
  StickyFooter,
} from "../../../../components/shared/index.js";
import { isEmpty } from "lodash";
import PoTable from "./components/PoTable";
import { Button, Card, Tabs } from "../../../../components/ui/index";
import PoDetails from "./components/PoDetails.js";
import { HiOutlinePrinter } from "react-icons/hi";
import { useReactToPrint } from "react-to-print";
import PurchaseOrderInvoice from "../../Invoice/PurchaseOrderInvoice/index.js";

injectReducer("accept_po", acceptPoReducer);
const { TabNav, TabList, TabContent } = Tabs;
const PoAccept = () => {
  const [printLoading, setPrintLoading] = useState(false);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = useSelector((state) => state.accept_po.data.poDetails);
  const loading = useSelector((state) => state.accept_po.data.loading);
  const [POStatus, setPOStatus] = useState(null);
  const [poLoading, setPoLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [POStatus]);

  const fetchData = async () => {
    const po_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (po_id) {
      await dispatch(getPoDetailsByPoId({ purchase_order_id: po_id }));
    }
  };

  const onChangeStatus = async (val) => {
    setPoLoading(true);
    const action = await dispatch(
      updatePurchaseOrderStatus({
        status: val,
        purchase_order_id: initialData.purchase_order_id,
      })
    );
    if (action.payload.status < 300) {
      setPoLoading(false);
      setPOStatus(val);
    } else {
      setPoLoading(false);
    }
  };

  const handleDiscard = () => {
    navigate("/po");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `PurchaseOrder-${initialData?.number}`,
    onAfterPrint: () => {
      setPrintLoading(false);
    },
    onBeforePrint: () => {
      setPrintLoading(true);
    },
  });

  const PoLists = useMemo(() => {
    return initialData?.PurchaseOrderLists;
  }, [initialData]);

  const onInward = () => {
    navigate(`/purchase/order/inward/${initialData.purchase_order_id}`);
  };

  return (
    <>
      <Loading loading={loading}>
        {!isEmpty(initialData) && (
          <>
            <Container className="h-full">
              {/* <h3 className="text-gray-600 text-center mb-1 uppercase">
                POA #{initialData?.poa}
              </h3> */}
              <PoDetails initialData={initialData} />
              <h5 className="mb-3">Purchase Order List</h5>
              <PoTable
                type="edit"
                data={initialData.PurchaseOrderLists}
                currency={initialData.currency_type}
                purchase_order_id={initialData.purchase_order_id}
                category={initialData?.category}
                onDiscard={handleDiscard}
              />

              <div style={{ display: "none" }}>
                <div ref={componentRef}>
                  <PurchaseOrderInvoice data={initialData} PoLists={PoLists} />
                </div>
              </div>
            </Container>

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
                {initialData?.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      variant="solid"
                      color="emerald-500"
                      loading={poLoading}
                      onClick={() => onChangeStatus("accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      color="red-500"
                      loading={poLoading}
                      onClick={() => onChangeStatus("rejected")}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {(initialData.status === "accepted" ||
                  initialData.status === "processing") && (
                  <Button
                    size="sm"
                    variant="solid"
                    color="pink-500"
                    loading={poLoading}
                    onClick={onInward}
                  >
                    Make Inward
                  </Button>
                )}
              </div>
            </StickyFooter>
          </>
        )}
      </Loading>
      {!loading && isEmpty(initialData) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No PO found!"
          />
          <h3 className="mt-8">No PO found!</h3>
        </div>
      )}
    </>
  );
};

export default PoAccept;
