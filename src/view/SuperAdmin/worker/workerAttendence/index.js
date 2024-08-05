import React, { useState } from "react";
import AttendanceTable from "./components/attendanceTable";
import CalenderForm from "./components/calanderform";
import TotalAttendance from "./components/totalAttendance";
import { Card } from "../../../../components/ui";
import { injectReducer } from "../../../../store";
import attendanceDetailReducer from "./store/index";
import { AdaptableCard } from "../../../../components/shared";
import dayjs from "dayjs";

injectReducer("attendanceList", attendanceDetailReducer);

const Attendance = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <h4 className="mb-4">Mark Attendance</h4>
      <div className="mt-4"></div>
      <div className="mt-4">
        <TotalAttendance />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <CalenderForm />
        </div>
        <div className="col-span-2">
          <Card>
            <AttendanceTable />
          </Card>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default Attendance;
