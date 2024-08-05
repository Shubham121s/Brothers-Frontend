import React from "react";
import CompanyDetails from "./CompanyDetails";
import InvoiceDetails from "./InvoiceDetails";
import PoDetails from "./PoDetails";
import ConsigneeAndBuyerDetails from "./ConsigneeAndBuyerDetails";
import GstAndOtherDetails from "./GstAndOtherDetails";
import PortDetails from "./PortDetails";
import DestinationDetails from "./DestinationDetails";
import BoxDetails from "./BoxDetails";
import dayjs from "dayjs";
const LOGO_SRC_PATH = "/img/logo/logo.png";

const Header = ({ data, pageNo, location_code, invoice_type, pageCount }) => {
  return (
    <div>
      <div
        className="grid grid-cols-6 p-2 h-full items-center"
        style={{ borderBottom: "1px dashed lightGray" }}
      >
        <div className="col-span-2 h-full">
          <div className="h-full justify-start items-center flex">
            <img src={LOGO_SRC_PATH} width={80} />
          </div>
        </div>
        <div className="col-span-2 h-full">
          <div className="h-full text-center">
            <h5 className="text-center text-gray-700">{invoice_type}</h5>
          </div>
        </div>
        <div className="col-span-2 h-full">
          <div className="h-full flex gap-2 justify-end items-center">
            <h6 className="text-gray-700 font-medium">
              {pageNo < 10 ? `0${pageNo}` : pageNo}/
              {pageCount < 10 ? `0${pageCount}` : pageCount}
            </h6>
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-6"
        style={{ borderBottom: "1px dashed lightGray" }}
      >
        <div className="col-span-2 h-full p-2">
          <div
            className="h-full"
            style={{ borderRight: "1px dashed lightGray" }}
          >
            <CompanyDetails />
          </div>
        </div>
        <div className="col-span-4 h-full p-2">
          <div
            className="h-full"
            // style={{ borderRight: "1px dashed lightGray" }}
          >
            <InvoiceDetails location_code={location_code} data={data} />
          </div>
          {/* <div className="h-full" style={{ borderTop: "1px dashed lightGray" }}>
            <PoDetails data={data?.DispatchLocations} />
          </div> */}
        </div>
        {/* <div className="col-span-2 h-full p-2">
          
        </div> */}
      </div>
      <div
        className="grid grid-cols-6"
        style={{ borderBottom: "1px dashed lightGray" }}
      >
        <div className="col-span-2 h-full p-2">
          <div
            className="h-full"
            style={{ borderRight: "1px dashed lightGray" }}
          >
            <ConsigneeAndBuyerDetails
              data={data?.DispatchConsignee}
              address={data?.DispatchConsignee?.DispatchConsigneeAddress}
              title="Consignee"
            />
          </div>
        </div>
        <div className="col-span-2 h-full p-2">
          <div
            className="h-full"
            style={{ borderRight: "1px dashed lightGray" }}
          >
            <ConsigneeAndBuyerDetails
              data={data?.DispatchBuyer}
              address={data?.DispatchShippingAddress}
              title="buyer"
            />
          </div>
        </div>
        <div className="col-span-2 h-full p-2">
          <div className="h-full flex justify-start items-center">
            <GstAndOtherDetails
              company={data?.DispatchCompanyDetail}
              shipping={data?.DispatchShippingAndOtherDetail}
            />
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-6"
        style={{ borderBottom: "1px dashed lightGray" }}
      >
        <div className="col-span-2 h-full p-2">
          <div
            className="h-full"
            style={{ borderRight: "1px dashed lightGray" }}
          >
            <PortDetails data={data?.DispatchShippingDetail} />
          </div>
        </div>
        <div className="col-span-2 h-full p-2">
          <div
            className="h-full"
            style={{ borderRight: "1px dashed lightGray" }}
          >
            <DestinationDetails data={data?.DispatchShippingDetail} />
          </div>
        </div>
        <div className="col-span-2 h-full p-2">
          <div className="h-full">
            {/* {invoice_type !== "TAX INVOICE" ? ( */}
            <BoxDetails data={data?.DispatchBoxLists} />
            {/* ) : null} */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="h-full p-2">
          <div className="h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
