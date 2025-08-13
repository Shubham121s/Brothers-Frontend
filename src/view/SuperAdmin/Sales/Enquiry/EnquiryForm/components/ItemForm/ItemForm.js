import React, { useMemo } from "react";
import { Field, FieldArray, getIn } from "formik";
import {
  FormItem,
  Button,
  Input,
  Select,
  Table,
} from "../../../../../../../components/ui";
import { HiCheck } from "react-icons/hi";
import { components } from "react-select";
import { HiOutlineTrash } from "react-icons/hi";
import DatePickerInformationField from "../DatePickerInformationField";
const { Tr, Th, Td, THead, TBody } = Table;
const { Control } = components;

const ItemForm = ({ values, errors, touched, Products = [], type = "new" }) => {
  const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name);
    const touch = getIn(form.touched, name);
    return {
      errorMessage: error || "",
      invalid: touch && Boolean(error),
    };
  };

  console.log(values);

  const productData = useMemo(() => {
    return Products.map((product) => {
      return { label: `${product.name} ${product?.item_code}`, value: product };
    });
  }, [Products]);

  const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0];
    return (
      <Control {...props}>
        {selected && (
          <span className="ml-2 font-semibold uppercase">
            {selected?.value?.item_code} :
          </span>
        )}
        {children}
      </Control>
    );
  };

  const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
      <div
        className={`flex items-center justify-between p-2 ${
          isSelected ? "bg-gray-100" : "hover:bg-gray-50"
        }`}
        {...innerProps}
      >
        <div className="items-center flex justify-between w-full">
          <div className="ml-2 uppercase">{`${label}`}</div>
          {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
      </div>
    );
  };

  const style = {
    textAlign: "center",
    border: ".2px dashed lightGray",
    width: "200px",
  };

  return (
    <Table className="relative" compact={true}>
      <THead className="sticky" style={{ top: "-.2px" }}>
        <Tr>
          <Th style={style}>Product</Th>
          <Th style={style}>Drawing Revision Number</Th>
          <Th style={style}>Quantity</Th>
          <Th style={style}>Expected Delivery Date</Th>
          <Th
            style={{
              textAlign: "center",
              border: ".2px dashed lightGray",
              width: "100px",
            }}
          >
            Action
          </Th>
        </Tr>
      </THead>
      <TBody>
        <FieldArray name="items">
          {({ form, remove, push }) => (
            <>
              {values.items && values.items.length > 0
                ? values.items.map((_, index) => {
                    const paroductFeedBack = fieldFeedback(
                      form,
                      `items[${index}].Product`
                    );
                    const drawingRevisionFeedBack = fieldFeedback(
                      form,
                      `items[${index}].drawing_revision`
                    );

                    const quantityFeedBack = fieldFeedback(
                      form,
                      `items[${index}].quantity`
                    );
                    return (
                      <Tr key={index}>
                        <Td style={style}>
                          <FormItem
                            label=""
                            className="mb-2"
                            invalid={paroductFeedBack.invalid}
                            errorMessage={paroductFeedBack.errorMessage}
                          >
                            <Field
                              name={`items[${index}].Product`}
                              invalid={paroductFeedBack.invalid}
                            >
                              {({ field, form }) => (
                                <Select
                                  field={field}
                                  form={form}
                                  size="sm"
                                  className="w-full"
                                  options={productData}
                                  components={{
                                    Option: CustomSelectOption,
                                    Control: CustomControl,
                                  }}
                                  value={productData.find(
                                    (product) =>
                                      product.value?.product_id ===
                                      values.items[index]?.Product?.product_id
                                  )}
                                  onChange={(option) => {
                                    form.setFieldValue(
                                      field.name,
                                      option.value
                                    );
                                  }}
                                  menuPortalTarget={document.body}
                                  styles={{
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                  }}
                                />
                              )}
                            </Field>
                          </FormItem>
                        </Td>
                        <Td style={style}>
                          <FormItem
                            label=""
                            className="mb-2"
                            invalid={drawingRevisionFeedBack.invalid}
                            errorMessage={drawingRevisionFeedBack.errorMessage}
                          >
                            <Field
                              autoComplete="off"
                              invalid={drawingRevisionFeedBack.invalid}
                              type="text"
                              name={`items[${index}].drawing_revision`}
                              size="sm"
                              className={
                                values.items[index].Product?.Drawings?.some(
                                  (drawingRevision) =>
                                    drawingRevision.revision_number ===
                                    values?.items[index].drawing_revision
                                ) && "bg-emerald-100"
                              }
                              placeholder="Drawing Revision Number"
                              component={Input}
                            />
                          </FormItem>
                        </Td>
                        <Td style={style}>
                          <FormItem
                            label=""
                            className="mb-2"
                            invalid={quantityFeedBack.invalid}
                            errorMessage={quantityFeedBack.errorMessage}
                          >
                            <Field
                              invalid={quantityFeedBack.invalid}
                              autoComplete="off"
                              type="text"
                              name={`items[${index}].quantity`}
                              size="sm"
                              placeholder="Quantity"
                              component={Input}
                            />
                          </FormItem>
                        </Td>
                        <Td style={style}>
                          <DatePickerInformationField
                            // errors={errors?.enquiry_date}
                            // touched={touched?.enquiry_date}
                            placeholder="Expected Delivery Date"
                            label=""
                            size="sm"
                            name={`items[${index}].delivery_date`}
                            value={values.items[index].delivery_date}
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                            }}
                          />
                          {/* <FormItem
                            label=""
                            className="mb-2"
                            invalid={deliveryFeedBack.invalid}
                            errorMessage={deliveryFeedBack.errorMessage}
                          >
                            <Field
                              invalid={deliveryFeedBack.invalid}
                              autoComplete="off"
                              type="text"
                              name={`items[${index}].delivery_date`}
                              size="sm"
                              placeholder="Expeted Delivery Date"
                              component={Input}
                            />
                          </FormItem> */}
                        </Td>
                        <Td
                          style={{
                            textAlign: "center",
                            border: ".2px dashed lightGray",
                            width: "100px",
                          }}
                        >
                          <Button
                            shape="circle"
                            size="sm"
                            onClick={() => remove(index)}
                            icon={<HiOutlineTrash />}
                          ></Button>
                        </Td>
                      </Tr>
                    );
                  })
                : null}

              <Tr>
                <Td colSpan={5} style={{ textAlign: "end" }}>
                  <Button
                    type="button"
                    size="sm"
                    variant="solid"
                    color="purple-600"
                    onClick={() => {
                      push({
                        Product: null,
                        quantity: "",
                        delivery_date: "",
                        drawing_revision: "",
                      });
                    }}
                  >
                    Add an Product
                  </Button>
                </Td>
              </Tr>
            </>
          )}
        </FieldArray>
      </TBody>
    </Table>
  );
};

export default ItemForm;
