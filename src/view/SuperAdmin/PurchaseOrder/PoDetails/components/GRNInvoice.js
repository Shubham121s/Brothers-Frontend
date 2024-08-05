import React, { useRef } from "react";
import { Table } from "../../../../../components/ui";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const { Tr, Th, Td, THead, TBody } = Table;

const GRNInvoice = ({ initialData }) => {
  const grnDetails = useSelector((state) => state.accept_po.data.grnDetails);

  return (
    <>
      <div className="mx-[5%] px-3">
        <h2 className="text-center mt-10">GOODS RECEIVED NOTE</h2>
        <hr className="border-2 border-black my-4" />
        <div className="mt-10">
          <span className="font-bold">GRN NUMBER :</span> <span>GRN-001</span>
        </div>
        <div>
          <span className="font-bold">DATE :</span> <span>123</span>
        </div>
        <div className="flex justify-between mt-[4%]">
          <div>
            <h4 className="mb-4">DELIVERY INFORMATION :</h4>
            <p>DELIVERY NOTE NUMBER :</p>
            <p>DELIVERY DATE :</p>
            <p>CARRIER/DRIVER NAME :</p>
          </div>
          <div>
            <h4 className="mb-4">SUPPLIER INFORMATION </h4>
            <p>SUPPLIER NAME : {initialData?.Customer?.name}</p>
            <p>SUPPLIER ADDRESS : {initialData?.Customer?.address}</p>
            <p>CARRIER/DRIVER NAME : Gopal Das</p>
          </div>
        </div>
        <div>
          <h4 className="my-8">RECEIVED BY:</h4>
          <p className="font-bold">NAME :</p>
          <p className="font-bold">Receiving Department</p>
        </div>
        <div className="text-center text-white bg-blue-800 mt-8 text-xl">
          RECEIVED ITEMS
        </div>
        <div>
          <Table compact>
            <THead>
              <Tr>
                <Th className="">ITEM CODE</Th>
                <Th className="">Product</Th>
                <Th className="">QUANTITY ORDERED</Th>
                <Th className="">QUANTITY RECEIVED</Th>
                <Th className="">ACCEPTED QUANTITY</Th>
                <Th className="">REJECTED QUANTITY</Th>
                <Th className="">UNIT PRICE</Th>
                <Th className="">TOTAL PRICE</Th>
              </Tr>
            </THead>
            <TBody className="">
              {grnDetails?.map((item, index) => (
                <Tr key={index}>
                  <Td>{item?.PurchaseOrderList?.Product?.item_code}</Td>
                  <Td>{item?.PurchaseOrderList?.Product?.name}</Td>
                  <Td>{item?.PurchaseOrderList?.quantity}</Td>
                  <Td>{item?.received_quantity}</Td>
                  <Td>
                    {Math.abs(
                      item?.received_quantity - item?.rejected_quantity
                    )}
                  </Td>
                  <Td>{item?.rejected_quantity}</Td>
                  <Td>{item?.PurchaseOrderList?.price}</Td>
                  <Td>{item?.PurchaseOrderList?.amount}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
        <div className="mt-8 flex">
          <h6 className=" border w-[30%] p-2 bg-slate-100 ">
            TOTAL ITEMS RECEIVED
          </h6>
          <span className="border  w-[25%] p-2"></span>
        </div>
        <div className="flex">
          <h6 className=" border w-[30%] p-2 bg-slate-100">TOTAL AMOUNT:</h6>
          <span className="border w-[25%] p-2"></span>
        </div>
      </div>
    </>
  );
};

export default GRNInvoice;
