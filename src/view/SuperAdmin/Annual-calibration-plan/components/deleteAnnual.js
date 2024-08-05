import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { ConfirmDialog } from "../../../../components/shared";
import { deleteAnnual } from "../store/dataSlice";
import { Notification, Toast } from "../../../../components/ui";
import { getAnnual } from "../store/dataSlice";

const AnnualDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const deleteConfirmation = useSelector(
    (state) => state.annual.state.deleteConfirmation
  );
  const selectedAnnual = useSelector(
    (state) => state.annual.state.selectedAnnual
  );

  const onConfirmDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const handleConfirm = async () => {
    const action = await dispatch(deleteAnnual(selectedAnnual));
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
      dispatch(getAnnual());
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
        title="Delete Calibration"
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this Calibration? All record related
          to this Calibration will be deleted as well. This action cannot be
          undone.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default AnnualDeleteConfirmation;
