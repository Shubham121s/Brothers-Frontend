import React, { useEffect } from "react";
import { Loading } from "../../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "../../../store";
import instrumentDashboardReducer from "./store";
// import CalibrationNearToDate from './components/calibrationNearToDate'
import { Card } from "../../../components/ui";
// import CalibrationPieChart from './components/CalibrationPieChart'
import { getInstrumentstaticData } from "./store/dataSlice";
import SummaryCards from "./components/SummaryCard";
import PieChart from "./components/PieChart";
import MachineTable from "./components/MachineTable";
// import Statistic from './components/Statistic'

injectReducer("instrument_dashboard", instrumentDashboardReducer);

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInstrumentstaticData());
  }, []);

  const data = useSelector(
    (state) => state.instrument_dashboard.data.staticData
  );
  return (
    <Loading loading={false}>
      {/* <Statistic data={data} /> */}
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="">
          {/* <CalibrationNearToDate /> */}
          <PieChart />
        </Card>
        <Card className="col-span-2">
          {/* <CalibrationPieChart data={data?.pieChartData} /> */}

          <MachineTable />
        </Card>
        {/* <LatestDispatch data={data?.dispatchList} className="lg:col-span-2 h-max" /> */}
      </div>
    </Loading>
  );
};

export default Dashboard;
