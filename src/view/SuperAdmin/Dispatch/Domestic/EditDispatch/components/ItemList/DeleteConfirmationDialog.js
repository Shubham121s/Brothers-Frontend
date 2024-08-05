import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglDeleteConfirmationDialog } from "../../store/stateSlice";
import { Notification, Toast } from "../../../../../../../components/ui";
import { deleteDispatchListByDispatchListId } from "../../store/dataSlice";
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

const DeleteProductConfirmationDialog = ({ fetchData }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedDispatch = useSelector(
    (state) => state.edit_domestic_dispatch.state.selectedDispatchItem
  );
  const deleteDispatchProductDialog = useSelector(
    (state) => state.edit_domestic_dispatch.state.deleteConfirmation
  );

  const onDialogClose = () => {
    dispatch(togglDeleteConfirmationDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteDispatchListByDispatchListId({
        dispatch_list_id: selectedDispatch?.dispatch_list_id,
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
      isOpen={deleteDispatchProductDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete Drawing"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Product? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeleteProductConfirmationDialog;
