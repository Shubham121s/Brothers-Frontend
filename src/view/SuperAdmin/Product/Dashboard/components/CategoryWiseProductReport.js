import React, { useState } from "react";
import { Card, Button, Select } from "../../../../../components/ui";

import { Chart } from "../../../../../components/shared";

const CategoryWiseProductReport = ({ className }) => {
  const categoryData = {
    categories: ["FIXED ASSET", "RAW MATERIAL", "FINISH GOODS", "CONSUMABLE"],
    series: [
      {
        name: "Products",
        data: [300, 450, 600, 250], // Corresponding numbers for each category
      },
    ],
  };

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4>Category-Wise Product Report</h4>
        {/* <Button size="sm">Export Report</Button> */}
      </div>
      <Chart
        type="bar"
        series={categoryData.series}
        xAxis={categoryData.categories}
        height="250px"
        customOptions={{
          //   chart: {
          //     toolbar: {
          //       show: true,
          //     },
          //   },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 5,
            },
          },
          colors: ["#1E90FF"],
          xaxis: {
            categories: categoryData.categories,
          },
          //   title: {
          //     text: "Products Distribution Across Categories",
          //     align: "center",
          //     style: {
          //       fontSize: "18px",
          //       fontWeight: "bold",
          //       color: "#263238",
          //     },
          //   },
          legend: {
            show: true,
            position: "bottom",
          },
        }}
      />
    </Card>
  );
};

export default CategoryWiseProductReport;
