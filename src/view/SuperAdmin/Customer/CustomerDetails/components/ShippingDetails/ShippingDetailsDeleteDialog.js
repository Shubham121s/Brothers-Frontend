import { ConfirmDialog } from "../../../../../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteShippingDetailsDialog } from "../../store/stateSlice";
import { Notification, Toast } from "../../../../../../components/ui";
import { useState } from "react";
import {
  deleteCustomerShippingAddress,
  deleteCustomerShippingDetails,
  getCustomerDetailsByCustomerId,
} from "../../store/dataSlice";

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

const ShippingDetailsDeleteDialog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const dialogOpen = useSelector(
    (state) => state.customer_details.state.deleteShippingDetailsDialog
  );
  const selectedShippingDetails = useSelector(
    (state) => state.customer_details.state.selectedShippingDetails
  );

  const CustomerId = useSelector(
    (state) => state.customer_details.state.customer_id
  );

  const onConfirmDialogClose = () => {
    dispatch(toggleDeleteShippingDetailsDialog(false));
  };

  const handleConfirm = async () => {
    setLoading(true);
    const action = await dispatch(
      deleteCustomerShippingDetails({
        shipping_details_id: selectedShippingDetails.shipping_details_id,
      })
    );
    setLoading(false);
    if (action.payload.status < 300) {
      PushNotification(
        "Successfully Deleted",
        "success",
        "Shipping Address Successfully deleted"
      );
      onConfirmDialogClose();
      dispatch(
        getCustomerDetailsByCustomerId({
          customer_id: CustomerId,
        })
      );
    } else {
      PushNotification(
        "Something Wrong",
        "danger",
        "Shipping Address has not deleted"
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onConfirmDialogClose}
      onRequestClose={onConfirmDialogClose}
      type="danger"
      title={<div className="capitalize">Delete Shipping Address</div>}
      loading={loading}
      onCancel={onConfirmDialogClose}
      onConfirm={handleConfirm}
      confirmButtonColor="red-600"
    >
      <p>Are you sure you want to delete? This action cannot be undone.</p>
    </ConfirmDialog>
  );
};

export default ShippingDetailsDeleteDialog;
