import React, { useEffect, useState } from "react";
import { Card, Button, Select } from "../../../../../components/ui";

import { Chart } from "../../../../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../store/dataSlice";

const CategoryWiseProductReport = ({ className }) => {
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (state) => state.product_dashboard.data.productByCategoryList
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(getProductsByCategory());
  };

  const data = [
    {
      name: "Quantity",
      data: categoryData.QUANTITY || [],
    },
  ];

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h4>Category-Wise Product Report</h4>
        {/* <Button size="sm">Export Report</Button> */}
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
          colors: ["#1E90FF"],
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
            categories: categoryData.CATEGORY || [],
          },
          legend: {
            position: "right",
            offsetY: 40,
          },
          fill: {
            opacity: 1,
          },
        }}
        series={data}
        type="bar"
        height={300}
      />
    </Card>
  );
};

export default CategoryWiseProductReport;
