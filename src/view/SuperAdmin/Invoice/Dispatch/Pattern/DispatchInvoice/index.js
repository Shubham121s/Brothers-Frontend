import React, { useRef } from "react";
import { Button } from "../../../../../../components/ui";
import { useReactToPrint } from "react-to-print";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DispatchTable from "./components/DispatchTable";
import { TABLE_ROW_COUNT } from "../constant";

const DispatchInvoice = ({ data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `invoice-${data?.invoice_no}`,
  });

  const TableData = (props) => {
    return (
      <div className="grid grid-cols-6">
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
    if (data) {
      pages.push(
        <div key={Math.random()} style={{ height: "1130px" }}>
          <div className="invoice w-full p-4 relative">
            {/* <div className='w-full h-full absolute top-0' style={{ opacity: .15 }}>
                  <img src='http://www.brothers.net.in/img/logoBrother.png' className='w-full h-full' style={{ objectFit: 'contain', objectPosition: 'center' }}></img>
                </div> */}
            <Header data={data} invoice_type="INVOICE" />
            <TableData data={data?.PatternInvoiceLists} />
            <Footer data={data} />
          </div>
        </div>
      );
    }
    return pages;
  };

  return (
    data && (
      <>
        <Button variant="solid" color="orange-500" onClick={handlePrint}>
          Invoice
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

export default DispatchInvoice;
