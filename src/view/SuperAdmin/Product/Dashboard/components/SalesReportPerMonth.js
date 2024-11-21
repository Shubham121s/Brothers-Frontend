import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, Select } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { getProductMonthlySalesQuantity } from "../store/dataSlice";

const SalesReportPerMonth = ({ className }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState(null);

  const monthlySales = useSelector(
    (state) => state.product_dashboard.data.productMonthlySalesList
  );
  const products = useSelector(
    (state) => state.product_dashboard.data.productList
  );

  const data = [
    {
      name: "Quantity",
      data: monthlySales.quantity || [],
    },
  ];

  useEffect(() => {
    fetchData();
  }, [product]);

  const fetchData = async () => {
    dispatch(getProductMonthlySalesQuantity({ product_id: product }));
  };

  const handleChange = (selected) => {
    setProduct(selected.value);
    setProductName(selected.label);
  };

  return (
    <>
      <Card className={className}>
        <div className="grid grid-cols-3 mb-4">
          <Select
            placeholder="Select customer"
            size="sm"
            options={products}
            value={products.find((prod) => prod.value === product)}
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
            colors: ["#DA70D6"],
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
              categories: monthlySales.months || [],
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
                product ? `${productName}` : "All Products"
              } Monthly Sales`,
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
      </Card>
    </>
  );
};

export default SalesReportPerMonth;
