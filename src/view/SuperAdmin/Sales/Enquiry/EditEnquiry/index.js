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
} from "./store/dataSlice";
import EnquiryForm from "../EnquiryForm";
import { postNewEnquiry } from "./store/dataSlice";
import { getAllEnquiry } from "../EnquiryList/store/dataSlice";

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
  const isOpen = useSelector((state) => state.enquiry.state.openEditDrawer);
  const selectedEnquiry = useSelector(
    (state) => state.enquiry.state.selectedEnquiry
  );

  useEffect(() => {
    if (isOpen) {
      getWindowSize();
      fetchData();
    }
  }, [isOpen]); // Run the effect only when isOpen changes

  const fetchData = async () => {
    dispatch(getAllCustomers());
    dispatch(getAllProductsWithDrawing());
    dispatch(getEnquiryById({ enquiry_id: selectedEnquiry?.enquiry_id }));
  };

  const getWindowSize = () => {
    const width = window.innerWidth;
    setSize(width);
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log(values);
    // setSubmitting(true);
    // const action = await dispatch(postNewEnquiry(values));
    // if (action.payload.status < 300) {
    //   setSubmitting(false);
    //   popNotification("Successfull", "success", "Enquiry Successfully created");
    //   onDrawerClose();
    //   dispatch(getAllEnquiry());
    // } else {
    //   popNotification("Unsuccessful", "error", "Enquiry not created");
    //   setSubmitting(false);
    // }
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
        <EnquiryForm
          type="edit"
          onFormSubmit={handleFormSubmit}
          onDiscard={handleDiscard}
          Customers={Customers}
          Products={Products}
          initialData={Enquiry}
        />
      </Drawer>
    </>
  );
};

export default EditEnquiry;
