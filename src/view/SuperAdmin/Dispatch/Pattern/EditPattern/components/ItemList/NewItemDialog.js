import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Notification,
  Toast,
} from "../../../../../../../components/ui";
import ItemForm from "./ItemForm";
import { toggleAddDispatchItemDialog } from "../../../EditPattern/store/stateSlice";
import NewItemForm from "./NewItemForm";
import {
  addPatternProductToInvoice,
  addProductToInvoice,
} from "../../store/dataSlice";

const NewDispatchItemDialog = (props) => {
  const {
    locationIndex,
    setFieldValue,
    dispatchList = [],
    addNewItemInPoList,
    invoiceId,
    fetchData,
  } = props;
  const dispatch = useDispatch();

  console.log("addNewItemInPoList", addNewItemInPoList);

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

  const addDispatchItemDialog = useSelector(
    (state) => state.edit_pattern_dispatch.state?.addDispatchItemDialog
  );

  const onDialogClose = () => {
    dispatch(
      toggleAddDispatchItemDialog({ option: false, locationIndex: null })
    );
  };

  console.log("dispatchList", dispatchList);

  const handlevalues = async (values, setSubmitting) => {
    setSubmitting(true);

    const selectedDispatch = dispatchList[locationIndex];

    const isDuplicate =
      selectedDispatch?.Po?.number === values?.Po?.number &&
      selectedDispatch?.PoList?.po_list_id === values?.PoList?.po_list_id;

    if (isDuplicate) {
      setSubmitting(false);
      return pushNotification(
        `PO ${values?.Po?.number} and ${values?.PoList?.Product?.name} Already Added You Can Edit it.`,
        "danger",
        "Error"
      );
    }

    const action = await dispatch(
      addPatternProductToInvoice({
        item: values,
        pattern_invoice_id: invoiceId,
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

    if (
      typeof locationIndex === "number" &&
      updatedDispatchList[locationIndex]
    ) {
      updatedDispatchList[locationIndex] = {
        ...updatedDispatchList[locationIndex],
        DispatchLists: [
          ...(updatedDispatchList[locationIndex].DispatchLists || []),
          {
            ...values,
            pattern_invoice_id: action.payload.data?.data.pattern_invoice_id,
          },
        ],
      };
    } else {
      console.warn("Invalid locationIndex:", locationIndex);
    }


    addNewItemInPoList?.(updatedDispatchList);
    await fetchData();
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
        type="new"
        dispatchList={dispatchList}
        handleFormSubmit={handlevalues}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default memo(NewDispatchItemDialog);
