import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { ConfirmDialog } from "../../../../components/shared";
import { deleteWorker } from "../store/dataSlice";
import { Notification, Toast } from "../../../../components/ui";

const WorkerDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const deleteConfirmation = useSelector(
    (state) => state.worker.state.deleteConfirmation
  );
  const selectedWorker = useSelector(
    (state) => state.worker.state.selectedWorker
  );

  const onConfirmDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const handleConfirm = async () => {
    const action = await dispatch(deleteWorker(selectedWorker));
    if (action.payload.status === 200) {
      dispatch(toggleDeleteConfirmation(false));
      Toast.push(
        <Notification
          title={"Successfully Deleted"}
          type="success"
          duration={2500}
        >
          HR successfully deleted
        </Notification>,
        {
          placement: "top-center",
        }
      );
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
        title="Delete Worker"
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this HR? All record related to this HR
          will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default WorkerDeleteConfirmation;
