import React, { useEffect, useMemo } from "react";
import { Card, FormItem, Select } from "../../../../../../../components/ui";
import { Field } from "formik";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const PoSerialNumberInformationFields = (props) => {
  const { errors, values, Po, touched, dispatchList } = props;

  const poDetails = useSelector(
    (state) => state.new_domestic_invoice.data.poDetails
  );
  const latestPoList =
    poDetails?.PoLists?.find(
      (list) => list.po_list_id === values?.po_list_id
    ) || values;
  const dispatchedQty =
    (dispatchList || [])
      ?.flatMap((d) => d.poList)
      ?.filter((item) => item?.PoList?.po_list_id === latestPoList?.po_list_id)
      ?.reduce((sum, po) => sum + parseInt(po?.quantity), 0) || 0;
  const pendingQty = Math.max(
    parseInt(latestPoList?.quantity) - dispatchedQty,
    0
  );

  const poSerialNumberListData = useMemo(() => {
    if (!poDetails || !poDetails.PoLists) return [];
    return poDetails.PoLists.map((list) => {
      return {
        label: `${list?.serial_number} : ${list?.Product?.name}`,
        value: list,
      };
    });
  }, [poDetails]);

  return (
    <FormItem
      className="mb-4"
      label="PO Serial Number"
      invalid={errors && touched}
      errorMessage={errors}
    >
      <Field name="PoList">
        {({ field, form }) => (
          <Select
            field={field}
            form={form}
            options={poSerialNumberListData}
            value={poSerialNumberListData.filter(
              (product) => product.value?.po_list_id === values?.po_list_id
            )}
            onChange={(option) => {
              form.setFieldValue("quantity", "");
              form.setFieldValue(field.name, option.value);
            }}
          />
        )}
      </Field>
      {!isEmpty(values) ? (
        <Card className="mt-2 bg-orange-50">
          <div className="flex justify-between">
            <strong>PO Sr. No :</strong>{" "}
            <span>{values?.serial_number || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>PO Del Date :</strong>{" "}
            <span>
              {dayjs(values?.delivery_date).format("DD-MMM-YYYY") || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <div>
              <strong>Price :</strong> <span>{values?.unit_price || "-"}</span>
            </div>
            <div>
              <strong>Qty :</strong>{" "}
              <span>
                {pendingQty} / {latestPoList?.quantity || "-"}
              </span>
            </div>
          </div>
        </Card>
      ) : null}
    </FormItem>
  );
};

export default PoSerialNumberInformationFields;
