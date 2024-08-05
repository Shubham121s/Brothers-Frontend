import React, { useEffect, useMemo, useRef, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { injectReducer } from "../../../../store/index.js";
import { useDispatch, useSelector } from "react-redux";
import quotaionDetailReducer from "./store/index.js";
import {
  UpdateQuotationStatus,
  getEnquiryDetailsByEnquiryId,
  getQutotaionDetailsByQuotationId,
  updateQuotationById,
} from "./store/dataSlice.js";
import {
  Container,
  DoubleSidedImage,
  Loading,
  StickyFooter,
} from "../../../../components/shared/index.js";
import { isEmpty } from "lodash";
import {
  Button,
  Card,
  Toast,
  Notification,
} from "../../../../components/ui/index";
// import PoDetails from "./components/PoDetails.js";
import QuotationTable from "./components/QuotationItemList.js";
import { useReactToPrint } from "react-to-print";
import { AiOutlineSave } from "react-icons/ai";
// import SelectedProductTble from "./components/SelectedProductTble.js";
import QuotationInvoice from "./components/QuotationInvoice.js";
import { HiOutlinePrinter } from "react-icons/hi";
import QuotationDetail from "./components/QuotationDetail.js";

injectReducer("quotation_detail", quotaionDetailReducer);

const QuotationDetails = () => {
  const [printLoading, setPrintLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = useSelector(
    (state) => state.quotation_detail.data.quotationDetails
  );
  const loading = useSelector((state) => state.quotation_detail.data.loading);

  const data = useSelector(
    (state) => state.quotation_detail.state.quotationList
  );

  const popNotification = (keyword, type, message) => {
    Toast.push(
      <Notification title={keyword} type={type} duration={2500}>
        {message}
      </Notification>,
      {
        placement: "top-end",
      }
    );
  };

  const data1 = useMemo(() => {
    const result = {
      circle: [],
      ring: [],
      square: [],
      profile: [],
      fabrication: [],
    };

    data?.forEach((m) => {
      if (m.part_type === "CIRCLE") {
        result.circle.push(m);
      } else if (m.part_type === "RING") {
        result.ring.push(m);
      } else if (m.part_type === "SQUARE") {
        result.square.push(m);
      } else if (m.part_type === "PROFILE DRAWING") {
        result.profile.push(m);
      } else if (m.part_type === "FABRICATION DRAWING") {
        result.fabrication.push(m);
      }
    });

    result.circle = JSON.stringify(result.circle);
    result.ring = JSON.stringify(result.ring);
    result.square = JSON.stringify(result.square);
    result.profile = JSON.stringify(result.profile);
    result.fabrication = JSON.stringify(result.fabrication);

    return result;
  }, [data]);

  const onNavigate = async () => {
    if (initialData.status === "PENDING") {
      dispatch(
        updateQuotationById({
          quotation_id: initialData.quotation_id,
          ...data1[0],
        })
      );
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const quotation_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (quotation_id) {
      await dispatch(getQutotaionDetailsByQuotationId({ quotation_id }));
    }
  };

  const handleDiscard = () => {
    navigate("/super/admin/quotation");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setPrintLoading(false);
    },
    onBeforePrint: () => {
      setPrintLoading(true);
    },
  });

  const onQuotationStatus = async (val) => {
    const quotation_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    setStatusLoading(true);
    const action = await dispatch(
      UpdateQuotationStatus({
        status: val,
        quotation_id: quotation_id,
        enquiry_id: initialData.enquiry_id,
      })
    );
    if (action.payload.status < 300) {
      popNotification("Success", "success", "Quotation Accepted Successfully");
      setStatusLoading(false);
      await dispatch(getQutotaionDetailsByQuotationId({ quotation_id }));
    } else {
      popNotification("Error", "danger", "Something Went Wrong");
    }
  };

  // const PoLists = useMemo(() => {
  //   return initialData?.PoLists?.filter(
  //     (list) => list.list_status === "accepted"
  //   );
  // }, [initialData]);

  return (
    <>
      <Loading loading={loading}>
        {!isEmpty(initialData) && (
          <>
            <Container className="h-full">
              {/* <h3 className="text-gray-600 text-center mb-1 uppercase">
                POA {initialData?.poa}
              </h3> */}
              <QuotationDetail initialData={initialData} />
              <Card className="bg-slate-50 h-max">
                <h4 className="mb-4">Quotation Item List</h4>
                <QuotationTable initialData={initialData} />
              </Card>
              {/* <div style={{ display: "none" }}>
                <div ref={componentRef}>
                  <POInvoice data={initialData} PoLists={PoLists} />
                </div>
              </div> */}
              <div style={{ display: "none" }}>
                <div ref={componentRef}>
                  <QuotationInvoice />
                </div>
              </div>
            </Container>
            {/* {PoLists.length > 0 ? (
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
            ) : null} */}
          </>
        )}
        <StickyFooter
          className="-mx-8 px-8 flex items-center justify-end py-4"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="md:flex items-center">
            <Button
              size="sm"
              className="mr-3"
              onClick={handleDiscard}
              type="button"
            >
              Discard
            </Button>
            <Button
              size="sm"
              variant="solid"
              icon={<HiOutlinePrinter className="mr-1" />}
              className="mr-3"
              onClick={handlePrint}
              loading={printLoading}
            >
              Print
            </Button>
            {initialData.status === "PENDING" && (
              <>
                <Button
                  size="sm"
                  className="mr-3"
                  type="button"
                  variant="solid"
                  color="emerald-500"
                  loading={statusLoading}
                  onClick={() => onQuotationStatus("ACCEPTED")}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  className="mr-3"
                  type="button"
                  variant="solid"
                  color="red-500"
                  onClick={() => onQuotationStatus("REJECTED")}
                  loading={statusLoading}
                >
                  Reject
                </Button>
              </>
            )}
            {initialData.status === "PENDING" && (
              <Button
                size="sm"
                variant="solid"
                icon={<AiOutlineSave className="mr-1" />}
                onClick={onNavigate}
                type="button"
              >
                Save
              </Button>
            )}
          </div>
        </StickyFooter>
      </Loading>
      {!loading && isEmpty(initialData) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No PO found!"
          />
          <h3 className="mt-8">No Enquiry found!</h3>
        </div>
      )}
    </>
  );
};

export default QuotationDetails;
