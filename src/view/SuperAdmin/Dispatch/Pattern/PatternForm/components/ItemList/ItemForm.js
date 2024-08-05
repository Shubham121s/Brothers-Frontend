import React, { forwardRef, useState } from "react";
import { Button, FormContainer } from "../../../../../../../components/ui";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import PoInformationFields from "./PoInformationFields";
import PoSerialNumberInformationFields from "./PoSerialNumberInformationFields";
import ItemQuantityInformationFields from "./ItemQuantityInformationFields";
import TotalAmountInformationFields from "./TotalAmountInformationFields";
import BoxInformationFields from "./BoxInformationFields";
import WeightInformationFields from "./WeightInformationFields";
import RateField from "./rateField";
import NoField from "./NoField";

const validationSchema = Yup.object().shape({
  PoList: Yup.object().required("Required"),
  Po: Yup.object().required("Required"),
  quantity: Yup.number().required("Required"),
  no: Yup.number().required("Required"),
  rate: Yup.number().required("Required"),
});

const ItemForm = forwardRef((props, ref) => {
  const {
    initialData,
    onDiscard,
    boxes = [],
    handleFormSubmit,
    type,
    dispatchList,
    currency,
  } = props;
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        ...initialData,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleFormSubmit?.(values);
      }}
    >
      {({ values, touched, errors, setFieldValue }) => {
        console.log(values);
        return (
          <Form>
            <FormContainer>
              <h4>{type === "new" ? "Add" : "Update"} Item Information</h4>
              <p className="mb-3">Section to config add item information</p>
              <div className="grid grid-cols-2 gap-2">
                <PoInformationFields
                  errors={errors.Po}
                  touched={touched.Po}
                  values={values.Po}
                />
                <PoSerialNumberInformationFields
                  errors={errors.PoList}
                  touched={touched.PoList}
                  values={values.PoList}
                  Po={values.Po}
                />
                <NoField errors={errors.no} touched={touched.no} />
                <ItemQuantityInformationFields
                  errors={errors.quantity}
                  touched={touched.quantity}
                  values={values.quantity}
                  setFieldValue={setFieldValue}
                />
                <RateField
                  errors={errors.rate}
                  touched={touched.rate}
                  currency={currency}
                  rate={values.rate}
                />
                <TotalAmountInformationFields
                  currency={currency}
                  rate={values.rate}
                  quantity={values.quantity}
                />

                {/* <BoxInformationFields
                errors={errors.box_no}
                touched={touched.box_no}
                values={values.box_no}
                boxes={boxes}
              /> */}
                {/* <WeightInformationFields
                errors={errors.weight}
                touched={touched.weight}
                values={values}
              /> */}
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
                <Button size="sm" variant="solid" type="submit">
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

ItemForm.defaultProps = {
  initialData: {
    Po: null,
    quantity: 0,
    PoList: null,
    rate: 0,
    no: 0,
  },
};

export default ItemForm;
