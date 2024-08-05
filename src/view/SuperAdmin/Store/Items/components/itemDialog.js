import React, { forwardRef } from "react";
import {
  Dialog,
  FormContainer,
  FormItem,
  Button,
  Input,
  Select,
} from "../../../../../components/ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toggleNewDialog } from "../store/stateSlice";

const validationSchema = Yup.object().shape({
  Customer: Yup.object().required("Required"),
  number: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
  currency_type: Yup.string().required("Required"),
});

const ItemDialog = forwardRef((props, ref) => {
  const { initialData } = props;
  const dispatch = useDispatch();

  const dialog = useSelector((state) => state.items.state.newDialog);

  const typeOption = [
    { label: "Raw Material", value: "raw material" },
    { label: "Finished Goods", value: "finished Goods" },
    { label: "Consumable Items", value: "consumable items" },
  ];

  const onDialogClose = () => {
    dispatch(toggleNewDialog(false));
  };

  return (
    <>
      <Dialog
        isOpen={dialog}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        width={700}
      >
        <div className="mx-4">
          <h4 className="text-center mb-3">Add Item</h4>
          <Formik
            innerRef={ref}
            initialValues={{
              ...initialData,
            }}
            // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // const formData = cloneDeep({ ...values, items: [...data] })
              // if (data.length === 0) {
              //     setSubmitting(false)
              //     return (
              //         Toast.push(
              //             <Notification
              //                 title={'Required'}
              //                 type="danger"
              //                 duration={2500}
              //             >
              //                 PO List Required
              //             </Notification>,
              //             {
              //                 placement: 'top-center',
              //             }
              //         )
              //     )
              // }
              // onFormSubmit?.(formData, setSubmitting)
            }}
          >
            {({ values, touched, errors, isSubmitting }) => (
              <Form>
                <FormContainer>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
                    <FormItem
                      className="mb-2"
                      label="Type"
                      // invalid={errors && touched}
                      // errorMessage={errors}
                    >
                      <Field name="type">
                        {({ field, form }) => (
                          <Select
                            field={field}
                            form={form}
                            options={typeOption}
                            value={typeOption.filter(
                              (gst) => gst?.value === values?.type
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                    <FormItem className="mb-2" label="Name">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="material_name"
                        placeholder="Material Name"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      className="mb-2"
                      label="Material Grade"
                      // invalid={errors && touched}
                      // errorMessage={errors}
                    >
                      <Field name="material_grade_id">
                        {({ field, form }) => (
                          <Select
                            field={field}
                            form={form}
                            options={typeOption}
                            value={typeOption.filter(
                              (gst) => gst?.value === values?.material_grade_id
                            )}
                            onChange={(option) =>
                              form.setFieldValue(field.name, option.value)
                            }
                          />
                        )}
                      </Field>
                    </FormItem>
                    <FormItem className="mb-2" label="Size">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="size"
                        placeholder="Size"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem className="mb-2" label="Price">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="price"
                        placeholder="Price"
                        component={Input}
                      />
                    </FormItem>
                  </div>

                  <div className="md:flex items-center justify-end">
                    <Button
                      size="sm"
                      className="mr-3"
                      // onClick={() => onDiscard?.()}
                      type="button"
                    >
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      loading={isSubmitting}
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
    </>
  );
});

ItemDialog.defaultProps = {
  type: "new",
  initialData: {
    type: "",
    material_name: "",
    material_grade_id: "",
    size: "",
    price: "",
  },
};

export default ItemDialog;
