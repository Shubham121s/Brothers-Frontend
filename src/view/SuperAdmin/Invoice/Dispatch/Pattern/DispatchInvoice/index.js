import React, { useRef } from "react";
import { Button } from "../../../../../../components/ui";
import { useReactToPrint } from "react-to-print";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DispatchTable from "./components/DispatchTable";
import { TABLE_ROW_COUNT } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import {
  getDispatchInvoiceWithPagination,
  updatePatterInvoiceStatus,
} from "../../../../Dispatch/PatternList/store/dataSlice";
import { toggleInvoiceDialog } from "../../../../Dispatch/PatternList/store/stateSlice";

const DispatchInvoice = ({ data }) => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const { pageIndex, pageSize } = useSelector(
    (state) => state.pattern_invoice.data.tableData
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
          padding-left: 20px;
          padding-right: 10px;
        }
      }
    `,
  });

  const handleCompleted = async () => {
    try {
      await dispatch(
        updatePatterInvoiceStatus({
          pattern_invoice_id: data?.pattern_invoice_id,
          status: "confirmed",
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
        <div key={Math.random()} style={{ breakAfter: "avoid-page" }}>
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
        <Button
          // variant="solid"
          className="ml-4 border border-orange-500 !bg-white text-orange-500"
          onClick={() => {
            handleCompleted();
          }}
        >
          Completed
        </Button>
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
