import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleGoodsNewDialog } from "../store/stateSlice";
import { getAllFinishGoods, postFinishGoods } from "../store/dataSlice";
import FinishGoodDialog from "./finishGoodsDialog";

const FinishGoodNew = () => {
  const dispatch = useDispatch();
  const dialog = useSelector(
    (state) => state.finish_goods.state.goodsNewDialog
  );

  const selectedRawMaterial = useSelector(
    (state) => state.raw_material.state.selectedRawMaterial
  );

  //   const { pageIndex, pageSize, query, total } = useSelector(
  //     (state) => state.raw_material.data.tableData
  //   );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(
      postFinishGoods({
        ...values,
        raw_material_id: selectedRawMaterial.raw_material_id,
      })
    );
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Goods successfully added
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
    dispatch(toggleGoodsNewDialog(false));
  };

  return (
    <Dialog
      isOpen={dialog}
      onClose={handleDiscard}
      onRequestClose={handleDiscard}
      width={600}
    >
      <h4 className="text-center mb-3">Add Finished Goods</h4>
      <FinishGoodDialog
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
      />
    </Dialog>
  );
};

export default FinishGoodNew;
