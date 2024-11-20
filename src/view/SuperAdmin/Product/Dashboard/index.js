import React, { useEffect } from "react";
import { Loading } from "../../../../components/shared";
// import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "../../../../store";
import ProductDashboardReducer from "./store";
import Statistic from "./components/Statistics";

import { Card } from "../../../../components/ui";
import SalesReportPerYear from "./components/SalesReportPerYear";
import SalesReportPerMonth from "./components/SalesReportPerMonth";
import CategoryWiseProductReport from "./components/CategoryWiseProductReport";
import TopSellingProduct from "./components/TopSellingProduct";
import { useDispatch } from "react-redux";
import { getAllProductOption } from "./store/dataSlice";
import RevenueGenerate from "./components/RevenueGenearteTable";
import RevenueGenerateTableTools from "./components/RevenueGenerateTableTools";

injectReducer("product_dashboard", ProductDashboardReducer);

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductOption());
  }, [dispatch]);

  return (
    <Loading loading={false}>
      {/* <div className="grid grid-cols-2 gap-4 mb-4"> */}
      {/* <Card> */}
      <Statistic />
      {/* </Card> */}
      <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
        <SalesReportPerYear />
        <SalesReportPerMonth />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
        <CategoryWiseProductReport />
        <TopSellingProduct />
      </div>
      {/* </div> */}

      <Card>
        <RevenueGenerateTableTools />
        <RevenueGenerate />
      </Card>
    </Loading>
  );
};

export default Dashboard;
