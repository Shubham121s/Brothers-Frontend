import React, { useEffect, useCallback, useMemo } from "react";
import { Tag, Tooltip, DatePicker, Input } from "../../../../components/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomerOption,
  getAllPoLists,
  getAllPoNumber,
  getAllProductOption,
  getAllProjectNumber,
  getAllSerialNumber,
  getBrotherDeliveryDate,
  getPODates,
  getPODeliveryDates,
  postActualDates,
  setSelectedPoList,
  setTableData,
  toggleAttachmentDialog,
} from "../store/dataSlice";
import useThemeClass from "../../../../utils/hooks/useThemeClass";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import DataTable from "../../../../components/shared/DataTable";
import { MdOutlineUploadFile } from "react-icons/md";
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
    <div className="flex justify-center flex-col items-center text-xl gap-x-4">
      <span className={`cursor-pointer hover:${textTheme}`} onClick={onEdit}>
        <MdOutlineUploadFile />
      </span>

      <div className="dots flex gap-x-1">
        {row?.final_inspection_check ? (
          <Tooltip
            title={
              <div>
                <strong className="text-yellow-400">Final Inspection</strong>
              </div>
            }
          >
            <span
              className={`cursor-pointer ${
                row?.final_inspection ? "text-green-500" : "text-red-500"
              }`}
            >
              •
            </span>
          </Tooltip>
        ) : null}

        {row?.heat_treatment_check ? (
          <Tooltip
            title={
              <div>
                <strong className="text-yellow-400">Heat Treatment</strong>
              </div>
            }
          >
            <span
              className={`cursor-pointer ${
                row?.heat_treatment ? "text-green-500" : "text-red-500"
              }`}
            >
              •
            </span>
          </Tooltip>
        ) : null}

        {row?.internal_inspection_check ? (
          <Tooltip
            title={
              <div>
                <strong className="text-yellow-400">Internal Inspection</strong>
              </div>
            }
          >
            <span
              className={`cursor-pointer ${
                row?.internal_inspection ? "text-green-500" : "text-red-500"
              }`}
            >
              •
            </span>
          </Tooltip>
        ) : null}

        {row?.material_tc_verify_check ? (
          <Tooltip
            title={
              <div>
                <strong className="text-yellow-400">Material TC Verify</strong>
              </div>
            }
          >
            <span
              className={`cursor-pointer ${
                row?.material_tc_verify ? "text-green-500" : "text-red-500"
              }`}
            >
              •
            </span>
          </Tooltip>
        ) : null}

        {row?.ndt_requirement_check ? (
          <Tooltip
            title={
              <div>
                <strong className="text-yellow-400">NDT Requirement</strong>
              </div>
            }
          >
            <span
              className={`cursor-pointer ${
                row?.ndt_requirement ? "text-green-500" : "text-red-500"
              }`}
            >
              •
            </span>
          </Tooltip>
        ) : null}

        {row?.other_check ? (
          <Tooltip
            title={
              <div>
                <strong className="text-yellow-400">Other</strong>
              </div>
            }
          >
            <span
              className={`cursor-pointer ${
                row?.other ? "text-green-500" : "text-red-500"
              }`}
            >
              •
            </span>
          </Tooltip>
        ) : null}
      </div>
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

