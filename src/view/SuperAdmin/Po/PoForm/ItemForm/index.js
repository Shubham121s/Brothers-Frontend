import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  FormContainer,
  FormItem,
  Input,
  Checkbox,
} from "../../../../../components/ui";
import { toggleNewPoItemDialog } from "../../NewPo/store/stateSlice";
import { toggleEditPoItemDialog } from "../../EditPo/store/stateSlice";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import InputInformationFields from "./components/InputInformationFields";
import DatePickerInformationFields from "./components/DatePickerInformationFields";
import ProductInformationFields from "./components/ProductInformationFields";
import CheckBoxField from "./components/CheckBoxField";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  Product: Yup.object().required("Required"),
  serial_number: Yup.string().required("Required"),
  revision_number: Yup.string()
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
  delivery_date: Yup.date().required("Required"),
  quantity: Yup.number()
    .required("Required")
    .test((Quantity, ctx) => {
      if (Quantity < 1) {
        return ctx.createError({ message: "Quantity should be minimum 1" });
      }
      return true;
    }),
  unit_price: Yup.number()
    .typeError("Must be number")
    .required("Required")
    .test((price, ctx) => {
      if (price < 1) {
        return ctx.createError({ message: "Price should be minimum 1 Rs." });
      }
      return true;
    }),
  project_no: Yup.string().required("Required"),
});

const ItemForm = forwardRef((props, ref) => {
  const {
    handleOnAddItem,
    initialData,
    currency_type,
    type,
    mode,
    setItem,
    setType,
  } = props;
  const dispatch = useDispatch();
  const newPoItemDialog = useSelector((state) =>
    mode === "edit"
      ? state.edit_po.state.editPoItemDialog
      : state.new_po.state.newPoItemDialog
  );

  const onDialogClose = () => {
    if (mode === "edit") {
      dispatch(toggleEditPoItemDialog(false));
      setItem({});
      setType(false);
    } else {
      dispatch(toggleNewPoItemDialog(false));
      setItem({});
      setType(false);
    }
  };

  return (
    <Dialog
      isOpen={newPoItemDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleOnAddItem?.(values);
          resetForm();
          if (mode === "edit") {
            dispatch(toggleEditPoItemDialog(false));
          } else {
            dispatch(toggleNewPoItemDialog(false));
          }
        }}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <div className="flex flex-col h-full justify-between">
                <h4>
                  {type === "edit"
                    ? "Edit Item Information"
                    : "New Item Information"}
                </h4>
                <p className="mb-4">Section to config new item information</p>
                <div className="grid grid-cols-2 gap-2">
                  <InputInformationFields
                    errors={errors.serial_number}
                    touched={touched.serial_number}
                    name="serial_number"
                    label="Po Serial Number"
                    placeholder="Po Serial Number"
                  />
                  <InputInformationFields
                    errors={errors.project_no}
                    touched={touched.project_no}
                    name="project_no"
                    label="Project Number"
                    placeholder="Project Number"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <ProductInformationFields
                    errors={errors.Product}
                    touched={touched.Product}
                    values={values.Product}
                    mode={mode}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <InputInformationFields
                    errors={errors.revision_number}
                    touched={touched.revision_number}
                    className={
                      values.Product?.Drawings?.some(
                        (drawingRevision) =>
                          drawingRevision.revision_number ===
                          values?.revision_number
                      ) && "bg-emerald-100"
                    }
                    name="revision_number"
                    label="Drawing Revision Number"
                    placeholder="Drawing Revision Number"
                  />
                  <DatePickerInformationFields
                    errors={errors.delivery_date}
                    touched={touched.delivery_date}
                    name="delivery_date"
                    label="PO Delivery Date"
                    placeholder="PO Delivery Date"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <CheckBoxField
                    name="material_tc_verify_check"
                    label="Material TC"
                  />
                  <CheckBoxField
                    name="internal_inspection_check"
                    label="Internal Insp."
                  />
                  <CheckBoxField name="ndt_requirement_check" label="NDT" />
                  <CheckBoxField
                    name="final_inspection_check"
                    label="final Insp."
                  />
                  <CheckBoxField
                    name="heat_treatment_check"
                    label="Heat Treatment"
                  />
                  <CheckBoxField name="other_check" label="Other" />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <InputInformationFields
                    errors={errors.description}
                    touched={touched.description}
                    name="description"
                    placeholder="Remarks"
                    label="Remarks"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-2 mb-2">
                  <InputInformationFields
                    errors={errors.quantity}
                    touched={touched.quantity}
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    label="Quantity"
                    suffix={values.Product?.unit_measurement?.toUpperCase()}
                  />
                  <InputInformationFields
                    type="number"
                    errors={errors.unit_price}
                    touched={touched.unit_price}
                    name="unit_price"
                    placeholder="Unit Price"
                    label="Unit Price"
                    prefix={currency_type}
                  />
                  <FormItem className="mb-4" label="Amount">
                    <Field
                      disabled={true}
                      type="text"
                      autoComplete="off"
                      placeholder="Net Amount"
                      prefix={currency_type}
                      value={(values?.unit_price * values?.quantity).toFixed(2)}
                      component={Input}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="flex justify-end px-5 py-2 bg-gray-100 gap-2 rounded-bl-lg rounded-br-lg">
                <Button size="sm" type="button" variant="">
                  Discard
                </Button>
                <Button size="sm" variant="solid">
                  {type === "edit" ? "Update Item" : "Add Item"}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

ItemForm.defaultProps = {
  type: "new",
  initialData: {
    description: "",
    revision_number: "",
    delivery_date: null,
    quantity: "",
    unit_price: "",
    serial_number: "",
    Product: null,
    project_no: "",
    material_tc_verify_check: false,
    internal_inspection_check: false,
    ndt_requirement_check: false,
    final_inspection_check: false,
    heat_treatment_check: false,
    other_check: false,
  },
};

export default ItemForm;
