import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { ConfirmDialog } from "../../../../components/shared";
import { deleteBreakdown } from "../store/dataSlice";
import { Notification, Toast } from "../../../../components/ui";
import { getBreakdown } from "../store/dataSlice";

const BreakdownDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const deleteConfirmation = useSelector(
    (state) => state.breakdown.state.deleteConfirmation
  );
  const selectedBreakdown = useSelector(
    (state) => state.breakdown.state.selectedBreakdown
  );

  const onConfirmDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const handleConfirm = async () => {
    const action = await dispatch(deleteBreakdown(selectedBreakdown));
    if (action.payload.status === 200) {
      dispatch(toggleDeleteConfirmation(false));
      Toast.push(
        <Notification
          title={"Successfully Deleted"}
          type="success"
          duration={2500}
        >
          successfully deleted
        </Notification>,
        {
          placement: "top-center",
        }
      );
      dispatch(getBreakdown());
    } else {
      Toast.push(
        <Notification
          title={"Successfully Deleted"}
          type="success"
          duration={2500}
        >
          {action.payload.data?.message}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={deleteConfirmation}
        onClose={onConfirmDialogClose}
        onRequestClose={onConfirmDialogClose}
        type="danger"
        title="Delete Breakdown"
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this Breakdown? All record related to
          this Breakdown will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default BreakdownDeleteConfirmation;
