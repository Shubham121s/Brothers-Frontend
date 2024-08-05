import React, { useEffect, useState } from "react";
import { Card } from "../../../../../components/ui";
import ConsigneeAndBuyerDetails from "./components/ConsigneeAndBuyer/ConsigneeAndBuyerDetails";
import ShippingAddress from "./components/ShippingAndShippingAddress/ShippingAddress";
import TransportDetails from "./components/ShippingAndShippingAddress/TransportDetails";
import EditDispatchItemDialog from "./components/ItemList/EditDispatchItemDialog";
import { injectReducer } from "../../../../../store";
import EditDispatchForeignReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { getDomesticInvoiceDetailsByInvoiceId } from "./store/dataSlice";
import {
  Container,
  DoubleSidedImage,
  Loading,
} from "../../../../../components/shared";
import isEmpty from "lodash/isEmpty";
import { useLocation } from "react-router-dom";
import ItemTable from "./components/ItemList/ItemTable";
import DeleteProductConfirmationDialog from "./components/ItemList/DeleteConfirmationDialog";

injectReducer("edit_domestic_dispatch", EditDispatchForeignReducer);

const EditDispatch = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.edit_domestic_dispatch.data.invoiceDetails
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    const dispatch_invoice_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (dispatch_invoice_id) {
      dispatch(getDomesticInvoiceDetailsByInvoiceId({ dispatch_invoice_id }));
    }
  };

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(data) && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-yellow-50">
                <div className="flex justify-between">
                  <span>
                    <h5 className="font-semibold text-gray-700">
                      Receiver & Recipient Information
                    </h5>
                    <p className="mb-2">
                      Section to config receiver & recipient information
                    </p>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <ConsigneeAndBuyerDetails
                    title="Receiver"
                    data={data?.DispatchConsignee}
                    address={data?.DispatchConsignee?.DispatchConsigneeAddress}
                  />
                  <ConsigneeAndBuyerDetails
                    title="Recipient"
                    data={data?.DispatchBuyer}
                    address={data?.DispatchShippingAddress}
                  />
                </div>
              </Card>
              <Card className="bg-blue-50 h-max">
                <h5 className="font-semibold text-gray-700">
                  Shipping & Transport Information
                </h5>
                <p className="mb-2">
                  Section to config shipping & transport information
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <ShippingAddress data={data?.DispatchShippingAddress} />
                  <TransportDetails data={data?.DispatchShippingDetail} />
                </div>
              </Card>
            </div>
            <Card className="my-4">
              {data.DispatchLocations.map((list, index) => {
                return (
                  <div
                    className={
                      data.DispatchLocations.length - 1 === index ? "" : "mb-5"
                    }
                  >
                    <div className="flex justify-between items-center h-full mb-2">
                      {index === 0 ? (
                        <div>
                          <h5 className="font-semibold text-gray-700">
                            POs Information
                          </h5>
                          <p>Section to config POs list information</p>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex gap-2 justify-end items-center h-full">
                        <h2 className="text-gray-500">{list?.location_code}</h2>
                      </div>
                    </div>
                    <ItemTable
                      initialData={list.DispatchLists}
                      boxes={data?.DispatchBoxLists}
                    />
                  </div>
                );
              })}
              <EditDispatchItemDialog
                dispatchList={data.DispatchLocations}
                fetchData={fetchData}
              />
              <DeleteProductConfirmationDialog fetchData={fetchData} />
            </Card>
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

export default EditDispatch;
