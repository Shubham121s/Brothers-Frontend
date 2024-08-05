import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleItemEditDialog } from "../store/stateSlice";
import { getAllUnusedItem, updateUnusedItem } from "../store/dataSlice";
import ConsumableItemDialog from "./consumableItemDialog";

const ConsumableItemEdit = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.unused_item.state.itemEditDialog);
  const selectedGoods = useSelector(
    (state) => state.unused_item.state.selectedItem
  );

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.unused_item.data.tableData
  );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(updateUnusedItem(values));
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          successfully Edited
        </Notification>,
        {
          placement: "top-end",
        }
      );
      handleDiscard();
      dispatch(getAllUnusedItem({ pageIndex, pageSize, query, total }));
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
    dispatch(toggleItemEditDialog(false));
  };

  return (
    <Dialog
      isOpen={dialog}
      onClose={handleDiscard}
      onRequestClose={handleDiscard}
      width={600}
    >
      <h4 className="text-center mb-3">Edit Unused Item</h4>
      <ConsumableItemDialog
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        initialData={selectedGoods}
      />
    </Dialog>
  );
};

export default ConsumableItemEdit;
