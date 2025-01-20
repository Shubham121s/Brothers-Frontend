import React, { useRef, useState } from "react";
import { Button } from "../../../../../../components/ui";
import { useReactToPrint } from "react-to-print";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DispatchTable from "./components/DispatchTable";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles for PDF Viewer
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const DispatchInvoice = ({ data, TABLE_ROW_COUNT = 8 }) => {
  const componentRef = useRef();
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  // Create a new instance of the default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `invoice-${data?.invoice_no}`,
  });

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

  const TableData = (props) => {
    return (
      <div className="grid grid-cols-6 mt-2">
        <div className="col-span-6 h-full">
          <div className="h-full overflow-hidden">
            <DispatchTable
              {...props}
              className="print:text-sm p-0 text-gray-700"
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
                height: "calc(1130px - 50px)",
                paddingLeft: "6%",
                paddingRight: "2%",
              }}
            >
              <div
                className="invoice w-full  relative"
                style={{
                  border: "1px solid black",
                  marginTop: "9px",
                }}
              >
                {/* <div
                  className="w-full h-full absolute top-0"
                  style={{ opacity: 0.3 }}
                >
                  <img
                    src="http://www.brothers.net.in/img/logoBrother.png"
                    className="w-full h-full"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  ></img>
                </div> */}
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
          <div ref={componentRef}>
            <RenderPages data={data} />
          </div>
        </div>
      </>
    )
  );
};

export default DispatchInvoice;
