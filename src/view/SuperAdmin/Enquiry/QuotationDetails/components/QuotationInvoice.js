import React, { useRef } from "react";
import { Table } from "../../../../../components/ui";
import { useSelector } from "react-redux";
import image from "./vaishnaviProfile.png";
import dayjs from "dayjs";
const { Tr, Th, Td, THead, TBody } = Table;
const QuotationInvoice = () => {
  const data = useSelector(
    (state) => state.quotation_detail.data.quotationList
  );

  const totalAmount = data.reduce(
    (acc, curr) => Number(curr.final_amount) + acc,
    0
  );
  const details = useSelector(
    (state) => state.quotation_detail.data.quotationDetails
  );
  return (
    <>
      <div className="mx-5 px-2">
        <div className="flex justify-between">
          <div></div>
          <div>
            <div className="text-3xl font-semibold mb-5 text-center">
              Quotation
            </div>
          </div>
          <div className="w-[50px]">
            <img src={image} alt="logo" width={120} />
          </div>
        </div>
        <div className="flex gap-5 mb-0">
          <div>Quotation </div>
          <div className="font-bold">{details.quotation_number}</div>
        </div>
        <div className="flex gap-5 my-5">
          <div>Quotation Date </div>
          <div className="font-bold">
            {dayjs(details?.createdAt).format("YYYY-MM-DD")}
          </div>
        </div>
        <div className="flex justify-between items-center gap-5">
          <div className="bg-slate-100 w-3/5 p-3">
            <div className="flex justfy-between gap-5">
              <div>Quotation by</div>
              <div className="font-bold">Vaishnavi Profile Pvt. Ltd.</div>
            </div>
            <div className="flex justfy-between gap-5">
              <div>Address</div>
              <div className="font-bold">
                GAT NO-2091, NEAR ASHIRWAD COLONY, KIRLOSKARWADI ROAD PALUS. PIN
                416308 GST NO-27AAJFV9287F1ZH{" "}
              </div>
            </div>
            <div className="flex justfy-between gap-5">
              <div>Contact</div>
              <div className="font-bold">9272449594 </div>
            </div>
          </div>

          <div className="bg-slate-100 w-3/5 p-5" style={{ height: "150px" }}>
            <div className="flex gap-5">
              <div>Quotation to</div>
              <div className="font-bold">{details?.Enquiry?.Customer.name}</div>
            </div>
            <div className="flex gap-5">
              <div>Address</div>
              <div className="font-bold">
                {details?.Enquiry?.Customer?.CustomerPermanentAddress?.address}
              </div>
            </div>
            <div className="flex gap-5">
              <div>Contact</div>
              <div className="font-bold">
                {details?.Enquiry?.Customer.mobile}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 ">
          <div>
            RESPECTED SIR,
            <br />
            <span className="ml-5 font-bold ">
              THANK YOU FOR YOUR ENQUIRY, WE ARE PLEASED TO SUBMIT OUR LOWEST
              QUOTATION AS FOLLOWS:
            </span>
          </div>
        </div>
        <div>
          <Table>
            <THead>
              <Tr className="bg-black text-white">
                <Th className="border" style={{ color: "white" }}>
                  SR No.
                </Th>
                <Th className="border" style={{ color: "white" }}>
                  Drawing Number
                </Th>
                <Th className="border" style={{ color: "white" }}>
                  Part No.
                </Th>
                <Th className="border" style={{ color: "white" }}>
                  Part Name
                </Th>
                <Th className="border" style={{ color: "white" }}>
                  Part Type
                </Th>
                <Th className="border" style={{ color: "white" }}>
                  Each Rate
                </Th>
                <Th className="border" style={{ color: "white" }}>
                  Qty
                </Th>
                <Th className="border" style={{ color: "white" }}>
                  Total Amount
                </Th>
              </Tr>
            </THead>
            <TBody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td className="border">{index + 1}</Td>
                  <Td className="border">{item.drawing_number}</Td>
                  <Td className="border">{item.part_number}</Td>
                  <Td className="w-[60%] border">{item.part_name}</Td>

                  <Td className="border">{item.part_type}</Td>
                  <Td className="border">{item.each_rate}</Td>
                  <Td className="border">{item.quantity}</Td>
                  <Td className="border">{item.final_amount}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
        <div className="flex mt-3">
          <div className="my-2 gap-2 " style={{ width: "540px" }}>
            <h4 className="mb-4">Terms and Conditions</h4>
            <p>
              1. Delivery - ex.work delivery time- To be Submitted based on
              Requirement.
            </p>
            <p>2. Payment term - 30 Days from Invoice.</p>
            <p>
              3.Quotation validity for only two days (rate will depend on market
              prices of raw materials).
            </p>
            <p>4. Loading charges 0.25 paisa per kg extra applicable.</p>
            <p>5. Material as per your requirement.</p>
            <p>6. We will provide material MTC.sr report, sb,rt report.</p>
            <p>7. Transport-charges extra.</p>
            <p>8. If NABL test required then charges will be extra.</p>
          </div>
          <div className="my-2" style={{ width: "200px" }}>
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Subtotal</div>
              <div className="text-lg font-semibold">{totalAmount || 0}</div>
            </div>
            <hr />

            <div className="flex justify-between my-2">
              <div className="text-lg font-semibold">Total</div>
              <div className="text-lg font-semibold">{totalAmount || 0}</div>
            </div>
            {/* <p>Invoice Total (in words)</p>
            <p className=" font-semibold mb-2">Ninity Thousand Rupees Only</p> */}
            <hr />
            <p className="font-bold ml-[50%]" style={{ marginTop: "40%" }}>
              Authorized Signature
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotationInvoice;
