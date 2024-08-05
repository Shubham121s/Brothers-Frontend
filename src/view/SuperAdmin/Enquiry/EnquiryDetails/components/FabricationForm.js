import React from "react";
import { Form, Formik, Field } from "formik";
import { FormItem, Input, Select, Button } from "../../../../../components/ui";
import { useDispatch } from "react-redux";
import {
  setSelectedFabrication,
  setSelectedScrapFabrication,
} from "../store/stateSlice";
import FabricationTable from "./FabricationTable";
const Fabricatoin = ({ errors, values, touched, resetForm }) => {
  const dispatch = useDispatch();
  const PartType = [
    { label: "CIRCLE", value: "CIRCLE" },
    { label: "RING", value: "RING" },
    { label: "PLATE", value: "PLATE" },
    { label: "CHANNEL", value: "CHANNEL" },
    { label: "BAR", value: "BAR" },
  ];

  const Type = [
    { label: "RAW WEIGTH AND AMOUNT", value: "RAW WEIGTH AND AMOUNT" },
    { label: "SCRAP WEIGTH AND AMOUNT", value: "SCRAP WEIGTH AND AMOUNT" },
  ];

  const onAddFabrication = () => {
    if (values.type === "RAW WEIGTH AND AMOUNT") {
      dispatch(setSelectedFabrication(values));
    } else {
      dispatch(setSelectedScrapFabrication(values));
    }

    resetForm({
      fabrication_part_type: "",
      fabrication_length: "",
      fabrication_width: "",
      fabrication_thickness: "",
      fabrication_quantity: "",
      fabrication_id: "",
      raw_material_rate: "",
      type: "",
    });
  };
  return (
    <>
      <FormItem
        label="Type"
        invalid={errors.enq_ref && touched.enq_ref}
        errorMessage={errors.enq_ref}
        className="mb-2"
      >
        <Field name="type">
          {({ field, form }) => (
            <Select
              field={field}
              form={form}
              options={Type}
              value={Type.filter((item) => item.value === values.type)}
              onChange={(option) => {
                form.setFieldValue(field.name, option.value);
              }}
            />
          )}
        </Field>
      </FormItem>
      <FormItem
        label="Part Type"
        invalid={errors.enq_ref && touched.enq_ref}
        errorMessage={errors.enq_ref}
        className="mb-2"
      >
        <Field name="fabrication_part_type">
          {({ field, form }) => (
            <Select
              field={field}
              form={form}
              options={PartType}
              value={PartType.filter(
                (item) => item.value === values.fabrication_part_type
              )}
              onChange={(option) => {
                form.setFieldValue(field.name, option.value);
              }}
            />
          )}
        </Field>
      </FormItem>
      {values.fabrication_part_type === "PLATE" && (
        <>
          <FormItem
            label="Length"
            invalid={errors.length && touched.length}
            errorMessage={errors.length}
            className="mb-2"
          >
            <Field name="fabrication_length">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter length"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Width"
            invalid={errors.width && touched.width}
            errorMessage={errors.width}
            className="mb-2"
          >
            <Field name="fabrication_width">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter width"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Thickness"
            invalid={errors.thickness && touched.thickness}
            errorMessage={errors.thickness}
            className="mb-2"
          >
            <Field name="thickness">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter thickness"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Quantity"
            invalid={errors.quantity && touched.quantity}
            errorMessage={errors.quantity}
            className="mb-2"
          >
            <Field name="fabrication_quantity">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter quantity"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Raw Material Rate"
            invalid={errors.raw_material_rate && touched.raw_material_rate}
            errorMessage={errors.raw_material_rate}
            className="mb-2"
          >
            <Field
              type="number"
              name="raw_material_rate"
              placeholder="Enter raw material rate"
              component={Input}
            />
          </FormItem>
        </>
      )}
      {values.fabrication_part_type === "RING" &&
        values.type === "RAW WEIGTH AND AMOUNT" && (
          <>
            <FormItem
              label="Length"
              invalid={errors.length && touched.length}
              errorMessage={errors.length}
              className="mb-2"
            >
              <Field name="fabrication_length">
                {({ field, form }) => (
                  <Input
                    field={field}
                    form={form}
                    type="number"
                    placeholder="Enter length"
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Thickness"
              invalid={errors.thickness && touched.thickness}
              errorMessage={errors.thickness}
              className="mb-2"
            >
              <Field name="thickness">
                {({ field, form }) => (
                  <Input
                    field={field}
                    form={form}
                    type="number"
                    placeholder="Enter thickness"
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Quantity"
              invalid={errors.quantity && touched.quantity}
              errorMessage={errors.quantity}
              className="mb-2"
            >
              <Field name="fabrication_quantity">
                {({ field, form }) => (
                  <Input
                    field={field}
                    form={form}
                    type="number"
                    placeholder="Enter quantity"
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Raw Material Rate"
              invalid={errors.raw_material_rate && touched.raw_material_rate}
              errorMessage={errors.raw_material_rate}
              className="mb-2"
            >
              <Field
                type="number"
                name="raw_material_rate"
                placeholder="Enter raw material rate"
                component={Input}
              />
            </FormItem>
          </>
        )}

      {values.fabrication_part_type === "RING" &&
        values.type === "SCRAP WEIGTH AND AMOUNT" && (
          <>
            <FormItem
              label="id"
              invalid={errors.length && touched.length}
              errorMessage={errors.length}
              className="mb-2"
            >
              <Field name="fabrication_id">
                {({ field, form }) => (
                  <Input
                    field={field}
                    form={form}
                    type="number"
                    placeholder="Id"
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Thickness"
              invalid={errors.thickness && touched.thickness}
              errorMessage={errors.thickness}
              className="mb-2"
            >
              <Field name="thickness">
                {({ field, form }) => (
                  <Input
                    field={field}
                    form={form}
                    type="number"
                    placeholder="Enter thickness"
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Quantity"
              invalid={errors.quantity && touched.quantity}
              errorMessage={errors.quantity}
              className="mb-2"
            >
              <Field name="fabrication_quantity">
                {({ field, form }) => (
                  <Input
                    field={field}
                    form={form}
                    type="number"
                    placeholder="Enter quantity"
                  />
                )}
              </Field>
            </FormItem>
            <FormItem
              label="Scrap Rate"
              invalid={errors.raw_material_rate && touched.raw_material_rate}
              errorMessage={errors.raw_material_rate}
              className="mb-2"
            >
              <Field
                type="number"
                name="fabrication_material_rate"
                placeholder="Enter raw material rate"
                component={Input}
              />
            </FormItem>
          </>
        )}

      {values.fabrication_part_type === "CIRCLE" && (
        <>
          <FormItem
            label="Length"
            invalid={errors.length && touched.length}
            errorMessage={errors.length}
            className="mb-2"
          >
            <Field name="fabrication_length">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter length"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Thickness"
            invalid={errors.thickness && touched.thickness}
            errorMessage={errors.thickness}
            className="mb-2"
          >
            <Field name="thickness">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter thickness"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Quantity"
            invalid={errors.quantity && touched.quantity}
            errorMessage={errors.quantity}
            className="mb-2"
          >
            <Field name="fabrication_quantity">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter quantity"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Raw Material Rate"
            invalid={errors.raw_material_rate && touched.raw_material_rate}
            errorMessage={errors.raw_material_rate}
            className="mb-2"
          >
            <Field
              type="number"
              name="raw_material_rate"
              placeholder="Enter raw material rate"
              component={Input}
            />
          </FormItem>
        </>
      )}
      {values.fabrication_part_type === "BAR" && (
        <>
          <FormItem
            label="Length"
            invalid={errors.length && touched.length}
            errorMessage={errors.length}
            className="mb-2"
          >
            <Field name="fabrication_length">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter length"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Thickness"
            invalid={errors.thickness && touched.thickness}
            errorMessage={errors.thickness}
            className="mb-2"
          >
            <Field name="thickness">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter thickness"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Quantity"
            invalid={errors.quantity && touched.quantity}
            errorMessage={errors.quantity}
            className="mb-2"
          >
            <Field name="fabrication_quantity">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter quantity"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Raw Material Rate"
            invalid={errors.raw_material_rate && touched.raw_material_rate}
            errorMessage={errors.raw_material_rate}
            className="mb-2"
          >
            <Field
              type="number"
              name="raw_material_rate"
              placeholder="Enter raw material rate"
              component={Input}
            />
          </FormItem>
        </>
      )}
      {values.fabrication_part_type === "CHANNEL" && (
        <>
          <FormItem
            label="Length"
            invalid={errors.length && touched.length}
            errorMessage={errors.length}
            className="mb-2"
          >
            <Field name="fabrication_length">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter length"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Thickness"
            invalid={errors.thickness && touched.thickness}
            errorMessage={errors.thickness}
            className="mb-2"
          >
            <Field name="thickness">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter thickness"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Quantity"
            invalid={errors.quantity && touched.quantity}
            errorMessage={errors.quantity}
            className="mb-2"
          >
            <Field name="fabrication_quantity">
              {({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  type="number"
                  placeholder="Enter quantity"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Raw Material Rate"
            invalid={errors.raw_material_rate && touched.raw_material_rate}
            errorMessage={errors.raw_material_rate}
            className="mb-2"
          >
            <Field
              type="number"
              name="raw_material_rate"
              placeholder="Enter raw material rate"
              component={Input}
            />
          </FormItem>
        </>
      )}
      <div className="flex items-center">
        <Button
          varient="solid"
          className="mt-5"
          type="button"
          onClick={onAddFabrication}
        >
          ADD
        </Button>
      </div>

      <FormItem
        label="Profit (%)"
        invalid={errors.profit && touched.profit}
        errorMessage={errors.profit}
        className="mb-2"
      >
        <Field
          type="number"
          name="profit_percent"
          placeholder="Enter profit percentage"
          component={Input}
        />
      </FormItem>
      <FormItem
        label="Overhead"
        // invalid={errors.profit && touched.profit}
        // errorMessage={errors.profit}
      >
        <Field
          type="number"
          name="overhead_percent"
          placeholder="Overhead %"
          component={Input}
        />
      </FormItem>
    </>
  );
};

export default Fabricatoin;
