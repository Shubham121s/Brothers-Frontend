import React from "react";
import { Toast, Notification, Dialog } from "../../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditShippingDetailsDialog } from "../../store/stateSlice";
import ShippingForm from "./ShippingDetailsForm";
import {
  updateCustomerShippingAddress,
  updateCustomerShippingDetails,
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

const EditShippingDetailsDialog = () => {
  const dispatch = useDispatch();

  const handleUpdateShippingAddress = async (data) => {
    const action = await dispatch(updateCustomerShippingDetails(data));
    return action;
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await handleUpdateShippingAddress(values);
    setSubmitting(false);
    if (action.payload.status < 300) {
      PushNotification(
        "Successfully Updated",
        "success",
        "Shipping Address Successfully updated"
      );
      onDialogClose();
    } else {
      PushNotification(
        "Something Wrong",
        "danger",
        "Shipping Address has not updated"
      );
    }
  };

  const editShippingDetailsDialog = useSelector(
    (state) => state.customer_details.state.editShippingDetailsDialog
  );
  const selectedShippingDetails = useSelector(
    (state) => state.customer_details.state.selectedShippingDetails
  );

  const onDialogClose = () => {
    dispatch(toggleEditShippingDetailsDialog(false));
  };

  return (
    <Dialog
      isOpen={editShippingDetailsDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <div className="flex flex-col h-full justify-between">
        <h4>Update Shipping Details Information</h4>
        <p className="mb-4">Section to config shipping details information</p>
        <ShippingForm
          type="edit"
          onDiscard={onDialogClose}
          initialData={selectedShippingDetails}
          onFormSubmit={handleFormSubmit}
        />
      </div>
    </Dialog>
  );
};

export default EditShippingDetailsDialog;
