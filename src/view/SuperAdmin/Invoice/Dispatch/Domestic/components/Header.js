import React from "react";
import CompanyDetails from "../components/CompanyDetails";
import GstAndOtherDetails from "../components/GstAndOtherDetails";
import InvoiceDetails from "../components/InvoiceDetails";
import ConsigneeAndBuyerDetails from "../components/ConsigneeAndBuyerDetails";
import TransportAndPaymentTerms from "../components/TransportAndPaymentTerms";
const LOGO_SRC_PATH = "/img/logo/logo.png";

const Header = (props) => {
  const { data, pageNo, location_code, invoice_type, pageCount } = props;
  // pageNo < 10 ? `0${pageNo}` : pageNo}
  return (
    <>
      <div className="grid grid-cols-6 p-2 h-full items-center">
        <div className="col-span-1 h-full">
          <div className="h-full justify-start items-center flex">
            <img
              src={LOGO_SRC_PATH}
              className="absolute object-cover opacity-150"
              style={{ height: "50px" }}
            />
          </div>
        </div>
        <div className="col-span-4 h-full">
          <div className="h-full text-center">
            <h6 className="text-center text-gray-700">
              COMMERCIAL | TAX INVOICE
            </h6>
            <p className="print:text-sm">
              (Issued under Section 31 of 'SGST Act, 2017 & CGST Act, 2017',
              read with Section 20 of IGST Act, 2017)
            </p>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <div className="h-full flex justify-end items-center">
            <h6 className="text-gray-700 font-medium">
              01/{pageNo < 10 ? `0${pageNo}` : pageNo}
              {/* {pageCount < 10 ? `0${pageCount}` : pageCount} */}
            </h6>
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-6 gap-2"
        style={{
          borderBottom: "1px dashed black",
          borderTop: "1px dashed black",
        }}
      >
        <div className="col-span-2 p-2 h-full">
          <div className="h-full" style={{ borderRight: "1px dashed black" }}>
            <CompanyDetails data={data?.DispatchCompanyDetail} />
          </div>
        </div>
        <div className="col-span-2 p-2 h-full">
          <div className="h-full" style={{ borderRight: "1px dashed black" }}>
            <GstAndOtherDetails data={data?.DispatchCompanyDetail} />
          </div>
        </div>
        <div className="col-span-2 p-2 h-full">
          <div className="h-full flex justify-start items-center">
            <InvoiceDetails data={data} location_code={location_code} />
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-4 gap-2"
        style={{ borderBottom: "1px dashed black" }}
      >
        <div className="col-span-2 h-full p-2">
          <div style={{ borderRight: "1px dashed black" }}>
            <ConsigneeAndBuyerDetails
              data={data?.DispatchConsignee}
              address={data?.DispatchConsignee?.DispatchConsigneeAddress}
              contactPerson={data?.DispatchShippingAddress?.contact_person}
              gst={data?.DispatchConsignee?.gst_no}
              title="Details of Receiver (Billed To)"
            />
          </div>
        </div>
        <div className="col-span-2 h-full p-2">
          <div>
            <ConsigneeAndBuyerDetails
              data={data?.DispatchBuyer}
              address={data?.DispatchShippingAddress}
              gst={data?.DispatchBuyer?.gst_no}
              title="Details of Recipient (Shipped To)"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
