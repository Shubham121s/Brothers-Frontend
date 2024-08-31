import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Notification,
  Toast,
} from "../../../../../../../components/ui";
import { toggleNewBoxDialog } from "../../store/stateSlice";
import BoxForm from "./BoxForm";
import { addBox } from "../../store/dataSlice";

const NewBoxDialog = (props) => {
  const { handleNewBox, boxNo = 1, invoiceId, boxes } = props;
  const dispatch = useDispatch();

  const newBoxDialog = useSelector(
    (state) => state.edit_foreign_dispatch.state.newBoxDialog
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

  const HandleAddNewBox = async (values, setSubmitting) => {
    setSubmitting(true);

    const action = await dispatch(
      addBox({ ...values, box_no: boxNo, dispatch_invoice_id: invoiceId })
    );

    if (action.payload.status === 200) {
      setSubmitting(false);
      pushNotification("Box Successfully Added", "success", "Success");
      let newBox = {
        ...values,
        box_no: action.payload.data?.data?.box_no,
        dispatch_box_list_id: action.payload.data?.data?.dispatch_box_list_id,
      };
      handleNewBox?.(newBox);
      onDialogClose();
    } else {
      pushNotification("Box Not Added", "danger", "Error");
      setSubmitting(false);
    }
  };

  const onDialogClose = () => {
    dispatch(toggleNewBoxDialog(false));
  };

  return (
    <Dialog
      isOpen={newBoxDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <BoxForm
        index={boxNo}
        type="new"
        handleFormSubmit={HandleAddNewBox}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default NewBoxDialog;
