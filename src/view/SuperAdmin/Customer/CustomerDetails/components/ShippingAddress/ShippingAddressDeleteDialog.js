import { ConfirmDialog } from "../../../../../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteShippingAddressDialog } from "../../store/stateSlice";
import { useState } from "react";
import { Notification, Toast } from "../../../../../../components/ui";
import { deleteCustomerShippingAddress } from "../../store/dataSlice";

const PushNotification = (title, type, message) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const ShippingAddressDeleteDialog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const dialogOpen = useSelector(
    (state) => state.customer_details.state.deleteShippingAddressDialog
  );
  const selectedShippingAddress = useSelector(
    (state) => state.customer_details.state.selectedShippingAddress
  );

  const onConfirmDialogClose = () => {
    dispatch(toggleDeleteShippingAddressDialog(false));
  };

  const handleConfirm = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteCustomerShippingAddress({
        shipping_address_id: selectedShippingAddress?.shipping_address_id,
      })
    );
    setLoading(false);
    if (action.payload.status === 200) {
      PushNotification(
        "Successfully Deleted",
        "success",
        "Address Successfully deleted"
      );
      onConfirmDialogClose();
    } else {
      PushNotification("Something Wrong", "danger", "Address has not deleted");
    }
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onConfirmDialogClose}
      onRequestClose={onConfirmDialogClose}
      type="danger"
      title={<div className="capitalize">Delete Address</div>}
      loading={loading}
      onCancel={onConfirmDialogClose}
      onConfirm={handleConfirm}
      confirmButtonColor="red-600"
    >
      <p>Are you sure you want to delete? This action cannot be undone.</p>
    </ConfirmDialog>
  );
};

export default ShippingAddressDeleteDialog;
