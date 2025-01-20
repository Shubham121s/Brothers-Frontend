import React, { useRef } from "react";
import { Button } from "../../../../../../components/ui";
import { useReactToPrint } from "react-to-print";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PackingTable from "./components/PackingTable";

const PackingInvoice = ({ data, TABLE_ROW_COUNT = 8 }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `packing-invoice-${data?.invoice_no}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
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
      }
    `,
  });

  const TableData = (props) => {
    return (
      <div className="grid grid-cols-6">
        <div className="col-span-6 h-full">
          <div className="h-full overflow-hidden">
            <PackingTable
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
                {/* <div className='w-full h-full absolute top-0' style={{ opacity: .15 }}>
                  <img src='http://www.brothers.net.in/img/logoBrother.png' className='w-full h-full' style={{ objectFit: 'contain', objectPosition: 'center' }}></img>
                </div> */}
                <Header
                  data={data}
                  pageNo={pageNo}
                  pageCount={pageCount}
                  location_code={location_code}
                  invoice_type="PACKING INVOICE"
                />
                <TableData
                  pageNo={pageNo}
                  data={data}
                  boxes={data?.DispatchBoxLists}
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
        <Button variant="solid" color="pink-500" onClick={handlePrint}>
          Packing Invoice
        </Button>
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <RenderPages data={data} />
          </div>
        </div>
      </>
    )
  );
};

export default PackingInvoice;
