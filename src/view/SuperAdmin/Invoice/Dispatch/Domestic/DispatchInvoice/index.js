import React, { useRef, useState } from "react";
import { Button } from "../../../../../../components/ui";
import { useReactToPrint } from "react-to-print";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DispatchTable from "./components/DispatchTable";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// eslint-disable-next-line

// Import styles for PDF Viewer
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
  getDispatchInvoiceWithPagination,
  updateStatus,
} from "../../../../Dispatch/DispatchList/store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleInvoiceDialog } from "../../../../Dispatch/DispatchList/store/stateSlice";

const DispatchInvoice = ({ data, TABLE_ROW_COUNT = 8 }) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const { pageIndex, pageSize } = useSelector(
    (state) => state.dispatch_invoice.data.tableData
  );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `invoice-${data?.invoice_no}`,
    pageStyle: `
      // @page {
      //   size: A4;
      // }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        .page {
          page-break-after: always;
          page-break-inside: avoid;
        }
        .invoice {
          page-break-inside: avoid;
        }
        .pageMargin{
          padding-top: 50px;
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    `,
  });

  // const handleDownloadPDF = async () => {
  //   console.log("click");
  //   if (!componentRef.current || !data) return;

  //   const fileName = `Invoice-${data?.invoice_no || "document"}.pdf`;
  //   console.log("fileName", fileName);

  //   try {
  //     console.log("here");
  //     await new Promise((resolve, reject) => {
  //       html2pdf()
  //         .from(componentRef.current)
  //         .set({
  //           filename: fileName,
  //           html2canvas: {
  //             scale: 1.2,
  //             useCORS: true,
  //             allowTaint: false,
  //           },
  //           jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  //           // margin: [10, 10, 10, 10], // Set margins
  //         })
  //         .save()
  //         .then(resolve)
  //         .catch(reject);
  //     });

  //     console.log("here2");

  //     await dispatch(
  //       updateStatus({
  //         status: "confirmed",
  //         dispatch_invoice_id: data?.dispatch_invoice_id,
  //       })
  //     );

  //     console.log("here4");

  //     dispatch(getDispatchInvoiceWithPagination({ pageIndex, pageSize }));
  //   } catch (error) {
  //     console.error("Error in downloading or updating:", error);
  //   }
  // };
  const handleGeneratePreview = () => {
    const node = componentRef.current;

    if (node) {
      const html = node.outerHTML;
      const blob = new Blob([html], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);
      console.log("Blob URL:", blobUrl);
      setPdfBlobUrl(blobUrl);
    }
  };

  const handleCompleted = async () => {
    try {
      await dispatch(
        updateStatus({
          status: "confirmed",
          dispatch_invoice_id: data?.dispatch_invoice_id,
        })
      );

      dispatch(getDispatchInvoiceWithPagination({ pageIndex, pageSize }));
      dispatch(toggleInvoiceDialog(false));
    } catch (error) {
      console.error("Error in downloading or updating:", error);
    }
  };

  const TableData = (props) => {
    return (
      <div className="grid grid-cols-6 mt-2">
        <div className="col-span-6 h-full">
          <div
            className="h-full overflow-hidden text-center"
            style={{
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <DispatchTable
              {...props}
              className="print:text-sm p-0 text-center text-gray-700"
            />
          </div>
        </div>
      </div>
    );
  };

  const RenderPages = ({ data }) => {
    const pages = [];
    let pageCount = 0;
    if (data) {
      const dispatchLocationsLength = data?.DispatchLocations?.length || 1;

      for (let i = 0; i < dispatchLocationsLength; i++) {
        const { DispatchLists = [] } = data?.DispatchLocations?.[i];
        pageCount += Math.ceil(DispatchLists?.length / TABLE_ROW_COUNT);
      }

      let pageNo = 1;
      for (let i = 0; i < dispatchLocationsLength; i++) {
        const { location_code = "", DispatchLists = [] } =
          data?.DispatchLocations?.[i];
        const dispatchListLength = DispatchLists?.length;
        for (
          let i = 0;
          i < Math.ceil(dispatchListLength / TABLE_ROW_COUNT);
          i++
        ) {
          pages.push(
            <div
              key={`page-${pageNo}`}
              className="page"
              style={{
                paddingLeft: "6%",
                paddingRight: "2%",
                fontSize: "10px",
                pageBreakAfter: "always",
              }}
            >
              <div
                className="invoice w-full relative"
                style={{
                  border: "1px solid black",
                  marginTop: "9px",
                  fontSize: "10px", // Adjusted font size
                }}
              >
                <Header
                  data={data}
                  pageNo={pageNo}
                  pageCount={pageCount}
                  location_code={location_code}
                  invoice_type="INVOICE"
                />
                <TableData
                  pageNo={pageNo}
                  data={data}
                  pageData={DispatchLists?.slice(
                    i * TABLE_ROW_COUNT,
                    i * TABLE_ROW_COUNT + TABLE_ROW_COUNT
                  )}
                  pageCount={pageCount}
                />
                <Footer data={data} />
              </div>
            </div>
          );
          pageNo += 1;
        }
      }
    }
    return pages;
  };

  return (
    data && (
      <>
        <Button
          variant="solid"
          color="orange-500"
          onClick={() => {
            handlePrint();
            handleGeneratePreview();
          }}
        >
          Print & Preview
        </Button>
        <Button
          // variant="solid"
          className="ml-4 border border-orange-500 !bg-white text-orange-500"
          onClick={() => {
            handleCompleted();
          }}
        >
          Completed
        </Button>

        {pdfBlobUrl && (
          <div className="mt-4">
            <h3>PDF Preview:</h3>
            <div
              style={{
                width: "100%",
                margin: "0 auto",
                height: "calc(1130px - 620px)",
                border: "1px solid black",
                overflow: "auto",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div>${componentRef.current?.outerHTML}</div>`,
                }}
              />
            </div>
          </div>
        )}
        <div style={{ display: "none" }}>
          <div ref={componentRef} className="pageMargin">
            <RenderPages data={data} />
          </div>
        </div>
      </>
    )
  );
};

export default DispatchInvoice;
