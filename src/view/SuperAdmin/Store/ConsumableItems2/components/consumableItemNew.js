import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleNewDialog } from "../store/stateSlice";
import { getAllConsumableItem, postConsumableItem } from "../store/dataSlice";
import ConsumableItemForm from "./consumableItemForm";

const ConsumableItemNew = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(
    (state) => state.consumable_items.state.consumablenewDialog
  );

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.consumable_items.data.tableData
  );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(postConsumableItem(values));
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          successfully added
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
    dispatch(toggleNewDialog(false));
  };

  return (
    <Dialog
      isOpen={dialog}
      onClose={handleDiscard}
      onRequestClose={handleDiscard}
      width={600}
    >
      <h4 className="text-center mb-3">Add Material</h4>
      <ConsumableItemForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
      />
    </Dialog>
  );
};

export default ConsumableItemNew;
