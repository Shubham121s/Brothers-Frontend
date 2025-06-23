import React, { useEffect } from "react";
import {
  Container,
  DoubleSidedImage,
  Loading,
} from "../../../../components/shared";
import { isEmpty } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import {
  apiDeleteCustomer,
  apiUpdateCustomerDetails,
} from "../../../../services/SuperAdmin/Customer/CustomerService";
import {
  Button,
  Card,
  Notification,
  Tabs,
  Toast,
} from "../../../../components/ui";
import CustomerDetail from "./components/CustomerDetails";
import ShippingAddressTable from "./components/ShippingAddress/ShippingAddressTable";
import ShippingDetailsTable from "./components/ShippingDetails/ShippingDetailsTable";
import NewShippingAddressDialog from "./components/ShippingAddress/NewShippingAddressDialog";
import { injectReducer } from "../../../../store";
import customerDetailsReducer from "./store";
import NewShippingDetailsDialog from "./components/ShippingDetails/NewShippingDetailsDialog";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerDetailsByCustomerId } from "./store/dataSlice";
import {
  setCustomerId,
  toggleNewShippingAddressDialog,
  toggleNewShippingDetailsDialog,
} from "./store/stateSlice";
import TabList from "../../../../components/ui/Tabs/TabList";
import TabNav from "../../../../components/ui/Tabs/TabNav";
import TabContent from "../../../../components/ui/Tabs/TabContent";

const popNotification = (title, type, message) => {
  return Toast.push(
    <Notification title={title} type={type} duration={2500}>
      {message}
    </Notification>,
    {
      placement: "top-center",
    }
  );
};

injectReducer("customer_details", customerDetailsReducer);

const CustomerDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector((state) => state.customer_details.data.loading);
  const data = useSelector(
    (state) => state.customer_details.data.customerDetails
  );
  const customer_id = useSelector(
    (state) => state.customer_details.state.customer_id
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const customer_id = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (customer_id) {
      dispatch(setCustomerId(customer_id));
      await dispatch(getCustomerDetailsByCustomerId({ customer_id }));
    }
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    const response = await apiUpdateCustomerDetails(values);
    setSubmitting(false);
    if (response.data?.success) {
      popNotification(
        "Updated",
        String(data.customer_type).charAt(0).toUpperCase() +
          String(data.customer_type).slice(1)
      );
    }
  };

  const handleDelete = async ({ setDialogOpen, setLoading }) => {
    const response = await apiDeleteCustomer({ customer_id });
    if (response.data?.success) {
      setDialogOpen(false);
      popNotification(
        "Deleted",
        String(data.customer_type).charAt(0).toUpperCase() +
          String(data.customer_type).slice(1)
      );
    }
    setLoading(false);
  };

  const handleDiscard = () => {
    navigate("/customer");
  };

  const onAddShippingDetails = () => {
    dispatch(toggleNewShippingDetailsDialog(true));
  };

  const onAddShippingAddress = () => {
    dispatch(toggleNewShippingAddressDialog(true));
  };

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(data) && (
          <>
            <CustomerDetail data={data} />
            <Card className="mt-4 bg-gray-50">
              <Tabs defaultValue="address">
                <TabList className="flex justify-between">
                  <div className="flex">
                    <TabNav disabled value="order">
                      PURCHASE ORDERS
                    </TabNav>
                    <TabNav disabled value="invoice">
                      INVOICES
                    </TabNav>
                    <TabNav value="address">SHIPPING ADDRESSES</TabNav>
                    <TabNav value="details">SHIPPING DETAILS</TabNav>
                  </div>
                  <div>
                    <TabContent value="address">
                      <Button
                        onClick={onAddShippingAddress}
                        size="sm"
                        variant="solid"
                        color="pink-500"
                      >
                        New Address
                      </Button>
                    </TabContent>
                    <TabContent value="details">
                      <Button
                        onClick={onAddShippingDetails}
                        size="sm"
                        variant="solid"
                        color="pink-500"
                      >
                        New Shipping
                      </Button>
                    </TabContent>
                  </div>
                </TabList>
                <div className="p-4">
                  <TabContent value="address">
                    <div className="mt-4">
                      <ShippingAddressTable
                        className={"bg-slate-50"}
                        data={data?.CustomerShippingAddresses}
                      />
                      <NewShippingAddressDialog />
                    </div>
                  </TabContent>
                  <TabContent value="details">
                    <div className="mt-4">
                      <ShippingDetailsTable
                        className={""}
                        data={data?.CustomerShippingDetails}
                      />
                      <NewShippingDetailsDialog />
                    </div>
                  </TabContent>
                  <TabContent value="order">
                    <h3 className="text-center">Coming Soon...</h3>
                  </TabContent>
                  <TabContent value="invoice">
                    <h3 className="text-center">Coming Soon...</h3>
                  </TabContent>
                </div>
              </Tabs>
            </Card>
          </>
        )}
      </Loading>
      {!loading && isEmpty(data) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No order found!"
          />
          <h3 className="mt-8">Customer Not found!</h3>
        </div>
      )}
    </Container>
  );
};

export default CustomerDetails;
