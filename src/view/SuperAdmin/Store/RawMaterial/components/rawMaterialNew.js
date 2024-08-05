import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleNewDialog } from "../store/stateSlice";
import { getAllRawMaterials, postRawMaterial } from "../store/dataSlice";
import RawMaterialDialog from "./rawMaterialDialog";

const RawMaterialNew = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.raw_material.state.newDialog);

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.raw_material.data.tableData
  );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(postRawMaterial(values));
    setSubmitting(false);
    if (action.payload.status < 300) {
      Toast.push(
        <Notification
          title={"Successfully added"}
          type="success"
          duration={2500}
        >
          Material successfully added
        </Notification>,
        {
          placement: "top-end",
        }
      );
      handleDiscard();
      dispatch(getAllRawMaterials({ pageIndex, pageSize, query, total }));
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
      <h4 className="text-center mb-3">Add Raw Material</h4>
      <RawMaterialDialog
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
      />
    </Dialog>
  );
};

export default RawMaterialNew;
