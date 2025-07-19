import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Notification,
  Toast,
} from "../../../../../../../components/ui";
import ItemForm from "./ItemForm";
import { toggleAddDispatchItemDialog } from "../../../NewDispatch/store/stateSlice";

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

const NewDispatchItemDialog = (props) => {
  const {
    boxes = [],
    locationIndex,
    setFieldValue,
    dispatchList = [],
    addNewItemInPoList,
  } = props;
  const dispatch = useDispatch();

  const addDispatchItemDialog = useSelector(
    (state) => state.new_foreign_invoice.state.addDispatchItemDialog
  );

  const onDialogClose = () => {
    dispatch(
      toggleAddDispatchItemDialog({ option: false, locationIndex: null })
    );
  };

  const handleNewItem = async (values) => {
    const find = dispatchList[locationIndex]?.poList.find((f) => {
      if (
        f?.Po?.number === values?.Po?.number &&
        f?.PoList?.po_list_id === values?.PoList?.po_list_id
      )
        return f;
    });

    if (find) {
      return pushNotification(
        `PO ${values?.Po?.number} and ${values?.PoList?.Product?.name} Already Added You Can Edit it.`,
        "danger",
        "Error"
      );
    }

    addNewItemInPoList?.(dispatchList, values, locationIndex, setFieldValue);
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
      <ItemForm
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
