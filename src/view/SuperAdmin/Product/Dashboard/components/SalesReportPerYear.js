import React, { useEffect, useState } from "react";
import { Card, Button, Select } from "../../../../../components/ui";
import { Chart } from "../../../../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { getProductYearlySalesQuantity } from "../store/dataSlice";

const SalesReportPerYear = ({ className }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState(null);

  const yearlySales = useSelector(
    (state) => state.product_dashboard.data.productYearlySalesList
  );
  const products = useSelector(
    (state) => state.product_dashboard.data.productList
  );

  // const dummyData = {
  //   all: {
  //     year: "2024",
  //     prices: [25000],
  //   },
  //   productA: {
  //     year: "2024",
  //     prices: [10000],
  //   },
  //   productB: {
  //     year: "2024",
  //     prices: [15000],
  //   },
  // };

  const data = [
    {
      name: "Quantity",
      data: yearlySales.quantity || [],
    },
  ];

  useEffect(() => {
    fetchData();
  }, [product]);

  const fetchData = async () => {
    dispatch(getProductYearlySalesQuantity({ product_id: product }));
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
            placeholder="Select Product"
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
              categories: yearlySales.years || [],
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
              } Yearly Sales`,
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

export default SalesReportPerYear;
