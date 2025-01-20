import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "antd";

const PieChart = () => {
  const data = {
    machines: 50,
    upcomingMaintenance: 10, // Machines with upcoming maintenance
    overdueMaintenance: 5, // Machines with overdue maintenance
    upToDate: 35, // Machines that are up-to-date
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

  const pieChartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Up-to-Date", "Overdue Maintenance", "Upcoming Maintenance"],
    colors: ["#36A2EB", "#FF6384", "#FFCE56"],
    legend: {
      position: "bottom",
    },
  };

  const pieChartData = [
    data.upToDate,
    data.overdueMaintenance,
    data.upcomingMaintenance,
  ];

  return (
    <>
      <h4 className="mb-4">Machine Status Distribution</h4>
      <ReactApexChart
        options={pieChartOptions}
        series={pieChartData}
        type="pie"
        height={350}
      />
    </>
  );
};

export default PieChart;
