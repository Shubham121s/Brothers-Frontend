import React from "react";
import { Layout } from "antd";
import SummaryCards from "../components/SummaryCards";
import PieChart from "../components/PieChart";
import MachineTable from "../components/MachineTable";

const { Header, Content } = Layout;

const DashboardElement = () => {
  // Dummy Data
  const data = {
    machines: 50,
    upcomingMaintenance: 10,
    overdueMaintenance: 5,
    upToDate: 35,
    upcomingCalibrations: 7,
    overdueCalibrations: 3,
    expenses: [
      { month: "Jan", value: 1200 },
      { month: "Feb", value: 1500 },
      { month: "Mar", value: 1000 },
      { month: "Apr", value: 2000 },
    ],
    machineDetails: [
      {
        id: 1,
        name: "Machine A",
        maintenanceStatus: "Up-to-date",
        calibrationStatus: "Upcoming",
        lastMaintenance: "2024-11-01",
        lastCalibration: "2024-11-15",
        expenses: "$200",
      },
      {
        id: 2,
        name: "Machine B",
        maintenanceStatus: "Overdue",
        calibrationStatus: "Overdue",
        lastMaintenance: "2024-09-01",
        lastCalibration: "2024-08-15",
        expenses: "$500",
      },
    ],
  };

  return (
    <Layout>
      <Header style={{ background: "#001529", color: "#fff" }}>
        <h1 style={{ color: "#fff", textAlign: "center" }}>
          Machine Dashboard
        </h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        <SummaryCards data={data} />
        <div style={{ marginTop: "20px" }}>
          <PieChart data={data} />
        </div>
        <div style={{ marginTop: "20px" }}>
          <MachineTable data={data.machineDetails} />
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardElement;
