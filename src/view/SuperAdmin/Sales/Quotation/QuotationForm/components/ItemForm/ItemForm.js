import React, { useMemo } from "react";
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import {
  FormItem,
  Button,
  Input,
  Select,
  DatePicker,
  Table,
} from "../../../../../../../components/ui";
import { HiCheck } from "react-icons/hi";
import { components } from "react-select";

import { HiOutlineTrash } from "react-icons/hi";
const { Tr, Th, Td, THead, TBody } = Table;
const { Control } = components;

const ItemForm = ({ values, errors, touched, Products = [] }) => {
  const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name);
    const touch = getIn(form.touched, name);
    return {
      // errorMessage: error || "",
      invalid: touch && Boolean(error),
    };
  };

  const productData = useMemo(() => {
    return Products.map((product) => {
      return { label: product.name, value: product };
    });
  }, [Products]);

  const CustomConTrol = ({ children, ...props }) => {
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
          <div className="ml-2 uppercase">
            {`${label} ( ${data?.value?.item_code})`}
          </div>
          {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
      </div>
    );
  };

  const style = {
    textAlign: "center",
    border: ".2px dashed lightGray",
    width: "130px",
  };

  // Product: null,
  // casting_drawing_no: "",
  // machining_drawing_no: "",
  // material: "",
  // quantity: "",
  // raw_weight: "",
  // raw_per_kg_rate: "",
  // raw_material_cost: "",
  // machining: "",
  // blasting_primer_paint: "",
  // packing_cost: "",
  // total_per_unit_cost1: "",
  // profit: "",
  // total_per_unit_cost2: "",
  // pattern_tooling_cost: "",
  // lead_time: "",

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <Table
        className="relative"
        compact={true}
        style={{ width: "max-content" }}
      >
        <THead className="sticky" style={{ top: "-.2px" }}>
          <Tr>
            <Th style={style} rowSpan="3">
              Sr
            </Th>
            <Th style={style} rowSpan="3">
              Item Name
            </Th>
            <Th style={style} rowSpan="3">
              Casting Drawing No
            </Th>
            <Th style={style} rowSpan="3">
              Machinng Drawing No
            </Th>
            <Th style={style} rowSpan="3">
              Material
            </Th>
            <Th style={style} rowSpan="3">
              MOQ QTY
            </Th>
            <Th style={style} rowSpan="2" colSpan="1">
              RAW Weight
            </Th>
            <Th style={style} colSpan="9">
              Costing INR
            </Th>
            <Th style={style} rowSpan="3">
              Lead Time
            </Th>
            <Th
              style={{
                textAlign: "center",
                border: ".2px dashed lightGray",
                width: "30px",
              }}
              rowSpan="3"
            >
              Action
            </Th>
          </Tr>
          <Tr>
            <Th style={style} colSpan="1">
              Raw per Kg rate
            </Th>
            <Th style={style} colSpan="1">
              Raw Material cost
            </Th>
            <Th style={style} colSpan="1">
              Machining
            </Th>
            <Th style={style} colSpan="1">
              Blasting, Primer Paint
            </Th>
            <Th style={style} colSpan="1">
              EX-Work Packing Cost
            </Th>
            <Th style={style} colSpan="1">
              {"Total per Unit Cost (Ex-Work)"}
            </Th>
            <Th style={style} colSpan="1">
              {"Profit (7%)"}
            </Th>
            <Th style={style} colSpan="1">
              {"Total per Unit Cost (Ex-Work)"}
            </Th>
            <Th style={style} colSpan="1">
              Pattern and Tooling Cost
            </Th>
          </Tr>
          <Tr>
            <Th style={style}>A</Th>
            <Th style={style}>B</Th>
            <Th style={style}>{`C=(AXB)`}</Th>
            <Th style={style}>D</Th>
            <Th style={style}>G</Th>
            <Th style={style}>F</Th>
            <Th style={style}>{`T=C+D+F+E+G`}</Th>
            <Th style={style}>p</Th>
            <Th style={style}>{`TT=T+P`}</Th>
            <Th style={style}>PT</Th>
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

                      values.items[index]["raw_material_cost"] = (
                        parseFloat(values.items[index]["raw_weight"]) *
                        parseFloat(values.items[index]["raw_per_kg_rate"])
                      ).toFixed(2);

                      // const drawingRevisionFeedBack = fieldFeedback(
                      //   form,
                      //   `items[${index}].drawing_revision`
                      // );

                      // const quantityFeedBack = fieldFeedback(
                      //   form,
                      //   `items[${index}].quantity`
                      // );
                      // const deliveryFeedBack = fieldFeedback(
                      //   form,
                      //   `items[${index}].delivery_date`
                      // );
                      return (
                        <Tr key={index}>
                          <Td style={style}>{index + 1}.</Td>
                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // invalid={paroductFeedBack.invalid}
                              // // errorMessage={paroductFeedBack.errorMessage}
                            >
                              <Field
                                name={`items[${index}].Product`}
                                // // invalid={paroductFeedBack.invalid}
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
                                      ConTrol: CustomConTrol,
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
                              // // invalid={drawingRevisionFeedBack.invalid}
                              // // errorMessage={drawingRevisionFeedBack.errorMessage}
                            >
                              <Field
                                autoComplete="off"
                                // // invalid={drawingRevisionFeedBack.invalid}
                                type="text"
                                name={`items[${index}].casting_drawing_no`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>
                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={quantityFeedBack.invalid}
                              // // errorMessage={quantityFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={quantityFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].machining_drawing_no`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>
                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].material`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>
                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].quantity`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].raw_weight`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].raw_per_kg_rate`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].raw_material_cost`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].machining`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].blasting_primer_paint`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].packing_cost`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].total_per_unit_cost1`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].profit`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].total_per_unit_cost2`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].pattern_tooling_cost`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>

                          <Td style={style}>
                            <FormItem
                              label=""
                              className="mb-2"
                              // // invalid={deliveryFeedBack.invalid}
                              // // errorMessage={deliveryFeedBack.errorMessage}
                            >
                              <Field
                                // // invalid={deliveryFeedBack.invalid}
                                autoComplete="off"
                                type="text"
                                name={`items[${index}].lead_time`}
                                size="sm"
                                component={Input}
                              />
                            </FormItem>
                          </Td>
                          <Td
                            style={{
                              textAlign: "center",
                              border: ".2px dashed lightGray",
                              widTh: "100px",
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
                  <Td colSpan={18} style={{ textAlign: "end" }}>
                    <Button
                      type="button"
                      size="sm"
                      variant="solid"
                      color="purple-600"
                      onClick={() => {
                        push({
                          Product: null,
                          casting_drawing_no: "",
                          machining_drawing_no: "",
                          material: "",
                          quantity: "",
                          raw_weight: "",
                          raw_per_kg_rate: "",
                          raw_material_cost: "",
                          machining: "",
                          blasting_primer_paint: "",
                          packing_cost: "",
                          total_per_unit_cost1: "",
                          profit: "",
                          total_per_unit_cost2: "",
                          pattern_tooling_cost: "",
                          lead_time: "",
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
    </div>
  );
};

export default ItemForm;
