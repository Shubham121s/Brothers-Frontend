import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getAllCondition,
  getAllCustomers,
  getAllNotes,
  getAllProductsWithDrawing,
  getPoDetailsByPoId,
  postUpdatePo,
} from "./store/dataSlice";
import PoForm from "../PoForm";
import editPoReducer from "./store";
import { injectReducer } from "../../../../store";
import { Notification, Toast } from "../../../../components/ui";
import { Loading } from "../../../../components/shared";

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
    dispatch(getAllCondition({ type: "po" }));
    dispatch(getAllNotes());
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
  const Notes = useSelector((state) => state.edit_po.data.notes);
  const Condition = useSelector((state) => state.edit_po.data.condition);
  const loadingStates = useSelector((state) => state.edit_po.data.loading);

  const isLoading = Object.values(loadingStates).some((state) => state);

  const noteOption = useMemo(() => {
    return Notes?.map((m) => {
      return { label: m.name, value: { note_id: m.note_id, notes: m.notes } };
    });
  }, [Notes]);

  const conditionOption = useMemo(() => {
    return Condition?.map((m) => {
      return {
        label: m.name,
        value: { condition_id: m.condition_id, condition: m.condition },
      };
    });
  }, [Condition]);

  const updatePo = async (data) => {
    const action = await dispatch(postUpdatePo(data));
    return action;
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log("values from here", values);
    setSubmitting(true);
    const action = await updatePo(values);
    setSubmitting(false);

    console.log("action", action.payload.data.message);
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
    } else {
      Toast.push(
        <Notification title={"Error"} type="danger" duration={2500}>
          {/* Some Error Occured */}
          {action.payload.data.message}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  const handleDiscard = () => {
    navigate("/po/list");
  };

  return (
    <Loading loading={isLoading}>
      <PoForm
        type="edit"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
        customers={customers}
        products={products}
        Notes={noteOption}
        Condition={conditionOption}
        initialData={{
          ...initialData,
          date: initialData ? new Date(initialData.date) : null,
          Note: {
            ...initialData?.Note,
            notes: initialData?.Note?.notes
              ? JSON.parse(initialData?.Note?.notes)
              : [],
          },
        }}
      />
    </Loading>
  );
};

export default EditPO;
