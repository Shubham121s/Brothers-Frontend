import React, { forwardRef, useState } from "react";
import { Button, FormContainer } from "../../../../../../../components/ui";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import PoInformationFields from "./PoInformationFields";
import PoSerialNumberInformationFields from "./PoSerialNumberInformationFields";
import ItemQuantityInformationFields from "./ItemQuantityInformationFields";
import TotalAmountInformationFields from "./TotalAmountInformationFields";
import TextEditor from "../../../../../Po/PoSetting/utils/TextEditor";

const validationSchema = Yup.object().shape({
  item_quantity: Yup.number().required("Required"),
  // item_weight: Yup.number().required('Required')
});

const ItemForm = forwardRef((props, ref) => {
  const { initialData, onDiscard, handleFormSubmit, dispatchList } = props;
  const [content, setContent] = useState(initialData.remarks);
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
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <FormContainer>
            <h4>Update Item Information</h4>
            <p className="mb-3">Section to config add item information</p>
            <div className="grid grid-cols-2 gap-2">
              <PoInformationFields />
              <PoSerialNumberInformationFields />
              <ItemQuantityInformationFields
                dispatchList={dispatchList}
                setFieldValue={setFieldValue}
              />
              <TotalAmountInformationFields quantity={values.item_quantity} />
            </div>
            <div className="mt-3 mb-3">
              <TextEditor
                content={content}
                setContent={setContent}
                placeholder="Add Product Remarks"
              />
            </div>
            <div className="flex gap-2 justify-end mt-4">
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
                Update
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
});

ItemForm.defaultProps = {
  initialData: {
    item_quantity: 0,
    PoList: null,
    Po: null,
    item_weight: "",
  },
};

export default ItemForm;
