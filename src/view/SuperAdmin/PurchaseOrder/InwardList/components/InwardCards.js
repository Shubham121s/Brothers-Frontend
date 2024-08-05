import React from "react";
import { Card } from "../../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const InwardCards = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.inward_list.data.inwardList);
  const loading = useSelector((state) => state.inward_list.data.loading);

  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.inward_list.data.tableData
  );

  //   const fetchData = useCallback(() => {
  //     dispatch(getAllInward({ pageIndex, pageSize, sort, query }));
  //   }, [pageIndex, pageSize, sort, query]);

  //   useEffect(() => {
  //     fetchData();
  //   }, [fetchData, pageIndex, pageSize, sort, status]);

  //   const tableData = useMemo(
  //     () => ({ pageIndex, pageSize, sort, query, total }),
  //     [pageIndex, pageSize, sort, query, total]
  //   );

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.map((m) => (
        <Card loading={loading}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">{m?.inward_no}</span>
              <br />
              <h7>{m?.Customer?.name}</h7>
            </div>
            <div>
              <span className="font-semibold">
                {dayjs(m.inward_date).format("YYYY-MM-DD")}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InwardCards;
