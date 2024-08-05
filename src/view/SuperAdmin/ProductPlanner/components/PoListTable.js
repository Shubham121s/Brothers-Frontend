import React, { useEffect, useCallback, useMemo } from "react";
import { Tag, Tooltip, DatePicker } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomerOption,
  getAllDrawingOption,
  getAllMaterialGradeOption,
  getAllPoLists,
  getAllPoNumber,
  getAllProductItemCode,
  getAllProductOption,
  getAllProjectNumber,
  getBrotherDeliveryDate,
  getMachinigDate,
  getPODates,
  getPODeliveryDates,
  getRawDate,
  setTableData,
  UpdateRawMachiningDate,
} from "../store/dataSlice";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../components/shared/DataTable";

const statusColor = {
  accepted: {
    label: "Accepted",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  rejected: {
    label: "Rejected",
    bgClass: "bg-red-100",
    textClass: "text-red-600",
  },
  pending: {
    label: "Pending",
    bgClass: "bg-blue-100",
    textClass: "text-blue-600",
  },
};

const PoAColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return (
    <Tooltip
      title={
        <div>
          View <strong className="text-yellow-400">Product</strong>
        </div>
      }
    >
      <Link
        className={`hover:${textTheme} font-semibold`}
        to={`/super/admin/product/drawing/${row?.PoList?.Product?.product_id}`}
      >
        {row?.PoList?.Product?.item_code}
      </Link>
    </Tooltip>
  );
};

const PoListTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.poList.data.poLists);

  const loading = useSelector((state) => state.poList.data.loading);
  const { status } = useSelector((state) => state.poList.data.filterData);

  const columns = [
    {
      header: "raw date",
      accessorKey: "raw_date",
      cell: (props) => {
        const { raw_date, dispatch_list_id } = props.row.original;
        const date = raw_date ? new Date(raw_date) : null;
        return (
          <DatePicker
            style={{ width: "150px" }}
            placeholder="Raw Date"
            value={date}
            size="sm"
            onChange={async (date) => {
              await dispatch(
                UpdateRawMachiningDate({
                  raw_date: dayjs(date).format("YYYY-MM-DD"),
                  dispatch_list_id: dispatch_list_id,
                })
              );
              dispatch(
                getAllPoLists({ pageIndex, pageSize, sort, query, status })
              );
            }}
          />
        );
      },
    },
    {
      header: "mach. date",
      accessorKey: "machining_date",
      cell: (props) => {
        const { machining_date, dispatch_list_id } = props.row.original;
        const date = machining_date ? new Date(machining_date) : null;
        return (
          <DatePicker
            style={{ width: "150px" }}
            placeholder="Machining Date"
            value={date}
            size="sm"
            onChange={async (date) => {
              await dispatch(
                UpdateRawMachiningDate({
                  machining_date: dayjs(date).format("YYYY-MM-DD"),
                  dispatch_list_id: dispatch_list_id,
                })
              );
              dispatch(
                getAllPoLists({ pageIndex, pageSize, sort, query, status })
              );
            }}
          />
        );
      },
    },
    {
      header: "sr no.",
      accessorKey: "",
      cell: (props) => {
        const { index } = props.row;
        const serialNumber = index + 1;
        return <div>{serialNumber}</div>;
      },
    },
    {
      header: "Customer",
      accessorKey: "",
      cell: (props) => {
        const { Po } = props.row.original;
        const nameParts = Po?.Customer?.name.split(" ");

        const initials = nameParts
          ?.map((part) => part.charAt(0).toUpperCase())
          .join("");
        return <div className="uppercase">{initials}</div>;
      },
    },
    {
      header: "project no",
      accessorKey: "",
      cell: (props) => {
        const { PoList } = props.row.original;
        return <div className="uppercase">{PoList?.project_no}</div>;
      },
    },
    {
      header: "po no.",
      accessorKey: "",
      cell: (props) => {
        const { number } = props.row.original;
        return <div className="uppercase">{number}</div>;
      },
    },
    {
      header: "po sr no",
      accessorKey: "serial_number",
    },
    {
      header: `PO date`,
      accessorKey: "",
      cell: (props) => {
        const { Po } = props.row.original;
        return <div>{Po?.date}</div>;
      },
    },
    {
      header: "product",
      accessorKey: "",
      cell: (props) => {
        const { PoList } = props.row.original;
        return <div className="uppercase">{PoList?.Product?.name}</div>;
      },
    },
    {
      header: "item code",
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        return <PoAColumn row={row} />;
      },
    },

    {
      header: "drg/ rev no.",
      accessorKey: "Drawing.revision_number",
      cell: (props) => {
        const { Drawing, Product } = props.row.original?.PoList || {};
        return (
          <div className="uppercase">
            {Product?.drawing_number && Drawing?.revision_number
              ? `${Product.drawing_number}/ ${Drawing.revision_number}`
              : "N/A"}
          </div>
        );
      },
    },
    {
      header: "material grade",
      accessorKey: "",
      cell: (props) => {
        const { PoList } = props.row.original;
        return (
          <div className="uppercase">
            {PoList?.Product?.MaterialGrade?.number}
          </div>
        );
      },
    },
    {
      header: "po qty",
      accessorKey: "",
      cell: (props) => {
        const { PoList } = props.row.original;
        return <div>{PoList?.quantity}</div>;
      },
    },
    {
      header: "po del date.",
      accessorKey: "",
      cell: (props) => {
        const { delivery_date } = props.row.original;
        return <div>{dayjs(delivery_date).format("DD-MMM-YYYY")}</div>;
      },
    },
    {
      header: "brother cnf date",
      accessorKey: "accept_delivery_date",
      cell: (props) => {
        const { accept_delivery_date } = props.row.original?.PoList || {};
        return (
          <div>
            {accept_delivery_date
              ? dayjs(accept_delivery_date).format("YYYY-MM-DD")
              : "-"}
          </div>
        );
      },
    },
    {
      header: "del qty",
      accessorKey: "",
      cell: (props) => {
        const { item_quantity } = props.row.original;
        return <div>{item_quantity}</div>;
      },
    },
    {
      header: "pending qty",
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div>{Math.abs(row?.PoList?.quantity - row?.item_quantity)}</div>
        );
      },
    },
    {
      header: "status",
      accessorKey: "list_status",
      cell: (props) => {
        const list_status = props.row.original?.PoList?.list_status;
        const status = statusColor[list_status] || {};

        return (
          <div className="mr-2">
            <Tag
              className={`${status.bgClass || ""} ${
                status.textClass || ""
              } border-0`}
            >
              {status.label || "Unknown"}
            </Tag>
          </div>
        );
      },
    },

    // {
    //   header: "remarks",
    //   accessorKey: "description",
    //   cell: (props) => {
    //     const { description } = props.row.original;
    //     return <div className="uppercase">{description}</div>;
    //   },
    // },

    // {
    //   header: `rate (INR)`,
    //   accessorKey: "unit_price",
    //   cell: (props) => {
    //     const { unit_price } = props.row.original;
    //     return <div>{unit_price.toFixed(2)}</div>;
    //   },
    // },
    // {
    //   header: `Amount (INR)`,
    //   accessorKey: "amount",
    //   cell: (props) => {
    //     const { quantity, unit_price } = props.row.original;
    //     return <div>{(quantity * unit_price).toFixed(2)}</div>;
    //   },
    // },
  ];

  const { pageIndex, pageSize, sort, query, total, customer, po_no } =
    useSelector((state) => state.poList.data.tableData);

  const fetchData = useCallback(() => {
    dispatch(getAllPoLists({ pageIndex, pageSize, sort, query, status }));
    dispatch(getAllCustomerOption());
    dispatch(getAllMaterialGradeOption());
    dispatch(getAllProductItemCode());
    dispatch(getAllProductOption());
    dispatch(getAllDrawingOption());
    dispatch(getPODates());
    dispatch(getPODeliveryDates());
    dispatch(getBrotherDeliveryDate());
    dispatch(getRawDate());
    dispatch(getMachinigDate());
  }, [pageIndex, pageSize, sort, query, status, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, status]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
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
        pagingData={{ pageIndex, pageSize, sort, query, total }}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
      />
    </>
  );
};

export default PoListTable;
