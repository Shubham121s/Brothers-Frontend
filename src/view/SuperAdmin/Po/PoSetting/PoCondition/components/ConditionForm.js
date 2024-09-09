import React, { forwardRef,useState } from "react";
import {
  FormContainer,
  Button,
  FormItem,
  Input,
  Select,
} from "../../../../../../components/ui";
import { Field, Form, Formik, FieldArray } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import TextEditor from "../../utils/TextEditor";

const categoryStatus = [
  { label: "Active", value: true },
  { label: "In-Active", value: false },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name Required"),
});

const ConditionForm = forwardRef((props, ref) => {
  const { type, initialData, onFormSubmit, onDiscard } = props;
  const [content, setContent] = useState(type==="edit" ? initialData.condition : '');

  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "500px" }}>
        <Formik
          innerRef={ref}
          initialValues={{
            ...initialData,
          }}
           validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = cloneDeep({...values,condition:content.replace(/\n/g, '').replace(/<p><br><\/p>/g, '')});
            console.log(formData)
            onFormSubmit?.(formData, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting,setErrors }) => (
            <Form>
              <FormContainer>
                <div className="">
                  <h4>
                    {type === "edit" ? "Update" : "Add"} Notes Information
                  </h4>
                  <p className="mb-6">
                    Section to config basic Notes information
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    <FormItem
                      label="Note Name"
                      className="mb-1"
                      invalid={errors.name && touched.name}
                      errorMessage={errors.name}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="name"
                        placeholder="Name"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Conditions"
                      className=""
                      // invalid={errors.name && touched.name}
                      // errorMessage={errors.name}
                    >
                    <TextEditor content={content} setContent={setContent}/>
                    </FormItem>
                    <div>
                    <div>
        
      </div>
      </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3"
                    onClick={() => onDiscard?.()}
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    icon={<AiOutlineSave className="mr-1" />}
                    type="submit"
                  >
                    {type === "edit" ? "Update" : "Save"}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
});

ConditionForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    condition: "",
  },
};

export default ConditionForm;
