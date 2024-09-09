import React, { useState } from "react";
import { Button } from "../../../../components/ui";
import axios from "axios";
import appConfig from "../../../../configs/app.config";
import { PERSIST_STORE_NAME } from "../../../../constants/app.constant";
import deepParseJson from "../../../../utils/deepParseJson";
import { MdOutlineSimCardDownload } from "react-icons/md";
import { useSelector } from "react-redux";

const ReportButton = ({DeliveryStatus}) => {
  const tableData = useSelector((state) => state.masterPP.data.tableData);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadExcel = async () => {
    setIsDownloading(true);

    try {
      const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
      const persistData = deepParseJson(rawPersistData);

      let accessToken = persistData.auth.session.token;
      const response = await axios.post(
        `${appConfig.apiPrefix}v1/web/company/reports/master/PP`,
        {...tableData,DeliveryStatus},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsDownloading(false);
      window.open(response.data.path, "_blank");
    } catch (error) {
      setIsDownloading(false);
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <>
      <Button
        size="sm"
        onClick={downloadExcel}
        loading={isDownloading}
        icon={<MdOutlineSimCardDownload />}
      >
        {isDownloading ? "Preparing To Download" : "Excel"}
      </Button>
    </>
  );
};

export default ReportButton;
