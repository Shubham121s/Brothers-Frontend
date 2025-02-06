import React from "react";
import WeightDetails from "./WeightDetails";
import ShippingDetails from "./ShippingDetails";
import BankDetails from "./BankDetails";
import Signature from "./Signature";
import Note from "./Note";

const Footer = ({ data }) => {
  return (
    <>
      <div
        className="grid grid-cols-6"
        style={{ borderBottom: "1px dashed lightGray" }}
      >
        {/* <div className='col-span-2 h-full p-2' >
                    <div className='h-full' style={{ borderRight: '1px dashed lightGray' }}>
                        <WeightDetails data={data} />
                    </div>
                </div> */}
        {/* <div className="col-span-2 h-full p-2">
          <div
            className="h-full"
            style={{ borderRight: "1px dashed lightGray" }}
          >
            <ShippingDetails data={data?.DispatchShippingAndOtherDetail} />
          </div>
        </div> */}
        <div className="col-span-4 h-full p-2">
          <div className="h-full">
            <BankDetails data={data?.DispatchBankDetail} />
          </div>
        </div>
      </div>
      <div>
        <small>
          We certify that (a) all other details as per openers purchase order We
          further hereby certify that manufacturer, producer & suppliers of
          above goods is BROTHERS INDUSTRIES, PLOT NO.119,INDUSTRIAL
          ESTATE,PALUS,SANGLI-416 310, INDIA.
          <br />
          <br />
          Declaration : We declare that this invoice shows the actual price of
          goodS described and that all particulars are true and correct.
          <br />
          # Letter of Undertaking ARN = AD2704240256461
          <br />
          # I/We, in regard to my/our claim under RoDTEP scheme made in this
          Shipping Bill or Bill of Export, hereby declare that: 1. I/ We
          undertake to abide by the provisions, including conditions,
          restrictions, exclusions and time-limits as provided under RoDTEP
          scheme, and relevant notifications, regulations, etc., as amended from
          time to time.
          <br />
          2. Any claim made in this shipping bill or bill of export is not with
          respect to any duties or taxes or levies which are exempted or
          remitted or credited under any other mechanism outside RoDTEP.
          <br />
          3. I/We undertake to preserve and make available relevant documents
          relating to the exported goods for the purposes of audit in the manner
          and for the time period prescribed in the Customs Audit Regulations,
          2018.”
        </small>
      </div>
      <div
        className="flex justify-end"
        style={{ borderBottom: "1px dashed lightGray" }}
      >
        {/* <div className='col-span-4 h-full p-2' >
                    <div className='h-full' style={{ borderRight: '1px dashed lightGray' }}>
                        <Note data={data?.DispatchNote} />
                    </div>
                </div> */}
        <div className="col-span-2 h-full p-2">
          <div className="h-full">
            <Signature />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
