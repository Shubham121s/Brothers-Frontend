import React, { useState } from "react";
import { Card, Button, Select } from "../../../../components/ui";
import { Chart } from "../../../../components/shared";

const ProductBarChart = ({ className }) => {
  const dailyData = {
    date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [{ name: "Orders", data: [50, 80, 65, 90, 120, 70, 100] }],
  };

  const monthlyData = {
    date: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [
      {
        name: "Orders",
        data: [
          1200, 1500, 1700, 2000, 1900, 2100, 1800, 2200, 2000, 2400, 2300,
          2500,
        ],
      },
    ],
  };

  const [viewMode, setViewMode] = useState("daily"); // State for toggle
  const data = viewMode === "daily" ? dailyData : monthlyData;

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4>Sales Report (Bar Chart)</h4>
        <div className="flex items-center space-x-2">
          <Select
            value={viewMode}
            onChange={(value) => setViewMode(value)}
            options={[
              { label: "Per Day", value: "daily" },
              { label: "Per Month", value: "monthly" },
            ]}
            size="sm"
          />
          <Button size="sm">Export Report</Button>
        </div>
      </div>
      <Chart
        type="bar" // Bar chart type
        series={data.series}
        xAxis={data.date}
        height="250px"
        customOptions={{ legend: { show: false } }}
      />
    </Card>
  );
};

export default ProductBarChart;
