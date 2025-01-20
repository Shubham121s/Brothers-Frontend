import React from "react";
import { Table, Card } from "antd";

const MachineTable = () => {
  const data = [
    {
      id: 1,
      name: "Machine A",
      maintenanceStatus: "Up-to-date",
      calibrationStatus: "Upcoming",
      lastMaintenance: "2024-11-01",
      lastCalibration: "2024-11-15",
      expenses: "₹200",
    },
    {
      id: 2,
      name: "Machine B",
      maintenanceStatus: "Overdue",
      calibrationStatus: "Overdue",
      lastMaintenance: "2024-09-01",
      lastCalibration: "2024-08-15",
      expenses: "₹500",
    },
    {
      id: 3,
      name: "Machine C",
      maintenanceStatus: "Upcoming",
      calibrationStatus: "Up-to-date",
      lastMaintenance: "2024-11-10",
      lastCalibration: "2024-11-25",
      expenses: "₹300",
    },
    {
      id: 4,
      name: "Machine D",
      maintenanceStatus: "Overdue",
      calibrationStatus: "Upcoming",
      lastMaintenance: "2024-08-20",
      lastCalibration: "2024-09-10",
      expenses: "₹450",
    },
  ];

  const columns = [
    {
      title: "Machine Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Maintenance Status",
      dataIndex: "maintenanceStatus",
      key: "maintenanceStatus",
    },
    {
      title: "Calibration Status",
      dataIndex: "calibrationStatus",
      key: "calibrationStatus",
    },
    {
      title: "Last Maintenance",
      dataIndex: "lastMaintenance",
      key: "lastMaintenance",
    },
    {
      title: "Last Calibration",
      dataIndex: "lastCalibration",
      key: "lastCalibration",
    },
    {
      title: "Expenses",
      dataIndex: "expenses",
      key: "expenses",
      align: "right",
    },
  ];

  return (
    <>
      <h4 className="mb-4">Machine Details</h4>
      <Table dataSource={data} columns={columns} rowKey="id" bordered />
    </>
  );
};

export default MachineTable;
