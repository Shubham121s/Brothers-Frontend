import React, { useRef } from "react";
import { Table } from "../../../../../components/ui";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const { Tr, Th, Td, THead, TBody } = Table;

const GRNInvoice = () => {
  const data = useSelector((state) => state.grn.state.purchaseOrderList);
  const initialData = useSelector((state) => state.grn.data.inwardDetails);
  return (
    <>
      <div className=" px-2" style={{ marginLeft: "30px" }}>
        <h3 className="text-center">GRN</h3>
        {/* <div className="flex justify-between">
          <div></div>
          <div>
            <div className="text-3xl font-semibold mb-5 text-center">GRN</div>
          </div>
          <div className="w-[50px]">
            <img src={image} alt="logo" width={120} />
          </div>
        </div> */}
        <div className="flex gap-5 mb-0">
          <div>GRN </div>
          <div className="font-bold">{initialData?.inward_no}</div>
        </div>
        <div className="flex gap-5 my-5">
          <div>GRN Date </div>
          <div className="font-bold">{dayjs().format("YYYY-MM-DD")}</div>
        </div>
        <div className="flex justify-between items-center gap-5">
          <div className="bg-slate-100 w-3/5 p-3" style={{ height: "150px" }}>
            <div className="flex justfy-between gap-5">
              <div>Received by</div>
              <div className="font-bold">Brother Industries</div>
            </div>
            <div className="flex justfy-between gap-5">
              <div>Address</div>
              <div className="font-bold">
                DR PK INDUSTRIAL ESTATE, TAL PALUS, DIST SANGLI, MAHARASTRA, PIN
                416310{" "}
              </div>
            </div>
            <div className="flex justfy-between gap-5">
              <div>Contact</div>
              <div className="font-bold">91 99201391010 </div>
            </div>
          </div>

          <div className="bg-slate-100 w-3/5 p-3" style={{ height: "150px" }}>
            <div className="flex gap-5">
              <div>Supplier</div>
              <div className="font-bold">{initialData?.Customer?.name}</div>
            </div>
            <div className="flex gap-5">
              <div>Address</div>
              <div className="font-bold">
                {initialData?.Customer?.CustomerPermanentAddress?.address}
              </div>
            </div>
            <div className="flex gap-5">
              <div>Contact</div>
              <div className="font-bold">
                {initialData?.Customer?.mobile || initialData?.Customer?.phone}{" "}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="my-5 ">
          <div>
            RESPECTED SIR,
            <br />
            <span className="ml-5 font-bold ">
              THANK YOU FOR YOUR ENQUIRY, WE ARE PLEASED TO SUBMIT OUR LOWEST
              QUOTATION AS FOLLOWS:
            </span>
          </div>
        </div> */}
        <div className="mt-5">
          <Table>
            <THead>
              <Tr className="bg-slate-100 ">
                <Th className="border" style={{ color: "black" }}>
                  Product Code
                </Th>
                <Th className="border" style={{ color: "black" }}>
                  Product
                </Th>

                <Th className="border" style={{ color: "black" }}>
                  PO Qty
                </Th>

                <Th className="border" style={{ color: "black" }}>
                  Inward Qty
                </Th>
                <Th className="border" style={{ color: "black" }}>
                  Rejected Qty
                </Th>

                <Th className="border" style={{ color: "black" }}>
                  Comments
                </Th>
              </Tr>
            </THead>
            <TBody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td className="border">{item?.Product?.product_code}</Td>
                  <Td className="border">{item?.Product?.name}</Td>
                  <Td className="border">{item?.ordered_quantity}</Td>
                  <Td className="border">{item?.actual_quantity}</Td>
                  <Td className="border">{item?.rejected_quantity}</Td>
                  <Td className="border">{item?.comments}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
        {/* <div className="flex mt-3">
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
            <p>Invoice Total (in words)</p>
            <p className=" font-semibold mb-2">Ninity Thousand Rupees Only</p>
            <hr />
            <p className="font-bold ml-[50%]" style={{ marginTop: "40%" }}>
              Authorized Signature
            </p>
          </div>
        </div> */}
        <p className="font-bold ml-[50%]" style={{ marginTop: "10%" }}>
          Authorized Signature
        </p>
      </div>
    </>
  );
};

export default GRNInvoice;
