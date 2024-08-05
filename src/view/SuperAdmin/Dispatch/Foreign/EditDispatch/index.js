import React, { useEffect, useState } from "react";
import {
  Card,
  DatePicker,
  Toast,
  Notification,
} from "../../../../../components/ui";
import ConsigneeAndBuyerDetails from "./components/ConsigneeAndBuyer/ConsigneeAndBuyerDetails";
import ShippingAddress from "./components/ShippingAndShippingAddress/ShippingAddress";
import ShippingDetails from "./components/ShippingAndShippingAddress/ShippingDetails";
import EditDispatchItemDialog from "./components/ItemList/EditDispatchItemDialog";
import { injectReducer } from "../../../../../store";
import EditDispatchForeignReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import {
  getForeignInvoiceDetailsByInvoiceId,
  UpdateForeignInvoiceDate,
} from "./store/dataSlice";
import {
  Container,
  DoubleSidedImage,
  Loading,
} from "../../../../../components/shared";
import isEmpty from "lodash/isEmpty";
import { useLocation } from "react-router-dom";
import ItemTable from "./components/ItemList/ItemTable";
import DeleteProductConfirmationDialog from "./components/ItemList/DeleteProductConfirmationDialog";
import dayjs from "dayjs";

injectReducer("edit_foreign_dispatch", EditDispatchForeignReducer);

const pushNotification = (message, type, title) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const EditDispatch = () => {
  const [EditDate, setEditDate] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.edit_foreign_dispatch.data.invoiceDetails
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateInvoiceDate = async () => {
      if (EditDate && EditDate !== "Invalid Date") {
        const action = await dispatch(
          UpdateForeignInvoiceDate({
            invoice_date: dayjs(EditDate).format("YYYY-MM-DD"),
            dispatch_invoice_id: data.dispatch_invoice_id,
          })
        );

        if (action.payload.status < 300) {
          pushNotification(
            "Invoice Date Successfully Updated",
            "success",
            "Successfully Updated"
          );
          fetchData();
        } else {
          pushNotification("Invoice Date Not Updated", "danger", "error");
        }
      }
    };

    updateInvoiceDate();
  }, [EditDate]);

  const fetchData = () => {
    const dispatch_invoice_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (dispatch_invoice_id) {
      dispatch(getForeignInvoiceDetailsByInvoiceId({ dispatch_invoice_id }));
    }
  };

  const date = new Date(data.invoice_date);

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
                      Consignee & Buyer Information
                    </h5>
                    <p className="mb-2">
                      Section to config consignee & buyer information
                    </p>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <ConsigneeAndBuyerDetails
                    title="Consignee"
                    data={data?.DispatchConsignee}
                    address={data?.DispatchConsignee?.DispatchConsigneeAddress}
                  />
                  <ConsigneeAndBuyerDetails
                    title="Buyer"
                    data={data?.DispatchBuyer}
                    address={data?.DispatchShippingAddress}
                  />
                </div>
              </Card>
              <Card className="bg-blue-50 h-max">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-semibold text-gray-700">
                      Address & Shipping Information
                    </h5>
                    <p className="mb-2">
                      Section to config address & shipping information
                    </p>
                  </div>
                  <div>
                    <DatePicker
                      style={{ width: "160px" }}
                      placeholder="Invoice Date"
                      value={date}
                      onChange={(date) => {
                        setEditDate(date);
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <ShippingAddress data={data?.DispatchShippingAddress} />
                  <ShippingDetails data={data?.DispatchShippingDetail} />
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
