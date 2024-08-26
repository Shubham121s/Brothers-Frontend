import React, { useEffect, useState } from "react";
import {
  Notification,
  Toast,
  Drawer,
  Button,
} from "../../../../../components/ui";
import { injectReducer } from "../../../../../store";
import editEnquiryReducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleDrawer,
  toggleEditDrawer,
} from "../EnquiryList/store/stateSlice";
import {
  getAllCustomers,
  getAllProductsWithDrawing,
  getEnquiryById,
  UpdateEnquiry,
} from "./store/dataSlice";
import EnquiryForm from "../EnquiryForm";
import { postNewEnquiry } from "./store/dataSlice";
import { getAllEnquiry } from "../EnquiryList/store/dataSlice";
import { Loading } from "../../../../../components/shared";

injectReducer("enquiry_edit", editEnquiryReducer);

const popNotification = (keyword, type, message) => {
  Toast.push(
    <Notification title={keyword} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-end",
    }
  );
};

const EditEnquiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [size, setSize] = useState(1400);

  const Customers = useSelector((state) => state.enquiry_edit.data.customers);
  const Products = useSelector((state) => state.enquiry_edit.data.products);
  const Enquiry = useSelector((state) => state.enquiry_edit.data.enquiry);
  const loadingStates = useSelector((state) => state.enquiry_edit.data.loading);
  const isOpen = useSelector((state) => state.enquiry.state.openEditDrawer);
  const selectedEnquiry = useSelector(
    (state) => state.enquiry.state.selectedEnquiry
  );

  const loading = Object.values(loadingStates);
  console.log(loading);

  useEffect(() => {
    if (isOpen) {
      getWindowSize();
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      await dispatch(getAllCustomers());
      await dispatch(getAllProductsWithDrawing());
      await dispatch(
        getEnquiryById({ enquiry_id: selectedEnquiry?.enquiry_id })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getWindowSize = () => {
    const width = window.innerWidth;
    setSize(width - 250);
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    const action = await dispatch(UpdateEnquiry(values));
    if (action.payload.status < 300) {
      setSubmitting(false);
      popNotification("Successfull", "success", "Enquiry Successfully Updated");
      onDrawerClose();
      dispatch(getAllEnquiry());
    } else {
      popNotification("Unsuccessful", "error", "Enquiry not Updated");
      setSubmitting(false);
    }
  };

  const onDrawerClose = () => {
    dispatch(toggleEditDrawer(false));
  };

  const handleDiscard = () => {
    navigate("/product");
  };

  const Footer = (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={() => onDrawerClose()}>
        Cancel
      </Button>
      <Button size="sm" variant="solid">
        Save
      </Button>
    </div>
  );
  return (
    <>
      <Drawer
        title="Edit Enquiry"
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        // footer={Footer}
        width={size}
      >
        <Loading loading={!loading.every((value) => value === false)}>
          <EnquiryForm
            type="edit"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
            Customers={Customers}
            Products={Products}
            initialData={{
              ...Enquiry,
              enquiry_date: new Date(Enquiry?.enquiry_date),
              items: Enquiry?.items?.map((m) => {
                return { ...m, delivery_date: new Date(m.delivery_date) };
              }),
            }}
          />
        </Loading>
      </Drawer>
    </>
  );
};

export default EditEnquiry;
