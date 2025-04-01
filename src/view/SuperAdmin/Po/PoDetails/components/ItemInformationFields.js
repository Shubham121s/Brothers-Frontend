import React, { useMemo, memo } from "react";
import {
  Input,
  FormItem,
  DatePicker,
  Table,
} from "../../../../../components/ui";
import { Field } from "formik";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import dayjs from "dayjs";

const { Tr, Th, Td, THead, TBody } = Table;

const CalculateDate = (SLT, SLTT, date) => {
  let formattedTime;
  const originalDate = new Date();
  if (SLTT === "days") {
    originalDate.setDate(originalDate.getDate() + SLT);
    formattedTime = dayjs(originalDate);
  }
  if (SLTT === "weeks") {
    originalDate.setDate(originalDate.getDate() + 7 * SLT);
    formattedTime = dayjs(originalDate);
  }
  if (SLTT === "months") {
    originalDate.setMonth(originalDate.getMonth() + SLT);
    formattedTime = dayjs(originalDate);
  }
  if (SLTT === "years") {
    originalDate.setFullYear(originalDate.getFullYear() + SLT);
    formattedTime = dayjs(originalDate);
  }

  return new Date(formattedTime);
};

const ItemInformationFields = (props) => {
  const { touched, errors, values, data = [] } = props;

  const Products = useMemo(() => (Array.isArray(data) ? data : [data]), [data]);

  const columns = useMemo(
    () => [
      {
        header: "Raw Planned Date",
        accessorKey: "",
        cell: ({ row }) => {
          const poDate = row.original.date;
          let rlt = row.original?.PoLists?.[0]?.Product?.raw_lead_time || 0;
          console.log("rlt", rlt);

          const rltType =
            row.original?.PoLists?.[0]?.Product?.raw_lead_time_type;

          console.log("rltType", rltType);
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
        accessorKey: "",
      },
      {
        header: "M/C Planned Date",
        accessorKey: "mc_planned_date",
        cell: ({ row }) => {
          const poDate = row.original.date;
          let rlt = row.original?.PoLists?.[0]?.Product?.raw_lead_time || 0;
          let mlt = row.original?.PoLists?.[0]?.Product?.machine_lead_time || 0;

          const rltType =
            row.original?.PoLists?.[0]?.Product?.raw_lead_time_type;

          const mltType =
            row.original?.PoLists?.[0]?.Product.machine_lead_time_type;

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
      { header: "M/C Achieved Date", accessorKey: "mc_achieved_date" },
      {
        header: "QC Planned Date",
        accessorKey: "",
        cell: ({ row }) => {
          const poDate = row.original.date;
          let rlt = row.original?.PoLists?.[0]?.Product?.raw_lead_time || 0;
          let mlt = row.original?.PoLists?.[0]?.Product?.machine_lead_time || 0;
          let qlt = row.original?.PoLists?.[0]?.Product?.quality_lead_time || 0;

          const rltType =
            row.original?.PoLists?.[0]?.Product?.raw_lead_time_type;

          const mltType =
            row.original?.PoLists?.[0]?.Product.machine_lead_time_type;

          const qltType =
            row.original?.PoLists?.[0]?.Product?.quality_lead_time_type;

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
      { header: "QC Achieved Date", accessorKey: "qc_achieved_date" },
    ],
    [data]
  );

  const table = useReactTable({
    data: Products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="grid md:grid-cols-3 gap-2 ">
        <div className="col-span-1">
          <FormItem
            label="Brothers Delivery Dates"
            invalid={
              errors?.accept_delivery_date && touched?.accept_delivery_date
            }
            errorMessage={errors?.accept_delivery_date}
          >
            <Field name="accept_delivery_date">
              {({ field, form }) => (
                <>
                  <DatePicker
                    style={
                      dayjs(values?.delivery_date).format("YYYY-MM-DD") !==
                        dayjs(
                          CalculateDate(
                            values?.Product?.standard_lead_time,
                            values?.Product?.standard_lead_time_type,
                            data?.date
                          )
                        ).format("YYYY-MM-DD") &&
                      !values?.is_delivery_date_change && {
                        backgroundColor: `red`,
                        color: "white",
                      }
                    }
                    placeholder="Brothers Delivery Date"
                    field={field}
                    form={form}
                    value={CalculateDate(
                      values?.Product?.standard_lead_time,
                      values?.Product?.standard_lead_time_type,
                      data?.date
                    )}
                    onChange={(date) => {
                      form.setFieldValue(field.name, date);
                      form.setFieldValue("is_delivery_date_change", true);
                    }}
                  />
                </>
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label="Brothers Remarks"
            invalid={errors?.accept_description && touched?.accept_description}
            errorMessage={errors?.accept_description}
          >
            <Field
              type="text"
              autoComplete="off"
              name="accept_description"
              placeholder="Brothers Remarks"
              component={Input}
            />
          </FormItem>
        </div>
      </div>
      <Table className="relative mb-4" compact={true}>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  style={{
                    textAlign: "center",
                    border: ".2px dashed lightGray",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td
                  key={cell.id}
                  style={{
                    textAlign: "center",
                    border: ".2px dashed lightGray",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </TBody>
      </Table>
    </>
  );
};

export default memo(ItemInformationFields);
