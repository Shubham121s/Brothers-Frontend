import React, { useState } from "react";
import { Button, Dialog } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { toggleImageDialog } from "../store/stateSlice";
import { deleteAnyFile, getAnnual } from "../store/dataSlice";
import { Notification, Toast } from "../../../../components/ui";

const ImageDialog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const imageDialogOpen = useSelector(
    (state) => state.annual.state.imageDialog
  );
  const tableData = useSelector((state) => state.annual.data.tableData);
  const selectedAnnual = useSelector(
    (state) => state.annual.state.selectedAnnual
  );

  let fileName = selectedAnnual?.certificate?.split("/Instrument/")[1] || "";

  const onDialogClose = (e) => {
    dispatch(toggleImageDialog(false));
  };

  const onViewImage = () => {
    const splitString = selectedAnnual?.certificate?.split("/uploads/");
    const transformedString = `https://mastererp.5techg.com/api/static/${splitString[1]}`;
    window.open(transformedString, "_blank");
  };

  const onDeleteImage = async () => {
    setLoading(true);
    let query = `UPDATE calibrations SET certificate = NULL WHERE calibration_id = ${selectedAnnual?.calibration_id}`;
    const action = await dispatch(
      deleteAnyFile({ query: query, filePath: selectedAnnual?.certificate })
    );

    if (action.payload.status < 300) {
      Toast.push(
        <Notification title={"Success"} type="success" duration={3000}>
          {action?.payload?.data?.message}
        </Notification>,
        {
          placement: "top-center",
        }
      );
      dispatch(getAnnual(tableData));
      setLoading(false);
      onDialogClose();
    } else {
      Toast.push(
        <Notification title={"Error"} type="danger" duration={3000}>
          File Not Uploaded
        </Notification>,
        {
          placement: "top-center",
        }
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog
        isOpen={imageDialogOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        style={{
          marginTop: 250,
        }}
        contentClassName="pb-0 px-0"
      >
        <div className="px-6 pb-6">
          <h5 className="mb-4">File Information</h5>
          <p>
            Here You can{" "}
            <span className="text-emerald-700 font-semibold">View</span> and{" "}
            <span className="text-red-700 font-semibold">Delete</span> The File.
          </p>
          <strong>FileName : {fileName}</strong>
        </div>
        <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
          {/* <Button
            className="ltr:mr-2 rtl:ml-2"
            onClick={handleDownload}
            variant="solid"
            color="yellow-600"
            size="sm"
          >
            Download
          </Button> */}
          <Button
            className="ml-2"
            onClick={onViewImage}
            variant="solid"
            color="emerald-600"
            size="sm"
          >
            View
          </Button>
          <Button
            className="ml-2"
            onClick={onDeleteImage}
            variant="solid"
            color="red-600"
            size="sm"
            loading={loading}
          >
            Delete
          </Button>
          <Button onClick={onDialogClose} className="ml-2" size="sm">
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageDialog;
