import React, { forwardRef, useEffect, useMemo, useState } from "react";
import FormData from "form-data";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  FormItem,
  Card,
  FormContainer,
} from "../../../../../components/ui";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { StickyFooter } from "../../../../../components/shared";
import ItemForm from "../QuotationForm/components/ItemForm/ItemForm";
import InputInformationFields from "./components/InputInformationFields";
import SelectInformatinFields from "./components/SelectInformatinFields";
import { EnquiryType } from "./constant";

const validationSchema = Yup.object().shape({
  customer_id: Yup.string().required("Required"),
  enquiry_date: Yup.string().required("Required"),
  enquiry_type: Yup.string().required("Required"),
  enq_number: Yup.string().required("Required"),
  poc_name: Yup.string().required("Required"),
  poc_contact: Yup.string().required("Required"),
  items: Yup.array().of(
    Yup.object().shape({
      Product: Yup.object().required("Required"),
      drawing_revision: Yup.string()
        .required("Required")
        .test((drawing, ctx) => {
          if (
            !ctx.parent?.Product?.Drawings.some(
              (drawingRevision) => drawingRevision.revision_number === drawing
            )
          )
            return ctx.createError({ message: "Not Matched" });
          return true;
        }),
      quantity: Yup.string().required("Required"),
      delivery_date: Yup.string()
        .required("Required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "format YYYY-MM-DD"),
    })
  ),
});

const QuotationForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type, initialData, onFormSubmit, onDiscard, Customers, Products } =
    props;

  const CustomerOption = useMemo(
    () =>
      Customers.map((m) => {
        return { label: m.name, value: m.customer_id };
      }),
    [Customers]
  );

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          innerRef={ref}
          initialValues={{
            ...initialData,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = cloneDeep(values);
            onFormSubmit?.(formData, setSubmitting);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setErrors,
            handleSubmit,
            resetForm,
          }) => {
            return (
              <Form>
                <FormContainer>
                  <Card className=" h-max border-rose-800 bg-rose-50">
                    <div className="grid grid-cols-7 gap-3">
                      <SelectInformatinFields
                        errors={errors?.customer_id}
                        touched={touched?.customer_id}
                        name="customer_id"
                        data={CustomerOption}
                        values={values.customer_id}
                        label="Customer"
                      />
                      <InputInformationFields
                        errors={errors?.quotation_number}
                        touched={touched?.quotation_number}
                        placeholder="Quotation Number"
                        label="Quotation No."
                        name="quotation_number"
                        type="text"
                      />

                      <FormItem
                        label="Quotation Date"
                        invalid={
                          errors.quotation_date && touched.quotation_date
                        }
                        errorMessage={errors.quotation_date}
                        className="mb-2"
                      >
                        <Field name="quotation_date" placeholder="Date">
                          {({ field, form }) => (
                            <DatePicker
                              field={field}
                              form={form}
                              value={values.date}
                              onChange={(date) => {
                                form.setFieldValue(field.name, date);
                              }}
                            />
                          )}
                        </Field>
                      </FormItem>
                      <InputInformationFields
                        placeholder="Project"
                        label="Project"
                        name="project"
                        type="text"
                      />
                    </div>
                  </Card>
                  <div className="mt-4">
                    <ItemForm
                      values={values}
                      Products={Products}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <StickyFooter
                    className="-mx-8 px-8 flex items-center justify-end py-4"
                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <div className="md:flex items-center">
                      <Button size="sm" className="mr-3" type="button">
                        Discard
                      </Button>
                      <Button
                        size="sm"
                        variant="solid"
                        icon={<AiOutlineSave className="mr-1" />}
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </StickyFooter>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
});

QuotationForm.defaultProps = {
  type: "new",
  initialData: {
    customer_id: "",
    quotation_number: "",
    quotation_date: new Date(),
    project: "",
    items: [
      {
        Product: null,
        casting_drawing_no: "",
        machining_drawing_no: "",
        material: "",
        quantity: "",
        raw_weight: "",
        raw_per_kg_rate: "",
        raw_material_cost: "",
        machining: "",
        blasting_primer_paint: "",
        packing_cost: "",
        total_per_unit_cost1: "",
        profit: "",
        total_per_unit_cost2: "",
        pattern_tooling_cost: "",
        lead_time: "",
      },
    ],
  },
};

export default QuotationForm;
