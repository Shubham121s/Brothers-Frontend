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
  setSelectedPoList,
  setTableData,
  toggleAttachmentDialog,
  toggleViewDialog,
  UpdateRawMachiningDate,
} from "../store/dataSlice";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../components/shared/DataTable";
import { MdAttachEmail } from "react-icons/md";
import AttachmentDialog from "./AttachmentsDialog";

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

const ActionColumn = ({ index, row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();

  const onEdit = () => {
    dispatch(setSelectedPoList(row));
    dispatch(toggleAttachmentDialog(true));
  };

  return (
    <div className="flex justify-center text-lg gap-x-4">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <MdAttachEmail />
      </span>
    </div>
  );
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
        to={`/product/drawing/${row?.product_id}`}
      >
        {row?.item_code}
      </Link>
    </Tooltip>
  );
};

const PoListTable = ({ DeliveryStatus }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.masterPP.data.poLists);

  const loading = useSelector((state) => state.masterPP.data.loading);
  const { status } = useSelector((state) => state.masterPP.data.filterData);
  const TableData = useSelector((state) => state.masterPP.data.tableData);

  const columns = [
    // {
    //   header: "raw date",
    //   accessorKey: "raw_date",
    //   cell: (props) => {
    //     const { raw_date, dispatch_list_id } = props.row.original;
    //     const date = raw_date ? new Date(raw_date) : null;
    //     return (
    //       <DatePicker
    //         style={{ width: "150px" }}
    //         placeholder="Raw Date"
    //         value={date}
    //         size="sm"
    //         onChange={async (date) => {
    //           await dispatch(
    //             UpdateRawMachiningDate({
    //               raw_date: dayjs(date).format("YYYY-MM-DD"),
    //               dispatch_list_id: dispatch_list_id,
    //             })
    //           );
    //           dispatch(
    //             getAllPoLists({ pageIndex, pageSize, sort, query, status })
    //           );
    //         }}
    //       />
    //     );
    //   },
    // },
    // {
    //   header: "mach. date",
    //   accessorKey: "machining_date",
    //   cell: (props) => {
    //     const { machining_date, dispatch_list_id } = props.row.original;
    //     const date = machining_date ? new Date(machining_date) : null;
    //     return (
    //       <DatePicker
    //         style={{ width: "150px" }}
    //         placeholder="Machining Date"
    //         value={date}
    //         size="sm"
    //         onChange={async (date) => {
    //           await dispatch(
    //             UpdateRawMachiningDate({
    //               machining_date: dayjs(date).format("YYYY-MM-DD"),
    //               dispatch_list_id: dispatch_list_id,
    //             })
    //           );
    //           dispatch(
    //             getAllPoLists({ pageIndex, pageSize, sort, query, status })
    //           );
    //         }}
    //       />
    //     );
    //   },
    // },
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
        const { customer_name } = props.row.original;
        const nameParts = customer_name.split(" ");

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
        const { project_no } = props.row.original;
        return <div className="uppercase">{project_no}</div>;
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
        const { DATE } = props.row.original;
        return <div>{DATE}</div>;
      },
    },
    {
      header: "product",
      accessorKey: "",
      cell: (props) => {
        const { product_name } = props.row.original;
        return <div className="uppercase">{product_name}</div>;
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
      header: "drg no.",
      accessorKey: "drawing_number",
      cell: (props) => {
        const { drawing_number } = props.row.original;
        return (
          <div className="uppercase">
            {drawing_number ? `${drawing_number}` : "N/A"}
          </div>
        );
      },
    },
    {
      header: "rev no.",
      accessorKey: "Drawing.revision_number",
      cell: (props) => {
        const { revision_number } = props.row.original;
        return (
          <div className="uppercase">
            {revision_number ? `${revision_number}` : "N/A"}
          </div>
        );
      },
    },
    {
      header: "material grade",
      accessorKey: "",
      cell: (props) => {
        const { material_grade } = props.row.original;
        return <div className="uppercase">{material_grade}</div>;
      },
    },
    {
      header: "po qty",
      accessorKey: "",
      cell: (props) => {
        const { quantity } = props.row.original;
        return <div>{quantity}</div>;
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
        const { accept_delivery_date } = props.row.original || {};
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
        return <div>{item_quantity ? item_quantity : 0}</div>;
      },
    },
    {
      header: "pending qty",
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        return <div>{Math.abs(row?.quantity - row?.item_quantity)}</div>;
      },
    },
    {
      header: "status",
      accessorKey: "list_status",
      cell: (props) => {
        const { list_status } = props.row.original;
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
    {
      header: "Action",
      accessorKey: "action",
      cell: (props) => {
        const row = props.row.original;
        return <ActionColumn row={row} />;
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

  const {
    pageIndex,
    pageSize,
    sort,
    query,
    total,
    customer,
    project_no,
    po_no,
    po_serial_no,
    product,
    item_code,
    revision_no,
    material_grade,
    po_Date,
    po_del_Date,
    brother_Date,
    raw_date,
    machining_date,
  } = useSelector((state) => state.masterPP.data.tableData);

  const fetchData = useCallback(() => {
    dispatch(
      getAllPoLists({
        pageIndex,
        pageSize,
        sort,
        query,
        status,
        DeliveryStatus,
        ...TableData,
      })
    );
    dispatch(getPODates({ DeliveryStatus }));
    dispatch(getPODeliveryDates({ DeliveryStatus }));
    dispatch(getBrotherDeliveryDate({ DeliveryStatus }));
    dispatch(getAllProjectNumber({ DeliveryStatus }));
    dispatch(getAllProductOption({ DeliveryStatus }));
    dispatch(getAllPoNumber({ DeliveryStatus }));
  }, [pageIndex, pageSize, sort, query, status, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageIndex, pageSize, sort, status]);
  useEffect(() => {
    dispatch(getAllCustomerOption());
  }, []);

  const tableData = useMemo(
    () => ({
      pageIndex,
      pageSize,
      sort,
      query,
      total,
      customer,
      project_no,
      po_no,
      po_serial_no,
      product,
      item_code,
      revision_no,
      material_grade,
      po_Date,
      po_del_Date,
      brother_Date,
      raw_date,
      machining_date,
    }),
    [
      pageIndex,
      pageSize,
      sort,
      query,
      total,
      customer,
      project_no,
      po_no,
      po_serial_no,
      product,
      item_code,
      revision_no,
      material_grade,
      po_Date,
      po_del_Date,
      brother_Date,
      raw_date,
      machining_date,
    ]
  );

  console.log("table data from polist", tableData);

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
      <AttachmentDialog />
    </>
  );
};

export default PoListTable;
