import React, { useState } from "react";
import { Button, DatePicker } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../../../utils/hooks/useQuery";
// import {
//   apiFetchRetailerLedgerPdf,
//   apiFetchRetailerLedgerCSV,
//   apiFetchRetailerLedgerExcel,
// } from "../../../../services/DataFileService";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { setStartDate, setEndDate } from "../store/stateSlice";
import dayjs from "dayjs";

const DownloadPannel = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const retailerId = query.get("id");

  const startDate = useSelector(
    (state) => state.retailerLedgerList.state.startDate
  );
  const endDate = useSelector(
    (state) => state.retailerLedgerList.state.endDate
  );

  const { DatePickerRange } = DatePicker;

  const handleDateChange = (value) => {
    dispatch(setStartDate(value[0]));
    dispatch(setEndDate(value[1]));
  };

  const handleDownloadClick = async () => {
    try {
      // Make a POST request to the server to fetch and generate the PDF
      // const response = await apiFetchRetailerLedgerPdf({
      //   retailer_id: retailerId,
      // });

      // Create a Blob from the PDF data
      // const blob = new Blob([response.data], { type: "application/pdf" });

      // // Create a URL for the Blob and initiate the download
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "ledgerData.pdf";
      // link.click();

      // // Clean up by revoking the URL
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleDownloadClickCSV = async () => {
    try {
      // const response = await apiFetchRetailerLedgerCSV({
      //   retailer_id: retailerId,
      // });

      // const blob = new Blob([response.data], { type: "text/csv" });

      // // Create a URL for the Blob and initiate the download
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "ledgerData.csv";
      // link.click();

      // // Clean up by revoking the URL
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleDownloadClickExcel = async () => {
    try {
      // const response = await apiFetchRetailerLedgerExcel({
      //   retailer_id: retailerId,
      // });

      // const blob = new Blob([response.data], {
      //   type: "text/csvapplication/vnd.openxmlformats-officedocument.spreadsheatml.sheet",
      // });

      // // Create a URL for the Blob and initiate the download
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "ledgerData.xlsx";
      // link.click();

      // // Clean up by revoking the URL
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 my-4">
      <div>
        <DatePickerRange
          value={[startDate, endDate]}
          onChange={handleDateChange}
          inputFormat={"YYYY-MM-DD"}
          size="sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          onClick={handleDownloadClick}
          icon={<FaRegFilePdf className="mr-2" />}
        >
          PDF
        </Button>
        <Button
          size="sm"
          onClick={handleDownloadClickCSV}
          icon={<BsFiletypeCsv className="mr-2" />}
        >
          CSV
        </Button>
        <Button
          size="sm"
          onClick={handleDownloadClickExcel}
          icon={<RiFileExcel2Fill className="mr-2" />}
        >
          Excel
        </Button>
      </div>
    </div>
  );
};
export default DownloadPannel;
