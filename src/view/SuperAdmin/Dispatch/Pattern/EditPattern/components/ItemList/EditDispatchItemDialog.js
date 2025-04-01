import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Notification,
  Toast,
} from "../../../../../../../components/ui";
import ItemForm from "./ItemForm";
import { toggleEditDispatchItemDialog } from "../../store/stateSlice";
import {
  updateDispatchListByDispatchListId,
  updatePatternInvoiceById,
} from "../../store/dataSlice";

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

const EditDispatchItemDialog = (props) => {
  const { dispatchList = [], fetchData } = props;
  const dispatch = useDispatch();

  const editDispatchItemDialog = useSelector(
    (state) => state.edit_pattern_dispatch.state.editDispatchItemDialog
  );

  const selectedDispatchItem = useSelector(
    (state) => state.edit_pattern_dispatch.state.selectedDispatchItem
  );

  const onDialogClose = () => {
    dispatch(toggleEditDispatchItemDialog(false));
  };

  const handelFormSubmit = async (values, setSubmitting) => {
    console.log("values", values);
    console.log("clicked");
    setSubmitting(true);
    const action = await dispatch(updatePatternInvoiceById(values));
    setSubmitting(false);
    if (action.payload?.status === 200) {
      pushNotification(
        action?.payload?.data?.message,
        "success",
        "Successfully updated"
      );
      fetchData?.();
      return onDialogClose();
    }
    return pushNotification(
      action?.payload?.data?.message,
      "danger",
      "Unsuccessfully updated"
    );
  };

  return (
    <Dialog
      isOpen={editDispatchItemDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <ItemForm
        initialData={selectedDispatchItem}
        dispatchList={dispatchList}
        handleFormSubmit={handelFormSubmit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default memo(EditDispatchItemDialog);
