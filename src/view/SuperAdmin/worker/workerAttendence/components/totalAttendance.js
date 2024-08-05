import { Card, Avatar } from "../../../../../components/ui";
import { NumericFormat } from "react-number-format";
import { FaWarehouse } from "react-icons/fa";
import {
  getTotalAttendanceById,
  getMonthlyAttendanceById,
} from "../store/dataSlice";
import { GiNotebook } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../../../../utils/hooks/useQuery";
import { useEffect } from "react";
import dayjs from "dayjs";

const StatisticIcon = ({ type }) => {
  switch (type) {
    case "present":
      return (
        <Avatar
          size={55}
          className="bg-indigo-100  text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
          icon={<FaWarehouse />}
        />
      );
    case "absent":
      return (
        <Avatar
          size={55}
          className="bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100"
          icon={<GiNotebook />}
        />
      );
    default:
      return <div></div>;
  }
};

const StatisticCard = ({ data = 0, label, valuePrefix, type }) => {
  return (
    <Card className={``}>
      <div className="flex items-center gap-4">
        <StatisticIcon type={type} />
        <div>
          <div className="flex gap-1.5 items-end mb-2">
            <p className={`font-semibold `}>{label}</p>
          </div>
          <div>
            <h3 className={`font-bold`}>
              <NumericFormat
                displayType="text"
                value={data}
                thousandSeparator=","
                prefix={valuePrefix}
              />
            </h3>
          </div>
        </div>
      </div>
    </Card>
  );
};

const TotalAttendance = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const workerId = query.get("id");
  const totalAttendance = useSelector(
    (state) => state.attendanceList.data.totalAttendance
  );

  const monthlyAttendance = useSelector(
    (state) => state.attendanceList.data.monthlyAttendance
  );

  const { month } = useSelector(
    (state) => state.attendanceList.data.filterData
  );

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = () => {
    dispatch(
      getMonthlyAttendanceById({
        worker_id: workerId,
        month: month,
      })
    );
    dispatch(getTotalAttendanceById({ worker_id: workerId }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <StatisticCard
        data={totalAttendance}
        label="Total Attendance"
        type="present"
      />
      <StatisticCard
        data={monthlyAttendance}
        label="Monthly Attendance"
        type="absent"
      />
    </div>
  );
};
export default TotalAttendance;
