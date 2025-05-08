import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Toast,
  Notification,
  DatePicker,
  Input,
} from "../../../../../components/ui";
import ConsigneeAndBuyerDetails from "./components/ConsigneeAndBuyer/ConsigneeAndBuyerDetails";
import ShippingAddress from "./components/ShippingAndShippingAddress/ShippingAddress";
import TransportDetails from "./components/ShippingAndShippingAddress/TransportDetails";
import EditDispatchItemDialog from "./components/ItemList/EditDispatchItemDialog";
import { injectReducer } from "../../../../../store";
import EditDispatchForeignReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToInvoice,
  getDomesticInvoiceDetailsByInvoiceId,
  putDomesticInvoiceDetailsByInvoiceId,
} from "./store/dataSlice";
import {
  Container,
  DoubleSidedImage,
  Loading,
} from "../../../../../components/shared";
import isEmpty from "lodash/isEmpty";
import { useLocation, useNavigate } from "react-router-dom";
import ItemTable from "./components/ItemList/ItemTable";
import DeleteProductConfirmationDialog from "./components/ItemList/DeleteConfirmationDialog";
import PackingChargesInformationField from "./components/GSTAndOther/PackingChargesInformationField";
import { StickyFooter } from "../../../../../components/shared";
import NewItemDialog from "./components/ItemList/NewItemDialog";
import { toggleAddDispatchItemDialog } from "./store/stateSlice";
import { getAllPosByCustomerId } from "./store/dataSlice";
import FrightChargesInformationField from "./components/GSTAndOther/FrightChargesInformationField";
import { UpdateForeignInvoiceDate } from "../../Foreign/EditDispatch/store/dataSlice";
import dayjs from "dayjs";
import OthersChargesInformationField from "./components/GSTAndOther/OthersCharges.InformationField";

injectReducer("edit_domestic_dispatch", EditDispatchForeignReducer);

const pushNotification = (message, type, title) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-end",
    }
  );
};

const EditDispatch = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [EditDate, setEditDate] = useState("");
  const [StateDispatchList, setList] = useState(null);
  const data = useSelector(
    (state) => state.edit_domestic_dispatch.data.invoiceDetails
  );

  console.log("data from somestic invoice", data);

  const [loading, setLoading] = useState(false);

  const [charges, setCharges] = useState(0);
  const [fright, setFright] = useState(0);
  const [other, setOther] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

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

  const date = new Date(data.invoice_date);

  const fetchData = async () => {
    const dispatch_invoice_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (dispatch_invoice_id) {
      const action = await dispatch(
        getDomesticInvoiceDetailsByInvoiceId({ dispatch_invoice_id })
      );

      setCharges(
        action.payload.data.data?.DispatchShippingAndOtherDetail
          ?.packing_charges
          ? action.payload.data.data?.DispatchShippingAndOtherDetail
              ?.packing_charges
          : 0
      );
      setFright(
        action.payload.data.data?.DispatchShippingAndOtherDetail?.fright_charges
          ? action.payload.data.data?.DispatchShippingAndOtherDetail
              ?.fright_charges
          : 0
      );
      setOther(
        action.payload.data.data?.DispatchShippingAndOtherDetail?.other_charges
          ? action.payload.data.data?.DispatchShippingAndOtherDetail
              ?.other_charges
          : 0
      );
      dispatch(
        getAllPosByCustomerId({
          customer_id: action.payload.data.data?.DispatchConsignee?.customer_id,
          currency_type: "INR",
        })
      );
    }
  };

  const UpdateIvoice = () => {
    dispatch(
      putDomesticInvoiceDetailsByInvoiceId({
        dispatch_invoice_id: data.dispatch_invoice_id,
        packing_charges: charges,
        fright_charges: fright,
        other_charges: other,
      })
    );
    navigate("/dispatch-list");
  };

  const addNewItemInPoList = async (dispatchList) => {
    setList((prevData) => ({
      ...prevData,
      DispatchLocations: dispatchList,
    }));
  };

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(StateDispatchList) && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-yellow-50">
                <div className="flex justify-between items-center">
                  <span>
                    <h5 className="font-semibold text-gray-700">
                      Receiver & Recipient Information
                    </h5>
                    <p className="mb-2">
                      Section to config receiver & recipient information
                    </p>
                  </span>
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
                  <ConsigneeAndBuyerDetails
                    title="Receiver"
                    data={StateDispatchList?.DispatchConsignee}
                    address={
                      StateDispatchList?.DispatchConsignee
                        ?.DispatchConsigneeAddress
                    }
                  />
                  <ConsigneeAndBuyerDetails
                    title="Recipient"
                    data={StateDispatchList?.DispatchBuyer}
                    address={StateDispatchList?.DispatchShippingAddress}
                  />
                </div>
              </Card>
              <Card className="bg-blue-50 h-max">
                <div className="flex  justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-700">
                      Address & Shipping Information
                    </h5>
                    <p className="mb-2">
                      Section to config address & shipping information
                    </p>
                  </div>

                  <div className="float-right">
                    <Input
                      type="text"
                      placeholer="Freight Charges"
                      value={data.invoice_no}
                      style={{ width: "160px" }}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <ShippingAddress
                    data={StateDispatchList?.DispatchShippingAddress}
                  />
                  <TransportDetails data={StateDispatchList} />
                  <PackingChargesInformationField
                    setCharges={setCharges}
                    charges={charges}
                  />
                  <FrightChargesInformationField
                    setFright={setFright}
                    fright={fright}
                  />
                  <OthersChargesInformationField
                    setOther={setOther}
                    other={other}
                  />
                </div>
              </Card>
            </div>
            <Card className="my-4">
              {StateDispatchList.DispatchLocations.map((list, index) => {
                console.log("list", list);
                return (
                  <div
                    className={
                      StateDispatchList.DispatchLocations.length - 1 === index
                        ? ""
                        : "mb-5"
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
                        <Button
                          type="button"
                          variant="solid"
                          color="pink-500"
                          size="sm"
                          onClick={() => {
                            dispatch(
                              toggleAddDispatchItemDialog({
                                option: true,
                                locationIndex: index,
                              })
                            );
                          }}
                        >
                          Add Item
                        </Button>
                      </div>
                    </div>
                    <ItemTable
                      initialData={list.DispatchLists}
                      boxes={StateDispatchList?.DispatchBoxLists}
                    />
                    <NewItemDialog
                      locationIndex={index}
                      invoiceId={StateDispatchList?.dispatch_invoice_id}
                      addNewItemInPoList={addNewItemInPoList}
                      dispatchList={StateDispatchList.DispatchLocations}
                    />
                  </div>
                );
              })}
              <EditDispatchItemDialog
                dispatchList={StateDispatchList.DispatchLocations}
                fetchData={fetchData}
              />
              <DeleteProductConfirmationDialog fetchData={fetchData} />
            </Card>
            <StickyFooter
              className="-mx-8 px-8 flex items-center justify-end p-3"
              stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="md:flex items-center">
                <Button
                  variant="solid"
                  // icon={<AiOutlineSave className='mr-1' />}
                  onClick={UpdateIvoice}
                >
                  Update
                </Button>
              </div>
            </StickyFooter>
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
