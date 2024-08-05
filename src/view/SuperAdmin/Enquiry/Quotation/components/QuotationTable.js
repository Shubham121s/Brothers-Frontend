import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiry, setTableData } from "../store/dataSlice";
import useThemeClass from "../../../../../utils/hooks/useThemeClass";
import { Link, useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../../components/shared/DataTable";
import { HiOutlinePencil, HiOutlineEye } from "react-icons/hi";
import { Tag } from "../../../../../components/ui";
import dayjs from "dayjs";

const statusColor = {
  ACCEPTED: {
    label: "Quotation Accepted",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  REJECTED: {
    label: "Quotation Rejected",
    bgClass: "bg-red-100",
    textClass: "text-red-600",
  },
  PENDING: {
    label: "Quotation Pending",
    bgClass: "bg-blue-100",
    textClass: "text-blue-600",
  },
};

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/product/edit/${row.id}`);
  };

  return (
    <div className="flex justify-center text-lg">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlineEye />
      </span>
      {/* <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <HiOutlinePencil />
      </span> */}
    </div>
  );
};

const NameColumn = ({ row, index }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="items-center">
      <Link
        className={`hover:${textTheme} font-semibold`}
        to={`/super/admin/quotation/details/${row?.quotation_id}`}
      >
        {row?.quotation_number}
      </Link>
    </div>
  );
};

const QuotationTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.quotation.data.quotationList);
  const loading = useSelector((state) => state.quotation.data.loading);

  const columns = [
    {
      header: "Quotation",
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        return <NameColumn row={row} />;
      },
    },
    {
      header: "customer",
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="font-semibold">{row?.Enquiry?.Customer?.name}</div>
        );
      },
    },
    {
      header: "export",
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="font-semibold">{row?.Enquiry?.domestic_export}</div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="mr-2">
            <Tag
              className={`${statusColor[row?.status]?.bgClass} ${
                statusColor[row?.status]?.textClass
              } border-0`}
            >
              {statusColor[row?.status]?.label}
            </Tag>
          </div>
        );
      },
    },
    {
      header: "Quotation date",
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="font-semibold">
            {dayjs(row?.createdAt).format("YYYY-MM-DD")}
          </div>
        );
      },
    },

    // {
    //   header: "actioin",
    //   id: "enquiry_id",
    //   cell: (props) => {
    //     const row = props.row.original;
    //     return <ActionColumn row={row} />;
    //   },
    // },
  ];

  const { pageIndex, pageSize, query, total } = useSelector(
    (state) => state.quotation.data.tableData
  );

  const fetchData = useCallback(() => {
    dispatch(getAllEnquiry({ pageIndex, pageSize, query }));
  }, [pageIndex, pageSize, query, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, query, total }),
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

export default QuotationTable;
