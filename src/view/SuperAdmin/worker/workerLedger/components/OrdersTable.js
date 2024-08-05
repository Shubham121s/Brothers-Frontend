import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Card, Table, Badge } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import dayjs from "dayjs";

const { Tr, Th, Td, THead, TBody } = Table;
const RetailerOrdersTable = () => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.classList.add("slide-in");
    }
  }, []);

  //   const data = useSelector((state) => state.order.state.selectedProducts);

  const statusColor = {
    1: {
      label: "Confirmed",
      dotClass: "bg-emerald-500",
      textClass: "text-emerald-500",
    },
    2: {
      label: "Pending",
      dotClass: "bg-yellow-500",
      textClass: "text-yellow-500",
    },
    3: {
      label: "Rejected",
      dotClass: "bg-red-500",
      textClass: "text-red-500",
    },
  };

  const billStatusColor = {
    1: {
      label: "Paid",
      dotClass: "bg-emerald-500",
      textClass: "text-emerald-500",
    },
    2: {
      label: "Pending",
      dotClass: "bg-yellow-500",
      textClass: "text-yellow-500",
    },
    3: {
      label: "Rejected",
      dotClass: "bg-red-500",
      textClass: "text-red-500",
    },
  };

  const ordersData = [
    {
      order_id: 1,
      buyer_name: "John Doe",
      order_status: 1,
      bill_amount: 500.0,
      pending_amount: 200.0,
      bill_status: 1,
      order_date: "2023-01-01",
    },
    {
      order_id: 2,
      buyer_name: "Jane Doe",
      order_status: 2,
      bill_amount: 800.0,
      pending_amount: 0.0,
      bill_status: 2,
      order_date: "2023-02-15",
    },
    {
      order_id: 3,
      buyer_name: "Alex Smith",
      order_status: 3,
      bill_amount: 1200.0,
      pending_amount: 500.0,
      bill_status: 3,
      order_date: "2023-03-20",
    },
    {
      order_id: 4,
      buyer_name: "Emily Johnson",
      order_status: 1,
      bill_amount: 600.0,
      pending_amount: 0.0,
      bill_status: 1,
      order_date: "2023-04-10",
    },
  ];
  return (
    <div ref={tableRef}>
      <Card>
        <Table>
          <THead>
            <Tr>
              <Th>Order</Th>
              <Th>Name</Th>
              <Th>Order Status</Th>
              <Th>Bill Amount</Th>
              <Th>Pending Amount</Th>
              <Th>Bill Status</Th>
              <Th>Order Date</Th>
            </Tr>
          </THead>
          <TBody>
            {ordersData?.map((m) => (
              <Tr>
                <Td>{m?.order_id}</Td>
                <Td>{m?.buyer_name}</Td>
                <Td>
                  <div className="flex items-center">
                    <Badge className={statusColor[m?.order_status].dotClass} />
                    <span
                      className={`ml-2 font-semibold capitalize ${
                        statusColor[m?.order_status].textClass
                      }`}
                    >
                      {statusColor[m?.order_status].label}
                    </span>
                  </div>
                </Td>
                <Td>₹ {m?.bill_amount}</Td>
                <Td>₹ {m?.pending_amount}</Td>
                <Td>
                  <div className="flex items-center">
                    <Badge
                      className={billStatusColor[m?.bill_status].dotClass}
                    />
                    <span
                      className={`ml-2 font-semibold capitalize ${
                        billStatusColor[m?.bill_status].textClass
                      }`}
                    >
                      {billStatusColor[m?.bill_status].label}
                    </span>
                  </div>
                </Td>
                <Td>{dayjs(m?.order_date).format("YYYY-MM-DD")}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
};
export default RetailerOrdersTable;
