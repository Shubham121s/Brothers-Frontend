import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Toast,
  Notification,
  DatePicker,
} from "../../../../../components/ui";

import { injectReducer } from "../../../../../store";
import EditDispatchForeignReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { getPatternInvoiceDetailsByInvoiceId } from "./store/dataSlice";
import {
  Container,
  DoubleSidedImage,
  Loading,
} from "../../../../../components/shared";
import isEmpty from "lodash/isEmpty";
import { useLocation, useNavigate } from "react-router-dom";
import ItemTable from "./components/ItemList/ItemTable";
import DeleteProductConfirmationDialog from "./components/ItemList/DeleteConfirmationDialog";

import { StickyFooter } from "../../../../../components/shared";
import NewItemDialog from "./components/ItemList/NewItemDialog";
import { toggleAddDispatchItemDialog } from "./store/stateSlice";
import { getAllPosByCustomerId } from "./store/dataSlice";
import { UpdateForeignInvoiceDate } from "../../Foreign/EditDispatch/store/dataSlice";
import dayjs from "dayjs";
import ConsigneeInformationFields from "../EditPattern/components/ConsigneeInformationFields";
import BuyerInformationFields from "../EditPattern/components/BuyerInformationFields";
import ShippingAddressInformationFields from "../EditPattern/components/ShippingAddressInformationFields";
import ShippingDetailsInformationFields from "../EditPattern/components/ShippingDetailsInformationFields";
import EditDispatchItemDialog from "./components/ItemList/EditDispatchItemDialog";

injectReducer("edit_pattern_dispatch", EditDispatchForeignReducer);

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

const EditPatternDispatch = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [EditDate, setEditDate] = useState("");
  const [StateDispatchList, setList] = useState(null);
  const data = useSelector(
    (state) => state.edit_pattern_dispatch.data.invoiceDetails
  );

  console.log("StateDispatchList", StateDispatchList);

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
            pattern_invoice_id: data.pattern_invoice_id,
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
    const pattern_invoice_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (pattern_invoice_id) {
      const action = await dispatch(
        getPatternInvoiceDetailsByInvoiceId({ pattern_invoice_id })
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
    pushNotification(
      "Invoice Date Successfully Updated",
      "success",
      "Successfully Updated"
    );
    navigate("/dispatch-list");
  };

  const addNewItemInPoList = async (dispatchList) => {
    console.log("dispatchList:", dispatchList);
    if (!Array.isArray(dispatchList)) {
      console.error("dispatchList is not an array:", dispatchList);
      return;
    }

    setList((prevData) => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        PatternInvoiceLists: [...dispatchList],
      };
    });
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
                      Consignee & Buyer Information
                    </h5>
                    <p className="mb-2">
                      Section to config consignee & buyer information
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
                  <ConsigneeInformationFields
                    title="Receiver"
                    data={StateDispatchList?.DispatchConsignee}
                    address={
                      StateDispatchList?.DispatchConsignee
                        ?.DispatchConsigneeAddress
                    }
                  />
                  <BuyerInformationFields
                    title="Recipient"
                    data={StateDispatchList?.DispatchBuyer}
                    address={StateDispatchList?.DispatchShippingAddress}
                  />
                </div>
              </Card>
              <Card className="bg-blue-50 h-max">
                <h5 className="font-semibold text-gray-700">
                  Address & Shipping Information
                </h5>
                <p className="mb-2">
                  Section to config address & shipping information
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {/* <InvoiceNumberField /> */}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <ShippingAddressInformationFields
                    data={StateDispatchList?.DispatchShippingAddress}
                  />
                  <ShippingDetailsInformationFields
                    data={StateDispatchList?.DispatchShippingDetail}
                  />
                </div>
              </Card>
            </div>
            <Card className="my-4">
              <div className="flex justify-between items-center h-full mb-2">
                <div>
                  <h5 className="font-semibold text-gray-700">
                    POs Information
                  </h5>
                  <p>Section to config POs list information</p>
                </div>
                <div className="flex gap-2 justify-end items-center h-full">
                  <Button
                    type="button"
                    variant="solid"
                    color="pink-500"
                    size="sm"
                    onClick={() => {
                      dispatch(
                        toggleAddDispatchItemDialog({
                          option: true,
                          locationIndex: null, // No specific index needed
                        })
                      );
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>

              {/* Single Table for All Data */}
              <ItemTable
                initialData={StateDispatchList?.PatternInvoiceLists || []} // Pass all objects
                boxes={StateDispatchList?.DispatchBoxLists}
              />

              {/* Dialogs outside loop */}
              <NewItemDialog
                locationIndex={null} // No index needed since it's a single table
                invoiceId={StateDispatchList?.pattern_invoice_id}
                addNewItemInPoList={addNewItemInPoList}
                dispatchList={StateDispatchList.PatternInvoiceLists}
                fetchData={fetchData}
              />
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

export default EditPatternDispatch;
