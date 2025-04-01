import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { injectReducer } from "../../../../store/index.js";
import { useDispatch, useSelector } from "react-redux";
import acceptPoReducer from "./store/index.js";
import { getPoDetailsByPoId } from "./store/dataSlice.js";
import {
  Container,
  DoubleSidedImage,
  Loading,
  StickyFooter,
} from "../../../../components/shared/index.js";
import { isEmpty } from "lodash";
import PoTable from "./components/PoTable";
import { Button, Card, Input } from "../../../../components/ui/index";
import PoDetails from "./components/PoDetails.js";
import { HiOutlinePrinter } from "react-icons/hi";
import { useReactToPrint } from "react-to-print";
import POInvoice from "./../../Invoice/PoInvoice";

injectReducer("accept_po", acceptPoReducer);

const PoAccept = () => {
  const [printLoading, setPrintLoading] = useState(false);
  const [rowCount, setRowCount] = useState(8);
  const [changeCount, setChangeCount] = useState(8);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = useSelector((state) => state.accept_po.data.poDetails);
  const loading = useSelector((state) => state.accept_po.data.loading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const po_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (po_id) {
      await dispatch(getPoDetailsByPoId({ po_id }));
    }
  };

  const handleDiscard = () => {
    navigate("/po");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `POA-${initialData?.poa}`,
    onAfterPrint: () => {
      setPrintLoading(false);
    },
    onBeforePrint: () => {
      setPrintLoading(true);
    },
  });

  const PoLists = useMemo(() => {
    return initialData?.PoLists?.filter(
      (list) => list.list_status === "accepted"
    );
  }, [initialData]);

  const handleRowCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRowCount(value);
  };

  const handleChangeCount = (e) => {
    const value = parseInt(e.target.value);
    setChangeCount(value);
  };

  const InvoiceComponent = useMemo(() => {
    return (
      <POInvoice
        data={initialData}
        PoLists={PoLists}
        TABLE_ROW_COUNT={Number(rowCount)}
      />
    );
  }, [initialData, PoLists, rowCount]);

  return (
    <>
      <Loading loading={loading}>
        {!isEmpty(initialData) && (
          <>
            <Container className="h-full">
              <h3 className="text-gray-600 text-center mb-1 uppercase">
                POA {initialData?.poa}
              </h3>
              <PoDetails initialData={initialData} />
              <Card className="bg-slate-50 h-max">
                <h4 className="mb-4">Sale Order List</h4>
                <PoTable
                  type="edit"
                  data={initialData}
                  datas={initialData}
                  currency={initialData.currency_type}
                  po_id={initialData.po_id}
                  onDiscard={handleDiscard}
                />
              </Card>
              <div style={{ display: "none" }}>
                <div ref={componentRef}>{InvoiceComponent}</div>
              </div>
            </Container>
            {PoLists.length > 0 ? (
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-end py-4"
                stickyClass="border-t bg-white border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-end items-center">
                    <p className="mr-1">Products/Page : </p>
                    <Input
                      type="number"
                      value={changeCount}
                      style={{ width: "50px" }}
                      size="sm"
                      onBlur={handleRowCountChange}
                      onChange={handleChangeCount}
                    />
                  </div>
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
            ) : null}
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
