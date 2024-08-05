import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleGoodsEditDialog } from "../store/stateSlice";
import { getAllFinishGoods, updateFinishGoods } from "../store/dataSlice";
import FinishGoodDialog from "./finishGoodsDialog";

const FinishGoodEdit = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(
    (state) => state.finish_goods.state.goodsEditDialog
  );
  const selectedGoods = useSelector(
    (state) => state.finish_goods.state.selectedGood
  );

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.raw_material.data.tableData
  );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(updateFinishGoods(values));
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Goods successfully Edited
        </Notification>,
        {
          placement: "top-end",
        }
      );
      handleDiscard();
      dispatch(getAllFinishGoods({ pageIndex, pageSize, query, total }));
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
    dispatch(toggleGoodsEditDialog(false));
  };

  return (
    <Dialog
      isOpen={dialog}
      onClose={handleDiscard}
      onRequestClose={handleDiscard}
      width={600}
    >
      <h4 className="text-center mb-3">Edit Finished Goods</h4>
      <FinishGoodDialog
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        initialData={selectedGoods}
      />
    </Dialog>
  );
};

export default FinishGoodEdit;
