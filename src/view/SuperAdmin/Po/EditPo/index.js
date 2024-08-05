import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getAllCustomers,
  getAllProductsWithDrawing,
  getPoDetailsByPoId,
  postUpdatePo,
} from "./store/dataSlice";
import PoForm from "../PoForm";
import editPoReducer from "./store";
import { injectReducer } from "../../../../store";
import { Notification, Toast } from "../../../../components/ui";

injectReducer("edit_po", editPoReducer);

const EditPO = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const po_id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const fetch = async () => {
    dispatch(getAllCustomers());
    dispatch(getAllProductsWithDrawing());
    if (po_id) {
      await dispatch(getPoDetailsByPoId({ po_id }));
    }
  };

  useEffect(() => {
    fetch();
  }, [po_id]);

  const initialData = useSelector((state) => state.edit_po.data.poDetails);
  const customers = useSelector((state) => state.edit_po.data.customers);
  const products = useSelector((state) => state.edit_po.data.products);

  const updatePo = async (data) => {
    const action = await dispatch(postUpdatePo(data));
    return action;
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    const action = await updatePo(values);
    setSubmitting(false);
    if (action.payload.status === 200) {
      Toast.push(
        <Notification title="Successfully added" type="success" duration={2500}>
          Po successfully added
        </Notification>,
        {
          placement: "top-center",
        }
      );
      handleDiscard();
    }
  };

  const handleDiscard = () => {
    navigate("/super/admin/po/list");
  };

  return (
    <>
      <PoForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        customers={customers}
        products={products}
        initialData={{
          ...initialData,
          date: initialData ? new Date(initialData.date) : null,
          Note: {
            ...initialData?.Note,
            notes: JSON.parse(initialData?.Note?.notes),
          },
        }}
      />
    </>
  );
};

export default EditPO;
