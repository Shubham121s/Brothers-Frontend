import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Notification, Toast } from "../../../../../components/ui";
import { toggleEditDialog } from "../store/stateSlice";
import { getAllRawMaterials, updateRawMaterial } from "../store/dataSlice";
import RawMaterialDialog from "./rawMaterialDialog";

const RawMaterialEdit = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.raw_material.state.editDialog);
  const selectedMaterial = useSelector(
    (state) => state.raw_material.state.selectedRawMaterial
  );

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.raw_material.data.tableData
  );
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const action = await dispatch(updateRawMaterial(values));
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
    dispatch(toggleEditDialog(false));
  };

  return (
    <Dialog
      isOpen={dialog}
      onClose={handleDiscard}
      onRequestClose={handleDiscard}
      width={600}
    >
      <h4 className="text-center mb-3">Edit Raw Material</h4>
      <RawMaterialDialog
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        initialData={selectedMaterial}
      />
    </Dialog>
  );
};

export default RawMaterialEdit;
