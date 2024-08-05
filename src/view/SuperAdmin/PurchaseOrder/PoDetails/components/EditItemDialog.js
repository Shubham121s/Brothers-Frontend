import React, { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Dialog,
  FormContainer,
  Notification,
  Toast,
  FormItem,
  Input,
} from "../../../../../components/ui";
import ItemInformationFields from "./ItemInformationFields";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import { toggleEditPoItemDialog } from "../store/stateSlice";
import { isEmpty, cloneDeep } from "lodash";
import dayjs from "dayjs";
import {
  updatePOListByPOListId,
  updatePOListByPOListIdOnQuantityReceived,
  getPoDetailsByPoId,
} from "../store/dataSlice";

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

const statusColor = {
  accepted: {
    label: "Accepted",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  received: {
    label: "Received",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    bgClass: "bg-red-100",
    textClass: "text-red-600",
  },
  pending: {
    label: "Pending",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-600",
  },
};

const EditItemDialog = forwardRef((props, ref) => {
  const { initialData, currency, purchase_order_id } = props;
  const dispatch = useDispatch();

  const [rejectLoading, setRejectLoading] = useState(false);

  const editPoItemDialog = useSelector(
    (state) => state.accept_po.state.editPoItemDialog
  );

  const selectedPoItem = useSelector(
    (state) => state.accept_po.state.selectedPoItem
  );

  const onDialogClose = () => {
    dispatch(toggleEditPoItemDialog(false));
  };

  const handleUpdatePoList = async (
    values,
    setSubmitting,
    quantity = false
  ) => {
    setSubmitting(true);
    const action = quantity
      ? await dispatch(updatePOListByPOListIdOnQuantityReceived(values))
      : await dispatch(updatePOListByPOListId(values));
    setSubmitting(false);
    if (action.payload?.status === 200) {
      onDialogClose();
      return pushNotification(
        action.payload?.data?.message,
        "success",
        "Successfully Updated"
      );
      window.location.reload(false);
    }
    return pushNotification(
      action.payload?.data?.message,
      "danger",
      "Unsuccessfully"
    );
  };

  const handleReject = (values) => {
    const { purchase_order_list_id } = values;
    // if (!accept_description) {
    //   setFieldTouched("accept_description", "Required");
    //   return setFieldError("accept_description", "Required");
    // }
    // if (!accept_delivery_date) {
    //   setFieldTouched("accept_delivery_date", "Required");
    //   return setFieldError("accept_delivery_date", "Required");
    // }
    const newData = {
      purchase_order_id,
      purchase_order_list_id,
      list_status: "rejected",
    };
    handleUpdatePoList(newData, setRejectLoading);
  };

  const handleReceivedQuantity = (values) => {
    const { purchase_order_list_id, received_Quantity, rejected_Quantity } =
      values;
    const newData = {
      purchase_order_id,
      purchase_order_list_id,
      received_quantity: received_Quantity,
      rejected_quantity: rejected_Quantity,
    };
    let accepted_quantity = Math.abs(
      selectedPoItem?.received_quantity - selectedPoItem?.rejected_quantity
    );

    if (accepted_quantity >= selectedPoItem?.quantity) {
      alert("You Have Received The Ordered Quantity Already");
      return false;
    } else if (
      received_Quantity + accepted_quantity >
      selectedPoItem?.quantity
    ) {
      alert(
        `You Have Ordered ${selectedPoItem?.quantity} Quantity And You Have Accepted ${accepted_quantity} quantity , You Cannot Receive ${received_Quantity} Quantity`
      );
      return false;
    } else {
      handleUpdatePoList(newData, setRejectLoading, true);
    }
  };

  return (
    <Dialog
      isOpen={editPoItemDialog}
      width={700}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,
          received_Quantity: "",
          rejected_Quantity: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          const { purchase_order_list_id } = formData;
          const newData = {
            purchase_order_id,
            purchase_order_list_id,
            list_status: "accepted",
          };
          handleUpdatePoList?.(newData, setSubmitting);
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          setFieldError,
          setFieldTouched,
        }) => (
          <Form>
            <FormContainer>
              <h4>Item Details Information</h4>
              <p className="mb-2">Section to config item details information</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {!isEmpty(values) ? (
                  <Card className="mt-2 bg-slate-50">
                    {/* <div className='flex justify-between'><strong>PO Serial No :</strong> <span>{values?.serial_number || '-'}</span></div> */}
                    {/* <div className='flex justify-between'><strong>Project No :</strong> <span>{values?.project_no || '-'}</span></div> */}
                    <div className="flex justify-between">
                      <strong>Product Name :</strong>{" "}
                      <span>{values?.Product?.name || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Item Code :</strong>{" "}
                      <span>{values?.Product?.item_code || "-"}</span>
                    </div>
                    {/* <div className='flex justify-between'><strong>Drawing Revision No :</strong> <span>{`${values?.Product?.drawing_number}-${values?.Drawing?.revision_number}` || '-'}</span></div> */}
                  </Card>
                ) : null}
                {!isEmpty(values) ? (
                  <Card className="mt-2 bg-blue-50">
                    <div className="flex justify-between">
                      <strong>
                        Quantity ({values?.Product?.unit_measurement}):
                      </strong>{" "}
                      <span>{values?.quantity || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Price ({currency}):</strong>{" "}
                      <span>{values?.price || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Amount ({currency}):</strong>{" "}
                      <span>
                        {(values?.price * values?.quantity).toFixed(2) || "-"}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <strong>Delivery Date :</strong>{" "}
                      <span>
                        {dayjs(values?.delivery_date).format("DD-MMM-YYYY") ||
                          "-"}
                      </span>
                    </div> */}
                    {/* <div className="flex justify-between">
                      <strong>Remark :</strong>{" "}
                      <span>{values?.description || "-"}</span>
                    </div> */}
                  </Card>
                ) : null}
              </div>

              <div className="grid md:grid-cols-2 mb-3 gap-2">
                <div className="col-span-1">
                  <Card
                    className={`${statusColor[values?.list_status]?.bgClass}`}
                  >
                    <div className="flex justify-between">
                      <strong>Status :</strong>{" "}
                      {(
                        <span
                          className={`ml-2 font-semibold capitalize ${
                            statusColor[values?.list_status]?.textClass
                          }`}
                        >
                          {statusColor[values?.list_status]?.label}
                        </span>
                      ) || "-"}
                    </div>
                    <div className="flex justify-between">
                      <strong>Received Quantity :</strong>
                      <span className="ml-2">
                        {selectedPoItem?.received_quantity || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Rejected Quantity :</strong>
                      <span className="ml-2">
                        {selectedPoItem?.rejected_quantity || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <strong>Accepted Quantity :</strong>
                      <span className="ml-2">
                        {Math.abs(
                          selectedPoItem?.received_quantity -
                            selectedPoItem?.rejected_quantity
                        )}
                      </span>
                    </div>
                  </Card>
                </div>
                <div className="col-span-1">
                  {(values?.list_status === "accepted" ||
                    values?.list_status === "received") && (
                    <>
                      <FormItem label="" className="mb-1">
                        <Field
                          type="number"
                          autoComplete="off"
                          name="received_Quantity"
                          placeholder="Received Quantity"
                          component={Input}
                        />
                      </FormItem>
                      <FormItem label="" className="">
                        <Field
                          type="number"
                          autoComplete="off"
                          name="rejected_Quantity"
                          placeholder="Reject Quantity"
                          component={Input}
                        />
                      </FormItem>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end px-5 py-2 bg-gray-100 gap-2 rounded-bl-lg rounded-br-lg">
                <Button
                  size="sm"
                  type="button"
                  variant=""
                  onClick={onDialogClose}
                >
                  Discard
                </Button>
                {values?.list_status === "accepted" ||
                values?.list_status === "received" ||
                values?.list_status === "rejected" ? null : (
                  <>
                    <Button
                      disabled={isSubmitting}
                      loading={rejectLoading}
                      size="sm"
                      type="button"
                      variant="solid"
                      color="red-500"
                      onClick={(event) => {
                        event.preventDefault();
                        handleReject(values, setFieldError, setFieldTouched);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      loading={isSubmitting}
                      size="sm"
                      disabled={rejectLoading}
                      variant="solid"
                      color="emerald-500"
                    >
                      Accept
                    </Button>
                  </>
                )}
                {(values?.list_status === "accepted" ||
                  values?.list_status === "received") && (
                  <Button
                    loading={isSubmitting}
                    size="sm"
                    type="button"
                    disabled={rejectLoading}
                    variant="solid"
                    color="blue-500"
                    onClick={(event) => {
                      event.preventDefault();
                      handleReceivedQuantity(values);
                    }}
                  >
                    Update
                  </Button>
                )}
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

EditItemDialog.defaultProps = {
  initialData: {
    currency_type: "",
    quantity: "",
    unit_price: "",
    serial_number: "",
    product: null,
    project_no: "",
    list_status: "",
    received_Quantity: 0,
    rejected_Quantity: 0,
  },
};

export default EditItemDialog;
