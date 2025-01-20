import React from "react";
import { Card } from "../../../../components/ui";
import { NumericFormat } from "react-number-format";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaFileInvoiceDollar,
  FaBoxes,
} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineFileDone, AiOutlineUsergroupAdd } from "react-icons/ai";

const StatisticCard = ({
  data = 0,
  label,
  valuePrefix,
  className,
  Icon,
  iconBg,
  iconColor,
}) => {
  return (
    <Card
      className={`h-max rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div
          className={`w-14 h-14 flex items-center justify-center rounded-full ${iconBg} shadow-md`}
        >
          {Icon && <Icon size={30} color={iconColor} />}
        </div>
        {/* Text Content */}
        <div>
          <h4 className="font-medium text-gray-600 mb-1 text-sm">{label}</h4>
          <h3 className="font-bold text-xl">
            <NumericFormat
              displayType="text"
              value={data}
              thousandSeparator
              prefix={valuePrefix}
            />
          </h3>
        </div>
      </div>
    </Card>
  );
};

const Statistic = ({ data = {} }) => {
  return (
    <div className="grid grid-cols-4 gap-6 h-max">
      <StatisticCard
        data={data.revenue}
        valuePrefix="₹"
        label="Revenue"
        className="bg-pink-50"
        Icon={FaMoneyBillWave}
        iconBg="bg-pink-100"
        iconColor="#E91E63"
      />
      <StatisticCard
        data={data.TotalOrders}
        label="Orders"
        className="bg-emerald-50"
        Icon={FaShoppingCart}
        iconBg="bg-emerald-100"
        iconColor="#4CAF50"
      />
      <StatisticCard
        data={data.totalInvoice}
        label="Invoices"
        className="bg-rose-50"
        Icon={FaFileInvoiceDollar}
        iconBg="bg-rose-100"
        iconColor="#F44336"
      />
      <StatisticCard
        data={data.Purchases}
        valuePrefix="₹"
        label="Purchases"
        className="bg-orange-50"
        Icon={GiTakeMyMoney}
        iconBg="bg-orange-100"
        iconColor="#FF9800"
      />
      <StatisticCard
        data={data.foreignInvoice}
        label="Foreign Invoice"
        className="bg-blue-50"
        Icon={MdOutlineLocalShipping}
        iconBg="bg-blue-100"
        iconColor="#2196F3"
      />
      <StatisticCard
        data={data.domesticInvoice}
        label="Domestic Invoice"
        className="bg-green-50"
        Icon={AiOutlineFileDone}
        iconBg="bg-green-100"
        iconColor="#8BC34A"
      />
      <StatisticCard
        data={data.pendingPOs}
        label="Pending PO's"
        className="bg-rose-50"
        Icon={AiOutlineFileDone}
        iconBg="bg-red-100"
        iconColor="#FF5722"
      />
      <StatisticCard
        data={data.TotalCustomers?.customer}
        label="Customer"
        className="bg-orange-50"
        Icon={BsFillPeopleFill}
        iconBg="bg-yellow-100"
        iconColor="#FFC107"
      />
      <StatisticCard
        data={data.TotalCustomers?.supplier}
        label="Supplier"
        className="bg-emerald-50"
        Icon={AiOutlineUsergroupAdd}
        iconBg="bg-teal-100"
        iconColor="#009688"
      />
    </div>
  );
};

export default Statistic;
