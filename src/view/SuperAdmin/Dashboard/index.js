import React, { useEffect } from "react";
import Statistic from "./components/Statistic";
import TodaysStatistic from "./components/TodaysStatistics";
import { Loading } from "../../../components/shared";
import LatestDispatch from "./components/LatestDispatch";
import TopProduct from "./components/TopProduct";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "../../../store";
import dashboardReducer from "./store";
import { getSuperAdminDashboardData } from "./store/dataSlice";
import SalesReport from "./components/SalesReport";
import ProductBarChart from "./components/ProductOrder";
import { Card } from "antd";

injectReducer("super_admin_dashboard", dashboardReducer);

const Dashboard = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.super_admin_dashboard.data.dashboardData
  );
  const loading = useSelector(
    (state) => state.super_admin_dashboard.data.loading
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    dispatch(getSuperAdminDashboardData());
  };

  return (
    <Loading loading={loading}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* <div className="col-span-2"> */}
        {/* <SalesReport
            data={data?.chartData?.[0]}
            className="col-span-2 bg-slate-50 mb-2"
          /> */}
        {/* <ProductBarChart /> */}
      </div>
      <div className=" flex flex-col gap-4">
        <Card>
          <h3 className="mb-4">Total Data</h3>
          <Statistic data={data?.statisticData} />
        </Card>

        <Card className="!mt-4">
          <h3 className="mb-4">Todays Data</h3>
          <TodaysStatistic data={data?.statisticData} />
        </Card>
      </div>
      {/* <SalesByCategories data={salesByCategoriesData} /> */}
      {/* </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <TopProduct data={data?.pos} className="h-max" />
        <LatestDispatch
          data={data?.dispatchList}
          className="lg:col-span-2 h-max"
        />
      </div>
    </Loading>
  );
};

export default Dashboard;
