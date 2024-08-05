import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { ConfirmDialog } from "../../../../components/shared";
import { deleteStock, getAllStock } from "../store/dataSlice";
import { Notification, Toast } from "../../../../components/ui";

const StockDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const deleteConfirmation = useSelector(
    (state) => state.stock.state.deleteConfirmation
  );
  const selectedStock = useSelector((state) => state.stock.state.selectedStock);

  const onConfirmDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const handleConfirm = async () => {
    const action = await dispatch(
      deleteStock({ stock_id: selectedStock?.stock_id })
    );
    if (action.payload.status === 200) {
      dispatch(toggleDeleteConfirmation(false));
      dispatch(getAllStock());
      Toast.push(
        <Notification
          title={"Successfully Deleted"}
          type="success"
          duration={2500}
        >
          Stock successfully deleted
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
        title="Delete Stock"
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this Stock? All record related to this
          Stock will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
};

export default StockDeleteConfirmation;
