import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteBoxDialog } from "../../store/stateSlice";
import { Notification, Toast } from "../../../../../../../components/ui";
import { deleteBox } from "../../store/dataSlice";
import { ConfirmDialog } from "../../../../../../../components/shared";

const pushNotification = (title, type, message) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const DeleteBoxConfirmationDialog = ({ fetchData }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedBox = useSelector(
    (state) => state.edit_foreign_dispatch.state.selectedBox
  );
  const deleteDispatchBoxDialog = useSelector(
    (state) => state.edit_foreign_dispatch.state.deleteBoxDialog
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteBoxDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteBox({
        dispatch_box_list_id: selectedBox?.dispatch_box_list_id,
      })
    );
    setLoading(false);
    if (action.payload?.status === 200) {
      pushNotification(
        "Successfully Deleted",
        "success",
        action.payload?.data?.message
      );
      fetchData?.();
      return onDialogClose();
    } else {
      return pushNotification(
        "Unsuccessfully",
        "danger",
        action.payload?.data?.message
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={deleteDispatchBoxDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete Box"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Box? This action cannot be undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeleteBoxConfirmationDialog;
