import React, { useState } from "react";
import { Button } from "../../../../components/ui";
import axios from "axios";
import appConfig from "../../../../configs/app.config";
import { PERSIST_STORE_NAME } from "../../../../constants/app.constant";
import deepParseJson from "../../../../utils/deepParseJson";
import { MdOutlineSimCardDownload } from "react-icons/md";
import { useSelector } from "react-redux";

const ReportButton = () => {
  const tableData = useSelector((state) => state.poList.data.tableData);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadExcel = async () => {
    setIsDownloading(true);
    setProgress(0);

    try {
      const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
      const persistData = deepParseJson(rawPersistData);

      let accessToken = persistData.auth.session.token;

      const response = await axios.post(
        `${appConfig.apiPrefix}v1/web/company/reports/master/PP`,
        tableData,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "master-product-planner.xlsx");
      document.body.appendChild(link);
      link.click();

      link.remove();
      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading the file:", error);
      setIsDownloading(false);
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
        Excel
      </Button>
      {isDownloading && (
        <div>
          <p>Download Progress: {progress}%</p>
        </div>
      )}
    </>
  );
};

export default ReportButton;
