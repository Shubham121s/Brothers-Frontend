import React from "react";
import { Dialog, Button, Notification, Toast } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewDialog } from "../store/dataSlice";
import { MdOutlineUploadFile, MdOutlineSimCardDownload } from "react-icons/md";

const pushNotification = (title, type, message) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

const ViewDialog = () => {
  const dispatch = useDispatch();

  const selectedPO = useSelector((state) => state.masterPP.data.selectedPOList);
  const ViewDialog = useSelector((state) => state.masterPP.data.viewDialog);

  const onDialogClose = () => {
    dispatch(toggleViewDialog(false));
  };

  const handleClick = (field) => {
    let url = selectedPO[field];
    if (!url) {
      return pushNotification("Error", "danger", `File Not Uploaded Yet`);
    }
    const splitString = url.split("/uploads/");
    const transformedString = `https://mastererp.5techg.com/api/static/${splitString[1]}`;
    window.open(transformedString, "_blank");
  };

  return (
    <>
      <Dialog
        isOpen={ViewDialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={850}
      >
        <div className="grid grid-cols-3 gap-4 mt-5">
          <Button
            icon={<MdOutlineSimCardDownload />}
            size="sm"
            onClick={() => handleClick("internal_inspection")}
          >
            Inward Inspection
          </Button>
          <Button
            icon={<MdOutlineSimCardDownload />}
            size="sm"
            onClick={() => handleClick("material_tc_verify")}
          >
            Material TC Verify
          </Button>
          <Button
            icon={<MdOutlineSimCardDownload />}
            size="sm"
            onClick={() => handleClick("ndt_requirement")}
          >
            NDT Requirement
          </Button>
          <Button
            icon={<MdOutlineSimCardDownload />}
            size="sm"
            onClick={() => handleClick("final_inspection")}
          >
            Final Inspection
          </Button>
          <Button
            icon={<MdOutlineSimCardDownload />}
            size="sm"
            onClick={() => handleClick("heat_treatment")}
          >
            Heat Treatment
          </Button>
          <Button
            icon={<MdOutlineSimCardDownload />}
            size="sm"
            onClick={() => handleClick("other")}
          >
            Other Specified Requirement
          </Button>
        </div>
      </Dialog>
    </>
  );
};
export default ViewDialog;
