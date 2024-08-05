import React, { useMemo, useEffect } from "react";
import DataTable from "../../../components/shared/DataTable";
const AnnualTable = () => {
  const columns = useMemo(
    () => [
      {
        header: "Sr No",
        accessorKey: "sr_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.sr_no}</span>;
        },
      },
      {
        header: "Description",
        accessorKey: "description",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.description}</span>;
        },
      },
      {
        header: "Code No.",
        accessorKey: "code_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.code_no}</span>;
        },
      },

      {
        header: "Serial No",
        accessorKey: "serial_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.serial_no}</span>;
        },
      },
      {
        header: "Maker",
        accessorKey: "maker",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.maker}</span>;
        },
      },
      {
        header: "Range",
        accessorKey: "range",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.range}</span>;
        },
      },

      {
        header: "Calibration frequency",
        accessorKey: "frequency",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.frequency}</span>;
        },
      },
      {
        header: "01 Calibration Date",
        accessorKey: "calibration_date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.calibration_date}</span>;
        },
      },
      {
        header: "Calibration Agency",
        accessorKey: "calibration_agency",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.calibration_agency}</span>;
        },
      },
      {
        header: "Cal Result",
        accessorKey: "result",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.result}</span>;
        },
      },
      {
        header: "Cal Report No.",
        accessorKey: "report_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.report_no}</span>;
        },
      },
      {
        header: "Next Due Date",
        accessorKey: "next_due_date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.next_due_date}</span>;
        },
      },
      {
        header: "02 Calibration Date",
        accessorKey: "calibration_date2",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.calibration_date2}</span>;
        },
      },
      {
        header: "Calibration Agency",
        accessorKey: "calibration_agency",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.calibration_agency}</span>;
        },
      },
      {
        header: "Cal Result",
        accessorKey: "result",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.result}</span>;
        },
      },
      {
        header: "Cal Report No.",
        accessorKey: "report_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.report_no}</span>;
        },
      },
      {
        header: "Next Due Date",
        accessorKey: "next_due_date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.next_due_date}</span>;
        },
      },
      {
        header: "03 Calibration Date",
        accessorKey: "calibration_date3",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.calibration_date3}</span>;
        },
      },
      {
        header: "Cal Result",
        accessorKey: "result",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.result}</span>;
        },
      },
      {
        header: "Cal Report No.",
        accessorKey: "report_no",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.report_no}</span>;
        },
      },
      {
        header: "Next Due Date",
        accessorKey: "next_due_date",
        cell: (props) => {
          const row = props.row.original;
          return <span>{row.next_due_date}</span>;
        },
      },
    ],
    []
  );
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default AnnualTable;
