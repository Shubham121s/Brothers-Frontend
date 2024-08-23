import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglDeleteConfirmationDialog } from "../store/stateSlice";
import { Notification, Toast } from "../../../../../components/ui";
import {
  deleteCustomer,
  deleteProduct,
  getCustomersWithPagination,
} from "../store/dataSlice";
import { ConfirmDialog } from "../../../../../components/shared";

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

const DeleteCustomerConfirmationDialog = () => {
  const [loading, setLoading] = useState(false);

  const tableData = useSelector((state) => state.customer.data.tableData);

  const dispatch = useDispatch();
  const selectedCustomer = useSelector(
    (state) => state.customer.state.selectedCustomer
  );
  const deleteDialog = useSelector(
    (state) => state.customer.state.deleteConfirmation
  );

  const onDialogClose = () => {
    dispatch(togglDeleteConfirmationDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteCustomer({
        customer_id: selectedCustomer?.customer_id,
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
      dispatch(getCustomersWithPagination(tableData));
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
      title="Delete Customer"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmText={!loading ? "Confirm" : "Deleting..."}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this Customer? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default DeleteCustomerConfirmationDialog;
