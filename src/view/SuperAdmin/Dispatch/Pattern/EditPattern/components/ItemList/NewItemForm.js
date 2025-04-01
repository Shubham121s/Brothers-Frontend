import React, { forwardRef, useState } from "react";
import { Button, FormContainer } from "../../../../../../../components/ui";
import * as Yup from "yup";
import PoSerialNumberInformationFieldsForm from "./PoSerialNumberInformationFields";

import { Formik, Form } from "formik";
import TextEditor from "../../../../../Po/PoSetting/utils/TextEditor";
import PoInformationFields from "../../../EditPattern/components/ItemList/PoInformationFields";
import NoField from "../../../EditPattern/components/ItemList/NoField";
import ItemQuantityInformationFields from "../../../EditPattern/components/ItemList/ItemQuantityInformationFields";
import RateField from "../../../EditPattern/components/ItemList/rateField";
import TotalAmountInformationFields from "../../../EditPattern/components/ItemList/TotalAmountInformationFields";

const validationSchema = Yup.object().shape({
  PoList: Yup.object().required("Required"),
  Po: Yup.object().required("Required"),
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

  const [content, setContent] = useState("");
  return (
    <Formik
      innerRef={ref}
      initialValues={{
        ...initialData,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("vaues from new item form", values);
        handleFormSubmit?.({ ...values, remarks: content }, setSubmitting);
        setContent("");
      }}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting }) => (
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
              <PoSerialNumberInformationFieldsForm
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
                currency={values.Po.currency_type}
                rate={values.rate}
              />
              <TotalAmountInformationFields
                currency={values.Po.currency_type}
                rate={values.rate}
                quantity={values.quantity}
              />
            </div>
            <div className="mt-3 mb-3">
              <TextEditor
                content={content}
                setContent={setContent}
                placeholder="Add Product Remarks"
              />
            </div>
            <div className="flex gap-2 justify-end">
              {/* <Button size='sm' type='button' variant='' onClick={() => onDiscard?.()}>Discard</Button> */}
              <Button
                size="sm"
                variant="solid"
                type="submit"
                loading={isSubmitting}
              >
                Add Item
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

NewItemForm.defaultProps = {
  initialData: {
    Po: {},
    quantity: 0,
    PoList: [],
    no: 0,
    rate: 0,
    remarks: "",
  },
};

export default NewItemForm;
