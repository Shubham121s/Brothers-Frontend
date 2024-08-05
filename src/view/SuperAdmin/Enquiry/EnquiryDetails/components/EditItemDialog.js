import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Dialog,
  FormContainer,
  Notification,
  Toast,
  FormItem,
  Input,
} from "../../../../../components/ui";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import {
  toggleAddProductDialog,
  setSelectedProduct,
  emptyFinishWeights,
} from "../store/stateSlice";
import Fabricatoin from "./FabricationForm";
import FabricationTable from "./FabricationTable";

import FinishWeightDialog from "./FinishWeightDialog";
import { setQuantityQuotationProfileToZero } from "../store/dataSlice";
const validationSchema = Yup.object().shape({
  accept_description: Yup.string().required("Required"),
  accept_delivery_date: Yup.date().required("Required"),
});

const AddProductDialog = () => {
  const dispatch = useDispatch();

  const editPoItemDialog = useSelector(
    (state) => state.enquiry_detail.state.addProductDialog
  );

  const finishWeights = useSelector(
    (state) => state.enquiry_detail.state.finishWeights
  );

  const selectedProduct = useSelector(
    (state) => state.enquiry_detail.state.selectedProductItem
  );

  const selectedScrapFabrication = useSelector(
    (state) => state.enquiry_detail.state.selectedScrapFabrication
  );

  const ScrapWeight = useMemo(() => {
    return selectedScrapFabrication?.map((m) => {
      const raw_weight =
        ((m.fabrication_id * m.fabrication_id * parseFloat(m.thickness)) /
          160 /
          1000) *
        m.fabrication_quantity;

      const amount =
        parseFloat(raw_weight) * parseFloat(m.fabrication_material_rate);

      return {
        ...m,
        raw_weight: parseFloat(raw_weight),
        amount: parseFloat(amount),
      };
    });
  }, [selectedScrapFabrication]);

  const selectedFabrication = useSelector(
    (state) => state.enquiry_detail.state.selectedFabrication
  );

  const RawWeight = useMemo(() => {
    return selectedFabrication?.map((m) => {
      const raw_weight =
        m.fabrication_part_type === "PLATE"
          ? m.fabrication_length *
            m.fabrication_width *
            parseFloat(m.thickness) *
            0.00000786 *
            m.fabrication_quantity
          : ((m.fabrication_length *
              m.fabrication_length *
              parseFloat(m.thickness)) /
              160 /
              1000) *
            m.fabrication_quantity;

      const amount = parseFloat(raw_weight) * parseFloat(m.raw_material_rate);

      return {
        ...m,
        raw_weight: parseFloat(raw_weight).toFixed(2),
        amount: parseFloat(amount).toFixed(2),
      };
    });
  }, [selectedFabrication]);
  const onDialogClose = () => {
    dispatch(emptyFinishWeights());
    dispatch(setQuantityQuotationProfileToZero());
    dispatch(toggleAddProductDialog(false));
  };

  const calulateCircleValues = (values) => {
    var od = parseFloat(values.od);
    var thickness = parseFloat(values.thickness);
    var rawMaterialRate = parseFloat(values.raw_material_rate);
    var cuttingRate = parseFloat(values.cutting_rate);
    var profitPercentage = parseFloat(values.profit_percent);
    var quantity = parseFloat(values.quantity);

    var odWeight = (od * od * thickness) / 160 / 1000;
    var odAmount = odWeight * rawMaterialRate;
    var cuttingMtr = (od * Math.PI * thickness) / 1000;
    var cuttingAmount = cuttingMtr * cuttingRate;
    var Amount = odAmount + cuttingAmount;
    var profitAmount = Amount * (profitPercentage / 100);
    var eachRate = Amount + profitAmount;
    var per_kg_rate = eachRate / odWeight;
    var finalAmount = eachRate * quantity;

    // Create data object with rounded values
    const data = {
      od_weight: parseFloat(odWeight.toFixed(2)),
      od_amount: parseFloat(odAmount.toFixed(2)),
      cutting_mtr: parseFloat(cuttingMtr.toFixed(2)),
      cutting_amount: parseFloat(cuttingAmount.toFixed(2)),
      total_amount: parseFloat(Amount.toFixed(2)),
      profit_amount: parseFloat(profitAmount.toFixed(2)),
      each_rate: parseFloat(eachRate.toFixed(2)),
      per_kg_rate: parseFloat(per_kg_rate.toFixed(2)),
      final_amount: parseFloat(finalAmount.toFixed(2)),
      enquiry_id: values.enquiry_id,
      enquiry_list_id: values.enquiry_list_id,
      od: od,
      thickness: thickness,
      raw_material_rate: rawMaterialRate,
      cutting_rate: cuttingRate,
      profit: profitPercentage,
      quantity: quantity,
      drawing_number: values.drawing_number,
      part_name: values.part_name,
      part_number: values.part_number,
      part_type: values.part_type,
      profit_percent: values.profit_percent,
    };

    console.log(data);
    return data;
  };

  const calculateSquareValues = (values) => {
    const length = parseFloat(values.length);
    const width = parseFloat(values.width);
    const thickness = parseFloat(values.thickness);
    const quantity = parseFloat(values.quantity);
    const rawMaterialRate = parseFloat(values.raw_material_rate);

    if (
      !isNaN(length) &&
      !isNaN(width) &&
      !isNaN(thickness) &&
      !isNaN(quantity) &&
      !isNaN(rawMaterialRate)
    ) {
      const square_weight = (length * width * thickness * 7.85) / 1000000;
      const amount = square_weight * rawMaterialRate;
      const cutting_charges = (((length + width) * 2 * thickness) / 1000) * 4.5;
      const profit = (amount * values.profit_percent) / 100;
      const each_rate = amount + cutting_charges + profit;
      const final_amount = each_rate * quantity;
      const per_kg_rate = each_rate / square_weight;
      const data = {
        square_weight: parseFloat(square_weight.toFixed(2)),
        amount: parseFloat(amount.toFixed(2)),
        cutting_charges: parseFloat(cutting_charges.toFixed(2)),
        each_rate: parseFloat(each_rate.toFixed(2)),
        profit: profit,
        profit_percent: values.profit_percent,
        per_kg_rate: parseFloat(per_kg_rate.toFixed(2)),
        final_amount: parseFloat(final_amount.toFixed(2)),
        enquiry_id: values.enquiry_id,
        enquiry_list_id: values.enquiry_list_id,
        length: length,
        thickness: thickness,
        width: width,
        raw_material_rate: rawMaterialRate,
        quantity: quantity,
        drawing_number: values.drawing_number,
        part_name: values.part_name,
        part_number: values.part_number,
        part_type: values.part_type,
      };

      return data;
    } else {
      console.error("Error parsing values as floats");
    }
  };

  const calculateRingValues = (values) => {
    const od = parseFloat(values.od);
    const id = parseFloat(values.id);
    const thickness = parseFloat(values.thickness);
    const quantity = parseFloat(values.quantity);
    const raw_material_rate = parseFloat(values.raw_material_rate);
    const cutting_rate = parseFloat(values.cutting_rate);
    const id_rate = parseFloat(values.id_rate);

    const od_weight = ((od * od * thickness) / 160 / 1000).toFixed(2);
    const od_amount = (od_weight * raw_material_rate).toFixed(2);
    const id_weight = ((id * id * thickness) / 160 / 1000).toFixed(2);
    const id_amount = (id_rate * id_weight).toFixed(2);
    const amount = (od_amount - id_amount).toFixed(2);
    const cutting_mtr = (((od + id) * 3.14 * thickness) / 1000).toFixed(2);
    const cutting_amount = (cutting_mtr * cutting_rate).toFixed(2);
    const total_amount = (
      parseFloat(amount) + parseFloat(cutting_amount)
    ).toFixed(2);
    const profit = (total_amount * (values.profit_percent / 100)).toFixed(2);
    const each_rate = (parseFloat(total_amount) + parseFloat(profit)).toFixed(
      2
    );
    const ring_weight = (parseFloat(od_weight) - parseFloat(id_weight)).toFixed(
      2
    );
    const per_kg_rate = (each_rate / ring_weight).toFixed(2);
    const final_amount = (each_rate * quantity).toFixed(2);

    return {
      od_weight,
      od_amount,
      id_weight,
      id_amount,
      amount,
      cutting_mtr,
      cutting_amount,
      total_amount,
      profit,
      each_rate,
      ring_weight,
      per_kg_rate,
      final_amount,
      enquiry_id: values.enquiry_id,
      enquiry_list_id: values.enquiry_list_id,
      od: od,
      id: id,
      thickness: thickness,
      raw_material_rate: raw_material_rate,
      cutting_rate: cutting_rate,
      profit: profit,
      id_rate: id_rate,
      quantity: quantity,
      drawing_number: values.drawing_number,
      part_name: values.part_name,
      part_number: values.part_number,
      part_type: values.part_type,
      profit_percent: values.profit_percent,
    };
  };

  const calculateProfileValues = (values) => {
    const thickness_profile = parseFloat(values.thickness);

    // Calculating weight

    const weight =
      parseFloat(values.length_profile) *
      parseFloat(values.width_profile) *
      thickness_profile *
      0.00000786;

    // Calculating raw_amount
    const raw_amount = weight * parseFloat(values.raw_material_rate);

    // Calculating finish_weight and cutting_mm
    let finish_weight = 0.0;
    let cutting_mm = 0.0;
    values.arr.forEach((item) => {
      finish_weight += parseFloat(item.weight) * parseFloat(item.quantity);
      console.log(finish_weight);
      cutting_mm += parseFloat(item.cutting_mm) * parseFloat(item.quantity);
    });

    console.log(finish_weight, cutting_mm);
    const length = values.arr.length;

    // Calculating cutting_meter and cutting_charges
    const cutting_meter = (cutting_mm * thickness_profile) / 1000;
    const cutting_charges = cutting_meter * 4.5;

    // Calculating burning_charges
    const burning_charges =
      cutting_mm * thickness_profile * length * 0.00000786;

    // Calculating scrap_weight
    const scrap_weight = weight - finish_weight - burning_charges;

    // Calculating scrap_amount
    const scrap_amount = scrap_weight * parseFloat(values.scrap_rate);

    // Calculating final_amount
    const total_amount = raw_amount - scrap_amount + cutting_charges;

    // Calculating per_nos_rate
    const per_nos_rate = total_amount / parseFloat(values.total_nos);

    // Calculating total_per_kg_rate
    const total_per_kg_rate = total_amount / finish_weight;

    const profit = (total_amount * values.profit_percent) / 100;

    const each_rate = total_amount + profit;
    const final_amount = each_rate * values.quantity;
    const with_per_kg = total_per_kg_rate * 0.1 + total_per_kg_rate;

    const final_products = finishWeights.map((m) => {
      const amount = with_per_kg * m.weight;
      return {
        ...m,
        rate: with_per_kg,
        amount: amount,
        total_amount: amount * m.quantity,
      };
    });

    const result = {
      weight: parseFloat(weight.toFixed(2)),
      row_amount: parseFloat(raw_amount.toFixed(2)),
      finish_weight: parseFloat(finish_weight.toFixed(2)),
      cutting_mm: parseFloat(cutting_mm.toFixed(2)),
      cutting_meter: parseFloat(cutting_meter.toFixed(2)),
      cutting_charges: parseFloat(cutting_charges.toFixed(2)),
      burning_charges: parseFloat(burning_charges.toFixed(2)),
      scrap_weight: parseFloat(scrap_weight.toFixed(2)),
      scrap_amount: parseFloat(scrap_amount.toFixed(2)),
      total_amount: parseFloat(total_amount.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      each_rate: parseFloat(each_rate.toFixed(2)),
      final_amount: parseFloat(final_amount.toFixed(2)),
      per_nos_rate: parseFloat(per_nos_rate.toFixed(2)),
      total_per_kg_rate: parseFloat(total_per_kg_rate.toFixed(2)),
      raw_material_rate: values.raw_material_rate,
      length_profile: values.length_profile,
      width_profile: values.width_profile,
      scrap_rate: values.scrap_rate,
      total_nos: values.total_nos,
      thickness: parseFloat(values.thickness),
      drawing_number: values.drawing_number,
      part_name: values.part_name,
      part_number: values.part_number,
      part_type: values.part_type,
      enquiry_id: values.enquiry_id,
      enquiry_list_id: values.enquiry_list_id,
      quantity: parseFloat(values.quantity),
      profit_percent: values.profit_percent,
      with_per_kg: with_per_kg,
      quotation_profile: final_products,
    };

    console.log(result);
    console.table(result.quotation_profile);
    return result;
  };

  const calculateFabricationValues = (values) => {
    const total_raw_weight = RawWeight?.reduce(
      (acc, curr) => acc + parseFloat(curr.raw_weight),
      0
    );
    const total_raw_amount = RawWeight?.reduce(
      (acc, curr) => acc + parseFloat(curr.amount),
      0
    );

    const total_scrap_weight = ScrapWeight?.reduce(
      (acc, curr) => acc + curr.raw_weight,
      0
    );
    const total_scrap_amount = ScrapWeight?.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    const finish_weight = total_raw_weight - total_scrap_weight;
    const raw_amount = total_raw_amount - total_scrap_amount;
    const fabrication = finish_weight;
    const sr_sb_penting = finish_weight;
    const machining = 300;
    const total_amount = raw_amount + fabrication + sr_sb_penting + machining;
    const overhead = (total_amount * values.overhead) / 100;
    const total = total_amount + overhead;
    const profit = (values.profit * total) / 100;
    const each_rate = total + profit;
    const final_amount = each_rate * parseFloat(values.quantity);
    const per_kg_rate = final_amount / finish_weight;

    const data = {
      total_raw_weight,
      total_raw_amount,
      total_scrap_weight,
      total_scrap_amount,
      finish_weight,
      raw_amount,
      fabrication,
      sr_sb_penting,
      machining,
      total_amount,
      overhead,
      total,
      profit,
      final_amount,
      per_kg_rate,
      each_rate,
      drawing_number: values.drawing_number,
      part_name: values.part_name,
      part_number: values.part_number,
      part_type: values.part_type,
      enquiry_id: values.enquiry_id,
      enquiry_list_id: values.enquiry_list_id,
      quantity: parseFloat(values.quantity),
      thickness: values.thickness,
      scrap_weight_and_amount: ScrapWeight || [],
      raw_weight_and_amount: RawWeight || [],
    };

    return data;
  };

  return (
    <Dialog
      isOpen={editPoItemDialog}
      width={700}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...selectedProduct,
          raw_material_rate: "",
          cutting_rate: "",
          id_rate: "",
          profit_percent: "",
          length_profile: "",
          width_profile: "",
          scrape_rate: "",
          total_nos: "",
          overhead_percent: "",
          fabrication_part_type: "",
          fabrication_length: "",
          fabrication_width: "",
          fabrication_thickness: "",
          fabrication_quantity: "",
          fabrication_id: "",
          fabrication_material_rate: "",
          type: "",
        }}
        // validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          let result = {};
          if (values.part_type === "CIRCLE") {
            result = calulateCircleValues(values);
          }
          if (values.part_type === "SQUARE") {
            result = calculateSquareValues(values);
          }
          if (values.part_type === "RING") {
            result = calculateRingValues(values);
          }
          if (values.part_type === "PROFILE DRAWING") {
            result = calculateProfileValues({ ...values, arr: finishWeights });
            dispatch(emptyFinishWeights());
            dispatch(setQuantityQuotationProfileToZero());
          }
          if (values.part_type === "FABRICATION DRAWING") {
            result = calculateFabricationValues({
              ...values,
              raw_weight: RawWeight,
              scrap_weight: ScrapWeight,
            });
          }
          dispatch(setSelectedProduct(result));
          dispatch(toggleAddProductDialog(false));
          result = {};
          resetForm();
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => (
          <Form>
            <FormContainer>
              <h4>Enter the Mandatory Fields</h4>
              {/* <p className="mb-2">Section to config item details information</p> */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {values?.part_type === "CIRCLE" && (
                  <>
                    <FormItem
                      label="Raw Material Rate"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="raw_material_rate"
                        placeholder="Enter raw material rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Cutting Rate"
                      invalid={errors.cutting_rate && touched.cutting_rate}
                      errorMessage={errors.cutting_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="cutting_rate"
                        placeholder="Enter cutting rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Profit (%)"
                      invalid={errors.profit && touched.profit}
                      errorMessage={errors.profit}
                    >
                      <Field
                        type="number"
                        name="profit_percent"
                        placeholder="Enter profit percentage"
                        component={Input}
                      />
                    </FormItem>
                  </>
                )}
                {values?.part_type === "SQUARE" && (
                  <>
                    <FormItem
                      label="Raw Material Rate"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="raw_material_rate"
                        placeholder="Enter raw material rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Profit (%)"
                      invalid={errors.profit && touched.profit}
                      errorMessage={errors.profit}
                    >
                      <Field
                        type="number"
                        name="profit_percent"
                        placeholder="Enter profit percentage"
                        component={Input}
                      />
                    </FormItem>
                  </>
                )}
                {values.part_type === "RING" && (
                  <>
                    <FormItem
                      label="Raw Material Rate"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="raw_material_rate"
                        placeholder="Enter raw material rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Id Rate"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="id_rate"
                        placeholder="Id Rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Cutting Rate"
                      invalid={errors.cutting_rate && touched.cutting_rate}
                      errorMessage={errors.cutting_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="cutting_rate"
                        placeholder="Enter cutting rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Profit (%)"
                      invalid={errors.profit && touched.profit}
                      errorMessage={errors.profit}
                    >
                      <Field
                        type="number"
                        name="profit_percent"
                        placeholder="Enter profit percentage"
                        component={Input}
                      />
                    </FormItem>
                  </>
                )}

                {values.part_type === "PROFILE DRAWING" && (
                  <>
                    <FormItem
                      label="Raw Material Rate"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="raw_material_rate"
                        placeholder="Enter raw material rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Length"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="length_profile"
                        placeholder="Length"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Width"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="width_profile"
                        placeholder="Width"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Scrap rate"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="scrap_rate"
                        placeholder="Scrap rate"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Total Nos"
                      invalid={
                        errors.raw_material_rate && touched.raw_material_rate
                      }
                      errorMessage={errors.raw_material_rate}
                      className="mb-2"
                    >
                      <Field
                        type="number"
                        name="total_nos"
                        placeholder="Total Nos"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Profit (%)"
                      invalid={errors.profit && touched.profit}
                      errorMessage={errors.profit}
                    >
                      <Field
                        type="number"
                        name="profit_percent"
                        placeholder="Enter profit percentage"
                        component={Input}
                      />
                    </FormItem>
                  </>
                )}
                {values.part_type === "FABRICATION DRAWING" && (
                  <Fabricatoin
                    errors={errors}
                    touched={touched}
                    values={values}
                    resetForm={resetForm}
                  />
                )}
              </div>
              <div
                className="mt-2  overflow-y-auto"
                style={{ height: "130px" }}
              >
                {values.part_type === "PROFILE DRAWING" && (
                  <FinishWeightDialog />
                )}
              </div>
              {values.part_type === "FABRICATION DRAWING" && (
                <>
                  <FabricationTable />
                </>
              )}

              <div className="flex justify-end px-5 py-2 bg-gray-100 gap-2 rounded-bl-lg rounded-br-lg">
                <Button
                  size="sm"
                  type="button"
                  variant=""
                  onClick={onDialogClose}
                >
                  Discard
                </Button>
                <Button size="sm" variant="solid" type="submit">
                  Add
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddProductDialog;
