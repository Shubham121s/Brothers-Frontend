import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { Notification, Toast } from "../../../../../components/ui";
import { ConfirmDialog } from "../../../../../components/shared";
import {
  deletePurchaseOrder,
  getAllPoWithPagination,
} from "../store/dataSlice";

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

const DeletePoConfirmationDialog = () => {
  const [loading, setLoading] = useState(false);

  const tableData = useSelector(
    (state) => state.purchase_order_list.data.tableData
  );

  const dispatch = useDispatch();
  const selectedOrder = useSelector(
    (state) => state.purchase_order_list.state.selectedPurchase
  );
  const deleteDialog = useSelector(
    (state) => state.purchase_order_list.state.deleteConfirmation
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deletePurchaseOrder({
        purchase_order_id: selectedOrder?.purchase_order_id,
      })
    );
    setLoading(false);
    if (action.payload?.status < 300) {
      pushNotification(
        "Successfully Deleted",
        "success",
        action.payload?.data?.message
      );
      onDialogClose();
      dispatch(getAllPoWithPagination(tableData));
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
      isOpen={deleteDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete Purchase Order"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Purchase Order? This action cannot
        be undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeletePoConfirmationDialog;