const ActualPlannedDateCell = ({
  dateField, // The key of the date field (e.g., "actual_raw_date", "actual_machine_date")
  dateValue, // The actual date value
  po_list_id,
  pageIndex,
  pageSize,
  sort,
  query,
  status,
  customer,
  po_no,
  project_no,
  po_serial_no,
  product,
  po_Date,
  po_del_Date,
  brother_Date,
}) => {
  const dispatch = useDispatch();

  const [updatedDate, setUpdatedDate] = React.useState(
    dateValue ? dayjs(dateValue).format("YYYY-MM-DD") : ""
  );

  const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setUpdatedDate(newDate);

    await dispatch(
      postActualDates({
        [dateField]: newDate, // Dynamically update the correct date field
        po_list_id,
      })
    );

    dispatch(
      getAllPoLists({
        pageIndex,
        pageSize,
        sort,
        query,
        status,
        customer,
        po_no,
        project_no,
        po_serial_no,
        product,
        po_Date,
        po_del_Date,
        brother_Date,
      })
    );
  };

  return (
    <Input
      size="sm"
      type="date"
      value={updatedDate}
      onChange={handleDateChange}
    />
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
      size: 20,

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
      size: 120,

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
      size: 100,
    },
    {
      header: `PO date`,
      accessorKey: "",
      size: 120,
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
      size: 240,
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
      size: 80,
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
      size: 180,
      cell: (props) => {
        const { material_grade } = props.row.original;
        return <div className="uppercase">{material_grade}</div>;
      },
    },
    {
      header: "po qty",
      accessorKey: "",
      size: 100,
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
      size: 100,
      cell: (props) => {
        const { item_quantity } = props.row.original;
        return <div>{item_quantity ? item_quantity : 0}</div>;
      },
    },
    {
      header: "pending qty",
      accessorKey: "",
      size: 120,
      cell: (props) => {
        const row = props.row.original;
        return <div>{Math.abs(row?.quantity - row?.item_quantity)}</div>;
      },
    },

    {
      header: "SLT",
      accessorKey: "",
      size: 100,
      cell: (props) => {
        const row = props.row.original;

        return (
          <div>
            {row?.standard_lead_time} {row?.standard_lead_time_type}
          </div>
        );
      },
    },
    {
      header: "Raw Planned Date",
      size: 180,
      accessorKey: "",
      cell: (props) => {
        const row = props.row.original;
        const poDate = props.row.original?.DATE;
        let rlt = Number(row?.raw_lead_time) || 0;
        const rltType = row?.raw_lead_time_type;

        if (rltType === "weeks") {
          rlt *= 7;
        } else if (rltType === "months") {
          rlt *= 30;
        } else if (rltType === "years") {
          rlt *= 365;
        }

        let plannedDate = "Invalid Date";
        if (poDate) {
          const newDate = new Date(poDate);
          newDate.setDate(newDate.getDate() + rlt);
          plannedDate = newDate.toISOString().split("T")[0];
        }

        return <div>{plannedDate}</div>;
      },
    },
    {
      header: "Actual Raw Date",
      accessorKey: "actual_planned_date",
      size: 220,
      cell: (props) => {
        const { actual_raw_date, po_list_id } = props.row.original;
        return (
          <ActualPlannedDateCell
            dateField="actual_raw_date"
            dateValue={actual_raw_date}
            po_list_id={po_list_id}
            pageIndex={pageIndex}
            pageSize={pageSize}
            sort={sort}
            query={query}
            status={status}
            customer={customer}
            po_no={po_no}
            project_no={project_no}
            po_serial_no={po_serial_no}
            product={product}
            po_Date={po_Date}
            po_del_Date={po_del_Date}
            brother_Date={brother_Date}
          />
        );
      },
    },

    {
      header: "M/C Planned Date",
      accessorKey: "",
      size: 180,
      cell: (props) => {
        const row = props.row.original;
        const poDate = row?.DATE;

        let rlt = Number(row?.raw_lead_time) || 0;
        let mlt = Number(row?.machine_lead_time) || 0;

        const rltType = row?.raw_lead_time_type;
        const mltType = row?.machine_lead_time_type;

        if (rltType === "weeks") rlt *= 7;
        else if (rltType === "months") rlt *= 30;
        else if (rltType === "years") rlt *= 365;

        if (mltType === "weeks") mlt *= 7;
        else if (mltType === "months") mlt *= 30;
        else if (mltType === "years") mlt *= 365;

        const totalLeadTime = rlt + mlt;

        let plannedDate = "Invalid Date";
        if (poDate) {
          const newDate = new Date(poDate);
          newDate.setDate(newDate.getDate() + totalLeadTime);
          plannedDate = newDate.toISOString().split("T")[0];
        }

        return <div>{plannedDate}</div>;
      },
    },

    {
      header: "M/C Achived Date",
      accessorKey: "",
      size: 220,
      cell: (props) => {
        const { actual_machine_date, po_list_id } = props.row.original;
        return (
          <ActualPlannedDateCell
            dateField="actual_machine_date"
            dateValue={actual_machine_date}
            po_list_id={po_list_id}
            pageIndex={pageIndex}
            pageSize={pageSize}
            sort={sort}
            query={query}
            status={status}
            customer={customer}
            po_no={po_no}
            project_no={project_no}
            po_serial_no={po_serial_no}
            product={product}
            po_Date={po_Date}
            po_del_Date={po_del_Date}
            brother_Date={brother_Date}
          />
        );
      },
    },

    {
      header: "QC Planned Date",
      accessorKey: "",
      size: 180,
      cell: (props) => {
        const row = props.row.original;
        const poDate = row?.DATE;

        let rlt = Number(row?.raw_lead_time) || 0;
        let mlt = Number(row?.machine_lead_time) || 0;
        let qlt = Number(row?.quality_lead_time) || 0;

        const rltType = row?.raw_lead_time_type;
        const mltType = row?.machine_lead_time_type;
        const qltType = row?.quality_lead_time_type;

        if (rltType === "weeks") rlt *= 7;
        else if (rltType === "months") rlt *= 30;
        else if (rltType === "years") rlt *= 365;

        if (mltType === "weeks") mlt *= 7;
        else if (mltType === "months") mlt *= 30;
        else if (mltType === "years") mlt *= 365;

        if (qltType === "weeks") qlt *= 7;
        else if (qltType === "months") qlt *= 30;
        else if (qltType === "years") qlt *= 365;

        const totalLeadTime = rlt + mlt + qlt;

        let plannedDate = "Invalid Date";
        if (poDate) {
          const newDate = new Date(poDate);
          newDate.setDate(newDate.getDate() + totalLeadTime);
          plannedDate = newDate.toISOString().split("T")[0];
        }

        return <div>{plannedDate}</div>;
      },
    },

    {
      header: "QC Achived Date",
      accessorKey: "",
      size: 220,
      cell: (props) => {
        const { actual_quality_date, po_list_id } = props.row.original;
        return (
          <ActualPlannedDateCell
            dateField="actual_quality_date"
            dateValue={actual_quality_date}
            po_list_id={po_list_id}
            pageIndex={pageIndex}
            pageSize={pageSize}
            sort={sort}
            query={query}
            status={status}
            customer={customer}
            po_no={po_no}
            project_no={project_no}
            po_serial_no={po_serial_no}
            product={product}
            po_Date={po_Date}
            po_del_Date={po_del_Date}
            brother_Date={brother_Date}
          />
        );
      },
    },

    {
      header: "status",
      accessorKey: "list_status",
      size: 120,
      cell: (props) => {
        const { list_status, pending_quantity } = props.row.original;
        const status = statusColor[list_status] || {};

        const isDelivered =
          list_status === "accepted" && pending_quantity === 0;

        return (
          <div className="mr-2">
            <Tag
              className={`${status.bgClass || ""} ${
                status.textClass || ""
              } border-0`}
            >
              {isDelivered ? "Delivered" : status.label || "Unknown"}
            </Tag>
          </div>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      size: 100,
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
    dispatch(
      getPODates({ DeliveryStatus, customer_id: customer, number: po_no })
    );
    dispatch(
      getPODeliveryDates({
        DeliveryStatus,
        customer_id: customer,
        number: po_no,
      })
    );
    dispatch(
      getBrotherDeliveryDate({
        DeliveryStatus,
        customer_id: customer,
        number: po_no,
      })
    );
    dispatch(
      getAllProjectNumber({
        DeliveryStatus,
        customer_id: customer,
        number: po_no,
      })
    );
    dispatch(
      getAllProductOption({
        DeliveryStatus,
        project_no: project_no,
        number: po_no,
      })
    );
    dispatch(getAllPoNumber({ DeliveryStatus, customer_id: customer }));
    dispatch(
      getAllSerialNumber({
        project_no: project_no,
        number: po_no,
        DeliveryStatus,
      })
    );
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
      <div style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          pagingData={{ pageIndex, pageSize, sort, query, total }}
          onPaginationChange={onPaginationChange}
          tableWidth="100%"
        />
      </div>
      <AttachmentDialog />
    </>
  );
};

export default PoListTable;
