import React, { memo } from "react";
import { Input, FormItem, DatePicker } from "../../../../../components/ui";
import { Field } from "formik";
import { components } from "react-select";
import dayjs from "dayjs";

const CalculateDate = (SLT, SLTT) => {
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
  const { touched, errors, values } = props;
  return (
    <div className="grid md:grid-cols-3 gap-2">
      <div className="col-span-1">
        <FormItem
          label="Brothers Delivery Date"
          invalid={
            errors?.accept_delivery_date && touched?.accept_delivery_date
          }
          errorMessage={errors?.accept_delivery_date}
        >
          <Field name="accept_delivery_date">
            {({ field, form }) => (
              <DatePicker
                style={
                  dayjs(values?.delivery_date).format("YYYY-MM-DD") !==
                    dayjs(
                      CalculateDate(
                        values?.Product?.standard_lead_time,
                        values?.Product?.standard_lead_time_type
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
                defaultValue={new Date(values.delivery_date)}
                onChange={(date) => {
                  form.setFieldValue(field.name, date);
                  form.setFieldValue("is_delivery_date_change", true);
                }}
              />
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
  );
};

export default memo(ItemInformationFields);
