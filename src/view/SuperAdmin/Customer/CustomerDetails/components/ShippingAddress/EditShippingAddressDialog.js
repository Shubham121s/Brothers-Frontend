import React from "react";
import { Toast, Notification, Dialog } from "../../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./ShippingAddressForm";
import { toggleEditShippingAddressDialog } from "../../store/stateSlice";
import { updateCustomerShippingAddress } from "../../store/dataSlice";

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

const EditShippingAddressDialog = () => {
  const dispatch = useDispatch();

  const handleUpdateAddress = async (data) => {
    const action = await dispatch(updateCustomerShippingAddress(data));
    return action;
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await handleUpdateAddress(values);
    setSubmitting(false);
    if (action.payload.status < 300) {
      PushNotification(
        "Successfully Updates",
        "success",
        "Address Successfully updated"
      );
      onDialogClose();
    } else {
      PushNotification("Something Wrong", "danger", "Address has not updated");
    }
  };

  const editShippingAddressDialog = useSelector(
    (state) => state.customer_details.state.editShippingAddressDialog
  );
  const selectedShippingAddress = useSelector(
    (state) => state.customer_details.state.selectedShippingAddress
  );

  const onDialogClose = () => {
    dispatch(toggleEditShippingAddressDialog(false));
  };

  return (
    <Dialog
      isOpen={editShippingAddressDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h4>Update Address Information</h4>
      <p className="mb-4">Section to config address information</p>
      <AddressForm
        type="edit"
        onDiscard={onDialogClose}
        initialData={selectedShippingAddress}
        onFormSubmit={handleFormSubmit}
      />
    </Dialog>
  );
};

export default EditShippingAddressDialog;
