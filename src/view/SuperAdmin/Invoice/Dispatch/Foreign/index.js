import React, { useEffect, useState, useRef } from "react";
import { apiGetDispatchForeignInvoiceByInvoiceId } from "../../../../../services/SuperAdmin/Invoice/DispatchServices";
import {
  Container,
  DoubleSidedImage,
  Loading,
} from "../../../../../components/shared";
import { Button } from "../../../../../components/ui";

import isEmpty from "lodash/isEmpty";
import DispatchInvoice from "./DispatchInvoice";
import PackingInvoice from "./PackingInvoice";
import TaxInvoice from "./TaxInvoice";
import TaxInvoiceExcel from "../../../Excel/Dispatch/Foreign/TaxInvoice";
import {
  getDispatchInvoiceWithPagination,
  updateStatus,
} from "../../../Dispatch/DispatchList/store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleInvoiceDialog } from "../../../Dispatch/DispatchList/store/stateSlice";

const ForeignInvoice = ({ dispatch_invoice_id, TABLE_ROW_COUNT }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const { pageIndex, pageSize } = useSelector(
    (state) => state.dispatch_invoice.data.tableData
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch_invoice_id]);

  const fetchData = async () => {
    if (dispatch_invoice_id) {
      setLoading(true);
      const response = await apiGetDispatchForeignInvoiceByInvoiceId({
        dispatch_invoice_id,
      });
      if (response?.data?.success) {
        setData(response.data?.data);
      }
      setLoading(false);
    }
  };

  const handleCompleted = async () => {
    try {
      await dispatch(
        updateStatus({
          status: "confirmed",
          dispatch_invoice_id: data?.dispatch_invoice_id,
        })
      );

      dispatch(getDispatchInvoiceWithPagination({ pageIndex, pageSize }));
      dispatch(toggleInvoiceDialog(false));
    } catch (error) {
      console.error("Error in downloading or updating:", error);
    }
  };

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(data) && (
          <>
            <div className="w-full flex gap-4 justify-center">
              <DispatchInvoice data={data} TABLE_ROW_COUNT={TABLE_ROW_COUNT} />
              <PackingInvoice data={data} TABLE_ROW_COUNT={TABLE_ROW_COUNT} />
              <TaxInvoice data={data} TABLE_ROW_COUNT={TABLE_ROW_COUNT} />
              <TaxInvoiceExcel data={data} />

              <Button
                className="bg-white text-orange-500 border border-orange-500"
                onClick={handleCompleted}
              >
                Completed
              </Button>
            </div>
          </>
        )}
      </Loading>
      {!loading && isEmpty(data) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No invoice found!"
          />
          <h3 className="mt-8">No Invoice found!</h3>
        </div>
      )}
    </Container>
  );
};

export default ForeignInvoice;
