import React, { useCallback, useEffect, useMemo } from "react";
import { Badge } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/shared/DataTable";
import useQuery from "../../../../../utils/hooks/useQuery";
import cloneDeep from "lodash/cloneDeep";
import { BsBookmarkCheck, BsBookmarkX } from "react-icons/bs";
import { getAttendanceById, setTableData } from "../store/dataSlice";
import dayjs from "dayjs";

const statusColor = {
  present: {
    label: "Present",
    dotClass: "bg-emerald-50 text-emerald-500",
    textClass: "text-emerald-500",
    content: <BsBookmarkCheck />,
  },
  absent: {
    label: "Absent",
    dotClass: "bg-red-50 text-red-500",
    textClass: "text-red-500",
    content: <BsBookmarkX />,
  },
  halfday: {
    label: "Half Day",
    dotClass: "bg-yellow-50 text-yellow-500",
    textClass: "text-yellow-500",
    content: <BsBookmarkCheck />,
  },
};

const AttendanceTable = () => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        header: "name",
        accessorKey: "worker_name",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">{row?.Worker?.worker_name}</div>
          );
        },
      },
      {
        header: "attended",
        accessorKey: "worker_attended",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Badge
                innerClass={statusColor[row.worker_attended].dotClass}
                content={statusColor[row.worker_attended].content}
                badgeStyle={{
                  width: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "19px",
                }}
              />
              <span
                className={`ml-2 font-semibold capitalize ${
                  statusColor[row.worker_attended].textClass
                }`}
              >
                {statusColor[row.worker_attended].label}
              </span>
            </div>
          );
        },
      },
      {
        header: "reason",
        accessorKey: "reason",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {row?.reason ? row?.reason : "-"}
            </div>
          );
        },
      },
      {
        header: "date",
        accessorKey: "date",
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              {dayjs(row?.date).format("DD/MM/YYYY")}
            </div>
          );
        },
      },
    ],
    []
  );

  const q = useQuery();
  const workerId = q.get("id");

  const data = useSelector((state) => state.attendanceList.data.attendanceList);
  const loading = useSelector((state) => state.attendanceList.data.loading);
  const { month } = useSelector(
    (state) => state.attendanceList.data.filterData
  );

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.attendanceList.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(
      getAttendanceById({
        pageIndex,
        pageSize,
        query,
        worker_id: workerId,
        month,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, workerId, month]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, query, month]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageIndex, pageSize, query, total]
  );

  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagingData={{ pageIndex, pageSize, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </>
  );
};

export default AttendanceTable;
