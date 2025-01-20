import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Card,
  FormItem,
  Input,
} from "../../../../../../../components/ui";
import { Field } from "formik";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

const getAllPoList = (DispatchLocations = []) => {
  return DispatchLocations?.reduce((allDispatchList, item) => {
    return allDispatchList?.concat(item.DispatchLists);
  }, []);
};

const ItemQuantityInformationFields = (props) => {
  const { dispatchList } = props;
  const selectedDispatchItem = useSelector(
    (state) => state.edit_domestic_dispatch.state.selectedDispatchItem
  );
  const [value, setValue] = useState(selectedDispatchItem?.item_quantity || 0);

  const [pendingQuantity, setPendingQuantity] = useState(0);

  useEffect(() => {
    setPendingQuantity(
      selectedDispatchItem?.PoList?.quantity -
        getAllPoList(dispatchList)
          ?.filter(
            (item) =>
              item?.PoList?.po_list_id ===
              selectedDispatchItem?.PoList?.po_list_id
          )
          ?.reduce((sum, list) => sum + parseInt(list?.item_quantity), 0)
    );
  }, [selectedDispatchItem]);

  return (
    <FormItem label="Quantity" className="mb-4">
      <Field name="quantity">
        {({ field, form }) => (
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-1">
              <Button
                className="w-full"
                style={{ borderRadius: "5px 0px 0px 5px" }}
                type="button"
                icon={<HiMinus />}
                disabled={value === 1 || value === ""}
                onClick={() => {
                  setPendingQuantity(1 + pendingQuantity);
                  setValue(+parseInt(value || 0) - 1);
                  form.setFieldValue("item_quantity", value - 1);
                }}
              ></Button>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-1">
              <Card
                className="flex justify-center items-center"
                bodyClass="p-0 flex justify-center item-center"
              >
                {pendingQuantity}
              </Card>
              <Card
                className="flex justify-center items-center"
                bodyClass="p-0 flex justify-center item-center"
              >
                {value}
              </Card>
            </div>
            <div className="col-span-1">
              <Button
                className="w-full"
                style={{ borderRadius: "0px 5px 5px 0px" }}
                disabled={pendingQuantity === 0}
                icon={<HiPlus />}
                type="button"
                onClick={() => {
                  setPendingQuantity(pendingQuantity - 1);
                  setValue(+parseInt(value || 0) + 1);
                  form.setFieldValue("item_quantity", value + 1);
                }}
              ></Button>
            </div>
          </div>
        )}
      </Field>
    </FormItem>
  );
};

export default memo(ItemQuantityInformationFields);
