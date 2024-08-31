import React, { forwardRef, useState } from "react";
import { Button, FormContainer } from "../../../../../../../components/ui";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import PoInformationFieldsForm from "./components/PoInformationFieldsForm";
import PoSerialNumberInformationFieldsForm from "./components/PoSerialNumberInformationFieldsForm";
// import PoSerialNumberInformationFields from "./PoSerialNumberInformationFields";
import ItemQuantityInformationFieldsForm from "./components/ItemQuantityInformationFieldsForm";
import TotalAmountInformationFieldsForm from "./components/TotalAmountInformationFieldsForm";
import BoxInformationFieldsForm from "./components/BoxInformationFieldsForm";
import WeightInformationFieldsForm from "./components/WeightInformationFieldsForm";

const validationSchema = Yup.object().shape({
  PoList: Yup.object().required("Required"),
  Po: Yup.object().required("Required"),
  quantity: Yup.number().required("Required"),
  weight: Yup.number().required("Required"),
  box_no: Yup.string().required("Required"),
});

const NewItemForm = forwardRef((props, ref) => {
  const {
    initialData,
    onDiscard,
    boxes = [],
    handleFormSubmit,
    type,
    dispatchList,
  } = props;
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        ...initialData,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleFormSubmit?.(values, setSubmitting);
      }}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting }) => {
        console.log(values);
        return (
          <Form>
            <FormContainer>
              <h4>{type === "new" ? "Add" : "Update"} Item Information</h4>
              <p className="mb-3">Section to config add item information</p>
              <div className="grid grid-cols-2 gap-2">
                <PoInformationFieldsForm
                  errors={errors.Po}
                  touched={touched.Po}
                  values={values.Po}
                />
                <PoSerialNumberInformationFieldsForm
                  errors={errors.PoList}
                  touched={touched.PoList}
                  values={values.PoList}
                  Po={values.Po}
                />
                <ItemQuantityInformationFieldsForm
                  dispatchList={dispatchList}
                  errors={errors.quantity}
                  touched={touched.quantity}
                  values={values.quantity}
                  setFieldValue={setFieldValue}
                  poList={values.PoList}
                />
                <TotalAmountInformationFieldsForm
                  currency={values.Po?.po_currency_type}
                  unitPrice={values.PoList?.unit_price}
                  quantity={values.quantity}
                />
                <BoxInformationFieldsForm
                  errors={errors.box_no}
                  touched={touched.box_no}
                  values={values.box_no}
                  boxes={boxes}
                />
                <WeightInformationFieldsForm
                  errors={errors.weight}
                  touched={touched.weight}
                  values={values}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  type="button"
                  variant=""
                  onClick={() => onDiscard?.()}
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  type="submit"
                  loading={isSubmitting}
                >
                  {type === "new" ? "Add" : "Update"} Item
                </Button>
              </div>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
});

NewItemForm.defaultProps = {
  initialData: {
    Po: null,
    quantity: 0,
    PoList: null,
    weight: "",
    box_no: "",
  },
};

export default NewItemForm;
