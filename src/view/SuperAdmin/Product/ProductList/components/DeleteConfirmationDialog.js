import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglDeleteConfirmationDialog } from "../store/stateSlice";
import { Notification, Toast } from "../../../../../components/ui";
import { deleteProduct, getAllProducts } from "../store/dataSlice";
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

const DeleteProductConfirmationDialog = () => {
  const [loading, setLoading] = useState(false);

  const tableData = useSelector((state) => state.product.data.tableData);

  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.product.state.selectedProduct
  );
  const deleteDispatchProductDialog = useSelector(
    (state) => state.product.state.deleteConfirmation
  );

  const onDialogClose = () => {
    dispatch(togglDeleteConfirmationDialog(false));
  };

  const onDelete = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteProduct({
        product_id: selectedProduct?.product_id,
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
      dispatch(getAllProducts(tableData));
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
