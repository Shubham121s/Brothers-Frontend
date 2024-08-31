import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  Toast,
  Notification,
} from "../../../../../../../components/ui";
import { toggleEditBoxDialog } from "../../store/stateSlice";
import BoxForm from "./BoxForm";
import { updateBox } from "../../store/dataSlice";

const EditBoxDialog = (props) => {
  const { handleEditBoxs, boxNo = 1, boxes } = props;
  const dispatch = useDispatch();

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

  const editBoxDialog = useSelector(
    (state) => state.edit_foreign_dispatch.state.editBoxDialog
  );
  const initialData = useSelector(
    (state) => state.edit_foreign_dispatch.state.selectedBox
  );
  const onDialogClose = () => {
    dispatch(toggleEditBoxDialog(false));
  };

  const handleBoxEdit = async (values, setSubmitting) => {
    setSubmitting(true);
    let newBox = values;
    const action = await dispatch(updateBox({ ...newBox }));

    if (action.payload.status === 200) {
      pushNotification("Box Edited Successfully", "success", "Success");
      setSubmitting(false);
      handleEditBoxs?.(newBox);
      onDialogClose();
    } else {
      pushNotification("Box Not Edited", "danger", "Error");
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={editBoxDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <BoxForm
        index={boxNo}
        type="edit"
        initialData={initialData}
        handleFormSubmit={handleBoxEdit}
        onDiscard={onDialogClose}
      />
    </Dialog>
  );
};

export default EditBoxDialog;
