import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Select } from "../../../../../components/ui";

const CustomerWiseWeeklySalesChart = () => {
  const [customer, setCustomer] = useState(null);
  const [customerName, setCustomerName] = useState(null);

  // Dummy data for weekly sales
  const weeklySales = {
    revenue: [5000, 7000, 4500, 8000, 6500, 9000, 10000], // Weekly sales revenue
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  };

  const customerSales = {
    1: [4000, 6000, 4500, 7000, 6500, 8000, 9500], // Customer A
    2: [5000, 7000, 4800, 7500, 6200, 8500, 9900], // Customer B
    3: [5500, 7500, 5000, 8000, 6700, 8900, 10200], // Customer C
  };

  const CustomerOption = [
    { label: "Customer A", value: "1" },
    { label: "Customer B", value: "2" },
    { label: "Customer C", value: "3" },
  ];

  const data = [
    {
      name: "Net Sales ₹",
      data: customerSales[customer] || weeklySales.revenue,
    },
  ];

  const handleChange = (e) => {
    setCustomer(e.value);
    setCustomerName(e.label);
  };

  return (
    <>
      <div className="grid grid-cols-3 mb-4">
        <Select
          placeholder="Select customer"
          size="sm"
          options={CustomerOption}
          value={CustomerOption.filter((cust) => cust.value === customer)}
          onChange={handleChange}
        />
        <div></div>
      </div>
      <Chart
        options={{
          dataLabels: {
            offsetY: -25,
            style: {
              fontSize: "12px",
            },
          },
          chart: {
            stacked: true,
            toolbar: {
              show: true,
              tools: {
                download: false,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
              },
            },
            zoom: {
              enabled: true,
            },
          },
          colors: ["#FFA07A"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: "round",
              borderRadius: 8,
            },
          },
          xaxis: {
            categories: weeklySales.days,
          },
          legend: {
            position: "right",
            offsetY: 40,
          },
          fill: {
            opacity: 1,
          },
          title: {
            text: `${
              customer ? `${customerName}` : "All Customers"
            } Weekly Sales`,
            align: "center",
            style: {
              fontSize: "20px",
              fontWeight: "normal",
              color: "#263238",
            },
          },
        }}
        series={data}
        type="bar"
        height={300}
      />
    </>
  );
};

export default CustomerWiseWeeklySalesChart;
