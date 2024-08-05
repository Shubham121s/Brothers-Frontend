import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { ConfirmDialog } from "../../../../components/shared";
import { deleteMachine } from "../store/dataSlice";
import { Notification, Toast } from "../../../../components/ui";
import { getMachine } from "../store/dataSlice";

const MachineDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const deleteConfirmation = useSelector(
    (state) => state.machine.state.deleteConfirmation
  );
  const selectedMachine = useSelector(
    (state) => state.machine.state.selectedMachine
  );

  const onConfirmDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const handleConfirm = async () => {
    const action = await dispatch(deleteMachine(selectedMachine));
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
      dispatch(getMachine());
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
        title="Delete Machine"
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this Machine? All record related to
          this Machine will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default MachineDeleteConfirmation;
