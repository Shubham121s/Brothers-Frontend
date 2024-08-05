import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Button,
  Toast,
  Input,
  Notification,
} from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  PostAttendanceById,
  getAttendanceById,
  getMonthlyAttendanceById,
  getTotalAttendanceById,
  setFilterData,
} from "../store/dataSlice";
import { Calendar } from "../../../../../components/ui/DatePicker";
import useQuery from "../../../../../utils/hooks/useQuery";
import dayjs from "dayjs";

const CalenderForm = () => {
  const [value, setValue] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const q = useQuery();
  const workerId = q.get("id");

  const dispatch = useDispatch();
  const { month } = useSelector(
    (state) => state.attendanceList.data.filterData
  );

  const onAttendance = (val) => {
    setAttendance(val);
  };
  const onsubmit = async () => {
    setLoading(true);
    if (!value) {
      Toast.push(
        <Notification title={"Select Date"} type="warning" duration={2500}>
          Please Select Date
        </Notification>,
        {
          placement: "top-end",
        }
      );
      setLoading(false);
    }
    if (attendance === null) {
      Toast.push(
        <Notification title={"Mark Attendance"} type="warning" duration={2500}>
          Mark Attendance
        </Notification>,
        {
          placement: "top-end",
        }
      );
      setLoading(false);
    }

    if (value && attendance != null) {
      const action = await dispatch(
        PostAttendanceById({
          worker_id: workerId,
          worker_attended: attendance,
          date: dayjs(value).format("YYYY-MM-DD"),
          reason: reason,
        })
      );
      if (action.payload.success === true) {
        Toast.push(
          <Notification title={"Success"} type="success" duration={2500}>
            Attendance Marked
          </Notification>,
          {
            placement: "top-end",
          }
        );
        setValue(null);
        setLoading(false);
        setAttendance(null);
        dispatch(
          getAttendanceById({
            worker_id: workerId,
            month: month,
          })
        );
        dispatch(
          getMonthlyAttendanceById({
            worker_id: workerId,
            month: month,
          })
        );
        dispatch(getTotalAttendanceById({ worker_id: workerId }));
      } else {
        Toast.push(
          <Notification title={"Failed"} type="danger" duration={2500}>
            {action.payload.data?.message}
          </Notification>,
          {
            placement: "top-end",
          }
        );
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <div className="sm:w-[100px] max-w-[420px] mx-auto">
        <Calendar
          value={value}
          onChange={setValue}
          onMonthChange={(e) =>
            dispatch(setFilterData({ month: dayjs(e).format("YYYY-MM-DD") }))
          }
          dayClassName={(date, { selected }) => {
            if (selected) {
              return "text-white";
            }

            return "text-gray-700 dark:text-gray-200 ";
          }}
          // dayStyle={(date, { selected, outOfMonth }) => {
          //   const dayOfMonth = date.getDate();
          //   if (arr.includes(dayOfMonth) && !selected) {
          //     return { color: "#15c39a", height: 48 };
          //   }
          //   if (dayOfMonth === 2 && !selected) {
          //     return { color: "#FF0000", height: 48 };
          //   }

          //   if (outOfMonth) {
          //     return {
          //       opacity: 0,
          //       pointerEvents: "none",
          //       cursor: "default",
          //       height: 48,
          //     };
          //   }

          //   return { height: 48 };
          // }}
        />
      </div>
      <div className="flex gap-2 justify-center mt-3">
        <Button
          className=" mb-2"
          variant={attendance === "present" ? "twoTone" : "solid"}
          color="emerald-600"
          onClick={() => onAttendance("present")}
        >
          Present
        </Button>
        <Button
          className=" mb-2"
          variant={attendance == "absent" ? "twoTone" : "solid"}
          color="red-600"
          onClick={() => onAttendance("absent")}
        >
          Absent
        </Button>
        <Button
          className=" mb-2"
          variant={attendance == "halfday" ? "twoTone" : "solid"}
          color="yellow-500"
          onClick={() => onAttendance("halfday")}
        >
          Half Day
        </Button>
      </div>
      {attendance === "absent" && (
        <Input
          placeholder="Reason"
          onChange={(e) => setReason(e.target.value)}
        />
      )}
      <div className="flex justify-center">
        <Button
          className=" mb-2 mt-2"
          variant="solid"
          loading={loading}
          color="blue-600"
          onClick={() => onsubmit()}
        >
          {loading ? "Please Wait" : "Submit"}
        </Button>
      </div>
    </Card>
  );
};

export default CalenderForm;
