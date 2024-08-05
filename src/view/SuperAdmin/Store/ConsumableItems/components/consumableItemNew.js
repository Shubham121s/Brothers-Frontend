import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleItemNewDialog } from "../store/stateSlice";
import {
  getAllFinishGoods,
  getAllUnusedItem,
  postUnusedItem,
} from "../store/dataSlice";
import ConsumableItemDialog from "./consumableItemDialog";

const ConsumableItemNew = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.unused_item.state.itemNewDialog);

  const selectedRawMaterial = useSelector(
    (state) => state.raw_material.state.selectedRawMaterial
  );

  const tableData = useSelector((state) => state.unused_item.state.tableData);

  //   const { pageIndex, pageSize, query, total } = useSelector(
  //     (state) => state.raw_material.data.tableData
  //   );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(
      postUnusedItem({
        ...values,
        raw_material_id: selectedRawMaterial.raw_material_id,
      })
    );
    setSubmitting(false);
    if (action.payload.status < 300) {
      dispatch(getAllUnusedItem(tableData));
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
      //   dispatch(getAllFinishGoods({ pageIndex, pageSize, query, total }));
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
    dispatch(toggleItemNewDialog(false));
  };

  return (
    <Dialog
      isOpen={dialog}
      onClose={handleDiscard}
      onRequestClose={handleDiscard}
      width={600}
    >
      <h4 className="text-center mb-3">Add Unused Item</h4>
      <ConsumableItemDialog
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
      />
    </Dialog>
  );
};

export default ConsumableItemNew;
