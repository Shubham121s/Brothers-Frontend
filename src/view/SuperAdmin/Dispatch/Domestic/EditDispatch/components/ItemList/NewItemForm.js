import React, { forwardRef, useState } from "react";
import { Button, FormContainer } from "../../../../../../../components/ui";
import * as Yup from "yup";
import PoInformationFieldsForm from "./components/PoInformationFieldsForm";
import PoSerialNumberInformationFieldsForm from "./components/PoSerialNumberInformationFieldsForm";
import ItemQuantityInformationFieldsForm from "./components/ItemQuantityInformationFieldsForm";
import TotalAmountInformationFieldsForm from "./components/TotalAmountInformationFieldsForm";
import MachineChargesInformationFields from "./components/MachineChargesInformationFields";
import RowChargesInformationFields from "./components/RowChargesInformationFields";
import { Formik, Form } from "formik";
import TextEditor from "../../../../../Po/PoSetting/utils/TextEditor";

const validationSchema = Yup.object().shape({
  PoList: Yup.object().required("Required"),
  Po: Yup.object().required("Required"),
  quantity: Yup.number().required("Required"),
  row_charges: Yup.number().required("Required"),
  machining_charges: Yup.number().required("Required"),
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
              <RowChargesInformationFields
                label="Row Charges"
                name="row_charges"
              />
              <MachineChargesInformationFields
                label="Machine Charges"
                name="machining_charges"
              />
              <TotalAmountInformationFieldsForm
                currency={values.Po?.po_currency_type}
                unitPrice={values.PoList?.unit_price}
                quantity={values.quantity}
                row_charges={values.row_charges}
                machining_charges={values.machining_charges}
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
    weight: "",
    box_no: "",
    row_charges: 0,
    machining_charges: 0,
  },
};

export default NewItemForm;
