import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleEditDialog } from "../store/stateSlice";
import { getAllConsumableItem, updateConsumableItem } from "../store/dataSlice";
import ConsumableItemForm from "./consumableItemForm";

const ConsumableItemEdit = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(
    (state) => state.consumable_items.state.consumableEditDialog
  );
  const selectedMaterial = useSelector(
    (state) => state.consumable_items.state.selectedConsumableItem
  );

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.consumable_items.data.tableData
  );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(updateConsumableItem(values));
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Material successfully Edited
        </Notification>,
        {
          placement: "top-end",
        }
      );
      handleDiscard();
      dispatch(getAllConsumableItem({ pageIndex, pageSize, query, total }));
    } else {
      Toast.push(
        <Notification title={"Failed"} type="danger" duration={2500}>
          {action.payload.data?.message}
        </Notification>,
        {
          placement: "top-end",
        }
      );
    }
  };

  const handleDiscard = () => {
    dispatch(toggleEditDialog(false));
  };

  return (
    <Dialog
      isOpen={dialog}
      onClose={handleDiscard}
      onRequestClose={handleDiscard}
      width={600}
    >
      <h4 className="text-center mb-3">Edit Material</h4>
      <ConsumableItemForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        initialData={selectedMaterial}
      />
    </Dialog>
  );
};

export default ConsumableItemEdit;
