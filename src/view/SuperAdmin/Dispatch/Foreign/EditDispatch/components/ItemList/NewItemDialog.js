import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Notification,
  Toast,
} from "../../../../../../../components/ui";
import NewItemForm from "./NewItemForm";
import { toggleAddDispatchItemDialog } from "../../store/stateSlice";
import { addProductToInvoice } from "../../store/dataSlice";

const NewDispatchItemDialog = (props) => {
  const {
    boxes = [],
    locationIndex,
    dispatchList = [],
    addNewItemInPoList,
    invoiceId,
  } = props;
  const dispatch = useDispatch();

  const addDispatchItemDialog = useSelector(
    (state) => state.edit_foreign_dispatch.state.addDispatchItemDialog
  );

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

  const onDialogClose = () => {
    dispatch(
      toggleAddDispatchItemDialog({ option: false, locationIndex: null })
    );
  };

  const handleNewItem = async (values, setSubmitting) => {
    setSubmitting(true);

    const find = dispatchList[locationIndex]?.DispatchLists.find((f) => {
      if (
        f?.Po?.number === values?.Po?.number &&
        f?.PoList?.po_list_id === values?.PoList?.po_list_id
      )
        return f;
    });

    if (find) {
      setSubmitting(false);
      return pushNotification(
        `PO ${values?.Po?.number} and ${values?.PoList?.Product?.name} Already Added You Can Edit it.`,
        "danger",
        "Error"
      );
    }

    const box = boxes.find((f) => f.box_no === values.box_no);

    const action = await dispatch(
      addProductToInvoice({
        item: values,
        dispatch_location_id: dispatchList[locationIndex]?.dispatch_location_id,
        dispatch_invoice_id: invoiceId,
        dispatch_box_list_id: box.dispatch_box_list_id,
      })
    );

    if (action.payload.status > 300) {
      setSubmitting(false);
      return pushNotification(
        action?.payload?.data?.message,
        "danger",
        "Error"
      );
    }
    pushNotification("Product Added Successfully", "success", "Successfull");
    const updatedDispatchList = [...dispatchList];

    updatedDispatchList[locationIndex] = {
      ...updatedDispatchList[locationIndex],
      DispatchLists: [
        ...(updatedDispatchList[locationIndex].DispatchLists || []),
        {
          ...values,
          item_name: values?.PoList?.Product?.name,
          item_code: values?.PoList?.Product?.item_code,
          hsn_code: values?.PoList?.Product?.hsn_code,
          product_id: values?.PoList?.Product?.product_id,
          gst_percentage: 0,
          item_quantity: values?.quantity,
          dispatch_list_id: action.payload.data?.data?.dispatch_list_id,
          dispatch_box_id: action.payload.data?.data?.dispatch_box_id,
          item_weight: action.payload.data?.data?.item_weight,
        },
      ],
    };

    addNewItemInPoList?.(updatedDispatchList);
    setSubmitting(false);
    onDialogClose();
  };

  return (
    <Dialog
      isOpen={
        addDispatchItemDialog.option &&
        locationIndex === addDispatchItemDialog.locationIndex
      }
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <NewItemForm
        boxes={boxes}
        type="new"
        dispatchList={dispatchList}
        handleFormSubmit={handleNewItem}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default memo(NewDispatchItemDialog);
