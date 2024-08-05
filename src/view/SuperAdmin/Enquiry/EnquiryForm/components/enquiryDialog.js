import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  Input,
  FormItem,
  Upload,
  uploadLimit,
  Select,
  Button,
} from "../../../../../components/ui";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import { Field, FieldArray } from "formik";
import { toggleNewDialog } from "../store/stateSlice";
import { StickyFooter } from "../../../../../components/shared";
import { getProductsProfile } from "../store/dataSlice";
import { FaMinus } from "react-icons/fa";

const EnquiryDialog = ({
  values,
  errors,
  touched,
  isSubmitting,
  onFormSubmit,
  setErrors,
}) => {
  const dispatch = useDispatch();

  const newDialog = useSelector((state) => state.newEnquiry.state.newDialog);
  const MaterialOption = useSelector(
    (state) => state.newEnquiry.data.material_grade
  );
  const Prdoucts = useSelector((state) => state.newEnquiry.data.products);

  const productOption = useMemo(() => {
    return Prdoucts.map((m, index) => {
      return {
        label: m.part_name,
        value: {
          part_name: m.part_name,
          cutting_mm: m.cutting_mm,
          weight: m.weight,
        },
      };
    });
  }, [Prdoucts]);

  const onDialogClose = () => {
    dispatch(toggleNewDialog(false));
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file[0]);
  };

  const options = [
    { value: "CIRCLE", label: "Circle" },
    { value: "RING", label: "Ring" },
    { value: "SQUARE", label: "Square" },
    { value: "PROFILE DRAWING", label: "Profile" },
    { value: "FABRICATION DRAWING", label: "Fabrication" },
    { value: "MACHINERY", label: "Machinery" },
  ];

  // const onSubmit = () => {
  //   const formData = cloneDeep(values);
  //   let newErrors = {};

  //   if (!formData.drawing_number) {
  //     newErrors.drawing_number = "Required";
  //   }
  //   if (!formData.hsn_code) {
  //     newErrors.hsn_code = "Required";
  //   }
  //   if (!formData.part_number) {
  //     newErrors.part_number = "Required";
  //   }
  //   if (!formData.part_name) {
  //     newErrors.part_name = "Required";
  //   }
  //   if (!formData.part_type) {
  //     newErrors.part_type = "Required";
  //   }
  //   if (!formData.id) {
  //     newErrors.id = "Required";
  //   }
  //   if (!formData.length) {
  //     newErrors.length = "Required";
  //   }
  //   if (!formData.width) {
  //     newErrors.width = "Required";
  //   }
  //   if (!formData.thickness) {
  //     newErrors.thickness = "Required";
  //   }
  //   if (!formData.drawing_attachment) {
  //     newErrors.drawing_attachment = "Required";
  //   }
  //   if (!formData.quantity) {
  //     newErrors.quantity = "Required";
  //   }
  //   if (!formData.od) {
  //     newErrors.od = "Required";
  //   }
  //   if (!formData.material_grade_id) {
  //     newErrors.material_grade_id = "Required";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     const mergedErrors = { ...errors, ...newErrors };
  //     console.log(errors);
  //     console.log(mergedErrors);
  //     setErrors(mergedErrors);
  //   } else {
  //     onFormSubmit?.(formData);
  //     dispatch(toggleNewDialog(false));

  //     values.drawing_number = "";
  //     values.hsn_code = "";
  //     values.part_number = "";
  //     values.part_name = "";
  //     values.part_type = "";
  //     values.id = "";
  //     values.length = "";
  //     values.width = "";
  //     values.thickness = "";
  //     values.qap_attachment = "";
  //     values.drawing_attachment = "";
  //     values.quantity = "";
  //     values.od = "";
  //     values.material_grade_id = "";
  //   }
  // };

  return (
    <Dialog
      isOpen={newDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      width={850}
    >
      <div className="overflow-y-auto overflow-x-hidden h-[500px] p-3">
        <h4 className="text-center mb-4">Add Item</h4>
        <div className="grid grid-cols-3 gap-3">
          <FormItem
            label="Part Type"
            invalid={errors.part_type && touched.part_type}
            errorMessage={errors.part_type}
          >
            <Field name="part_type">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={options}
                  value={options.filter(
                    (item) => item.value === values.part_type
                  )}
                  onChange={(option) => {
                    form.setFieldValue(field.name, option.value);
                  }}
                />
              )}
            </Field>
          </FormItem>
          {values.part_type !== "PROFILE DRAWING" && (
            <>
              <FormItem
                label="Drawing No."
                invalid={errors.drawing_number && touched.drawing_number}
                errorMessage={errors.drawing_number}
              >
                <Field
                  type="text"
                  name="drawing_number"
                  placeholder="drawing no."
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="HSN Code"
                invalid={errors.hsn_code && touched.hsn_code}
                errorMessage={errors.hsn_code}
              >
                <Field
                  type="text"
                  name="hsn_code"
                  placeholder="hsn code"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Part No."
                invalid={errors.part_number && touched.part_number}
                errorMessage={errors.part_number}
              >
                <Field
                  type="text"
                  name="part_number"
                  placeholder="part number"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Part Name"
                invalid={errors.part_name && touched.part_name}
                errorMessage={errors.part_name}
              >
                <Field
                  type="text"
                  name="part_name"
                  placeholder="name"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Material Grade"
                invalid={errors.part_type && touched.part_type}
                errorMessage={errors.part_type}
              >
                <Field name="material_grade_id">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      options={MaterialOption}
                      value={MaterialOption.filter(
                        (item) => item.value === values.material_grade_id
                      )}
                      onChange={(option) => {
                        form.setFieldValue(field.name, option.value);
                      }}
                    />
                  )}
                </Field>
              </FormItem>
              <FormItem
                label="Quantity"
                invalid={errors.quantity && touched.quantity}
                errorMessage={errors.quantity}
              >
                <Field
                  type="number"
                  name="quantity"
                  placeholder="qty"
                  component={Input}
                />
              </FormItem>
            </>
          )}

          {values.part_type === "CIRCLE" && (
            <>
              <FormItem label="OD">
                <Field
                  type="text"
                  name="od"
                  placeholder="OD"
                  component={Input}
                />
              </FormItem>
              <FormItem label="Thickness">
                <Field
                  type="text"
                  name="thickness"
                  placeholder="Thickness"
                  component={Input}
                />
              </FormItem>
            </>
          )}
          {values.part_type === "RING" && (
            <>
              <FormItem label="OD">
                <Field
                  type="text"
                  name="od"
                  placeholder="OD"
                  component={Input}
                />
              </FormItem>
              <FormItem label="ID">
                <Field
                  type="text"
                  name="id"
                  placeholder="ID"
                  component={Input}
                />
              </FormItem>
              <FormItem label="Thickness">
                <Field
                  type="text"
                  name="thickness"
                  placeholder="Thickness"
                  component={Input}
                />
              </FormItem>
            </>
          )}
          {values.part_type === "SQUARE" && (
            <>
              <FormItem label="Length">
                <Field
                  type="text"
                  name="length"
                  placeholder="Length"
                  component={Input}
                />
              </FormItem>
              <FormItem label="Width">
                <Field
                  type="text"
                  name="width"
                  placeholder="Width"
                  component={Input}
                />
              </FormItem>
              <FormItem label="Thickness">
                <Field
                  type="text"
                  name="thickness"
                  placeholder="Thickness"
                  component={Input}
                />
              </FormItem>
            </>
          )}

          {values.part_type === "PROFILE DRAWING" && (
            <>
              <FormItem className="mb-4" label="Drawing Attach.">
                <Field name="drawing_attachment">
                  {({ field, form }) => (
                    <Upload
                      draggable
                      showList={true}
                      className="cursor-pointer"
                      onChange={(files) => onSetFormFile(form, field, files)}
                      onFileRemove={(files) =>
                        onSetFormFile(form, field, files)
                      }
                      uploadLimit={1}
                    >
                      <div className="text-center">
                        <p className="font-semibold">
                          <span className="text-gray-800 dark:text-white">
                            Drop your pdf here, or{" "}
                          </span>
                          <span className="text-blue-500">browse</span>
                        </p>
                      </div>
                    </Upload>
                  )}
                </Field>
              </FormItem>
              <FormItem label="Thickness">
                <Field
                  type="text"
                  name="thickness"
                  placeholder="Thickness"
                  component={Input}
                />
              </FormItem>
            </>
          )}

          {values.part_type === "MACHINERY" && (
            <>
              <FormItem className="mb-4" label="Drawing Attach.">
                <Field name="drawing_attachment">
                  {({ field, form }) => (
                    <Upload
                      draggable
                      showList={true}
                      className="cursor-pointer"
                      onChange={(files) => onSetFormFile(form, field, files)}
                      onFileRemove={(files) =>
                        onSetFormFile(form, field, files)
                      }
                      uploadLimit={1}
                    >
                      <div className="text-center">
                        <p className="font-semibold">
                          <span className="text-gray-800 dark:text-white">
                            Drop your pdf here, or{" "}
                          </span>
                          <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                          Support: pdf
                        </p>
                      </div>
                    </Upload>
                  )}
                </Field>
              </FormItem>
              <FormItem label="Thickness">
                <Field
                  type="text"
                  name="thickness"
                  placeholder="Thickness"
                  component={Input}
                />
              </FormItem>
            </>
          )}

          {values.part_type === "FABRICATION DRAWING" && (
            <>
              <FormItem className="mb-4" label="Drawing Attach.">
                <Field name="drawing_attachment">
                  {({ field, form }) => (
                    <Upload
                      draggable
                      showList={true}
                      className="cursor-pointer"
                      onChange={(files) => onSetFormFile(form, field, files)}
                      onFileRemove={(files) =>
                        onSetFormFile(form, field, files)
                      }
                      uploadLimit={1}
                    >
                      <div className="text-center">
                        <p className="font-semibold">
                          <span className="text-gray-800 dark:text-white">
                            Drop your pdf here, or{" "}
                          </span>
                          <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                          Support: pdf
                        </p>
                      </div>
                    </Upload>
                  )}
                </Field>
              </FormItem>
              <FormItem label="Thickness">
                <Field
                  type="text"
                  name="thickness"
                  placeholder="Thickness"
                  component={Input}
                />
              </FormItem>
            </>
          )}

          <FormItem className="mb-4" label="QAP (Attachment)">
            <Field name="qap_attachment">
              {({ field, form }) => (
                <Upload
                  draggable
                  showList={true}
                  className="cursor-pointer"
                  onChange={(files) => onSetFormFile(form, field, files)}
                  onFileRemove={(files) => onSetFormFile(form, field, files)}
                  uploadLimit={1}
                >
                  <div className="text-center">
                    <p className="font-semibold">
                      <span className="text-gray-800 dark:text-white">
                        Drop your pdf here, or{" "}
                      </span>
                      <span className="text-blue-500">browse</span>
                    </p>
                    <p className="mt-1 opacity-60 dark:text-white">
                      Support: pdf
                    </p>
                  </div>
                </Upload>
              )}
            </Field>
          </FormItem>
        </div>

        {values.part_type === "PROFILE DRAWING" && (
          <FieldArray name="products">
            {({ form, remove, push }) => (
              <div>
                {values.products && values.products.length > 0
                  ? values.products.map((_, index) => {
                      return (
                        <div key={index}>
                          <div className="grid grid-cols-6 gap-3">
                            <FormItem label="Product">
                              <Field name={`products[${index}].name`}>
                                {({ field, form }) => (
                                  <Select
                                    field={field}
                                    form={form}
                                    options={productOption}
                                    value={productOption.filter(
                                      (item) =>
                                        item.value.part_name ===
                                        values.products[index].name
                                    )}
                                    onChange={(option) => {
                                      console.log(option.value);
                                      form.setFieldValue(
                                        field.name,
                                        option.value.part_name
                                      );
                                    }}
                                  />
                                )}
                              </Field>
                            </FormItem>
                            <FormItem label="Drawing Number">
                              <Field
                                placeholder="quantity"
                                name={`products[${index}].drawing_number`}
                                type="text"
                                disabled={true}
                                component={Input}
                              />
                            </FormItem>
                            <FormItem label="Cutting MM">
                              <Field
                                placeholder="quantity"
                                name={`products[${index}].cutting_mm`}
                                type="text"
                                disabled={true}
                                component={Input}
                              />
                            </FormItem>
                            <FormItem label="weight">
                              <Field
                                placeholder="quantity"
                                name={`products[${index}].weight`}
                                type="text"
                                disabled={true}
                                component={Input}
                              />
                            </FormItem>
                            <FormItem label="Quantity">
                              <Field
                                placeholder="quantity"
                                name={`products[${index}].quantity`}
                                type="number"
                                component={Input}
                              />
                            </FormItem>

                            <Button
                              style={{ width: "50px", marginTop: "33px" }}
                              size="sm"
                              disabled={values.products.length === 1}
                              onClick={() => remove(index)}
                              icon={<FaMinus />}
                            />
                          </div>
                        </div>
                      );
                    })
                  : null}
                <div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="ltr:mr-2 rtl:ml-2"
                      size="sm"
                      onClick={() => {
                        push({
                          name: "",
                          cutting_mm: "",
                          weight: "",
                          drawing_number: "",
                          quantity: "",
                        });
                      }}
                    >
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </FieldArray>
        )}
        <StickyFooter
          className="-mx-8 px-8 flex items-center justify-end py-4"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="md:flex items-center">
            <Button
              size="sm"
              className="mr-3"
              onClick={() => onDialogClose()}
              type="button"
            >
              Discard
            </Button>
            <Button
              size="sm"
              variant="solid"
              icon={<AiOutlineSave className="mr-1" />}
              type="submit"
              onClick={onFormSubmit}
            >
              Submit
            </Button>
          </div>
        </StickyFooter>
      </div>
    </Dialog>
  );
};

export default EnquiryDialog;
