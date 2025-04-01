import React from "react";
import {
  EXECUTIVE,
  SUPER_ADMIN,
  ADMIN,
  SUB_ADMIN,
} from "../../constants/roles.constant";

const superAdminRoute = [
  {
    key: "dashboard",
    path: `/dashboard`,
    component: React.lazy(() => import("../../view/SuperAdmin/Dashboard")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // SUPER ADMIN

  // USER
  // **************START***************
  {
    key: "user.list",
    path: `/company/user`,
    component: React.lazy(() => import("../../view/SuperAdmin/User")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // CUSTOMER
  // **************START***************
  {
    key: "customer.dashboard",
    path: `/customer/dashboard`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/Dashboard")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "customer.new",
    path: `/customer/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/NewCustomer")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "customer.list",
    path: `/customer/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/CustomerList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "customer.details",
    path: `/customer-details/:customerId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/CustomerDetails")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "customer.edit",
    path: `/customer/edit/:customerId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/EditCustomer")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // PO
  // **************START*************
  {
    key: "po.new",
    path: `/po/new`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/NewPo")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "po.new",
    path: `/po/list`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/PoList")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "po.new",
    path: `/po-details/:poId`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/PoDetails")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "po.edit",
    path: `/po-Edit/:poId`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/EditPo")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "po.setting",
    path: `/po/setting`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/PoSetting")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // PRODUCT
  // **************START***************
  {
    key: "product.settings",
    path: `/product/settings`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/ProductSetting")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "product.list",
    path: `/product/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/ProductList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "product.new",
    path: `/product/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/NewProduct")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "product.edit",
    path: `/product/edit/:productId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/EditProduct")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  {
    key: "product.dashboard",
    path: `/product/dashboard`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/Dashboard")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // DRAWING
  // **************START***************
  {
    key: "product.drawing.list",
    path: `/product/drawing/:productId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/Drawing/DrawingList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // FOREIGN DISPATCH
  // **************START***************
  {
    key: "invoice.dispatch.new",
    path: `/dispatch/foreign/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Foreign/NewDispatch")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "invoice.dispatch.edit",
    path: `/dispatch/foreign/edit/:invoiceId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Foreign/EditDispatch")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  //SETTINGS INVOICE
  // **************START***************
  {
    key: "invoice.dispatch.setting",
    path: `/dispatch/invoice/setting`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Setting/ForeignInvoiceSetting")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // DOMESTIC DISPATCH
  // **************START***************
  {
    key: "invoice.dispatch.new",
    path: `/dispatch/domestic/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Domestic/NewDispatch")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "invoice.dispatch.edit",
    path: `/dispatch/domestic/edit/:invoiceId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Domestic/EditDispatch")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // PATTERN DISPATCH
  // **************START***************
  {
    key: "invoice.pattern.new",
    path: `/dispatch/pattern/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Pattern/NewPattern")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // {
  //   key: "invoice.dispatch.edit",
  //   path: `/dispatch/domestic/edit/:invoiceId`,
  //   component: React.lazy(() =>
  //     import("../../view/SuperAdmin/Dispatch/Domestic/EditDispatch")
  //   ),
  //   authority: [SUPER_ADMIN,ADMIN],
  // },

  {
    key: "invoice.dispatch.edit",
    path: `/dispatch/pattern/edit/:invoiceId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Pattern/EditPattern")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // DISPATCH
  // **************START***************
  {
    key: "invoice.dispatch.list",
    path: `/dispatch-list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/InvoiceList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "invoice.domestic.view",
    path: `/domestic/invoice/view/:invoiceId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Invoice/Dispatch/Domestic")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // TASK
  // **************START***************
  {
    key: "task.list",
    path: `/task/list`,
    component: React.lazy(() => import("../../view/SuperAdmin/Task/TaskTable")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  {
    key: "task.chat",
    path: `/task/chat`,
    component: React.lazy(() => import("../../view/SuperAdmin/Task/Message")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  // TEST
  // **************START***************
  {
    key: "invoice.dispatch.list",
    path: `/test`,
    component: React.lazy(() => import("../../view/SuperAdmin/Test")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  // **************END***************

  {
    key: "master.planner",
    path: `/master/product/planner`,
    component: React.lazy(() => import("../../view/SuperAdmin/ProductPlanner")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  // TEST
  // **************START***************
  {
    key: "workers",
    path: `/workers`,
    component: React.lazy(() => import("../../view/SuperAdmin/worker")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  {
    key: "workers",
    path: `/worker/attendance`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/worker/workerAttendence")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  {
    key: "workersLedger",
    path: `/worker/details`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/worker/workerLedger")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  // **************END***************
  {
    key: "stock",
    path: `/master/stock`,
    component: React.lazy(() => import("../../view/SuperAdmin/stock")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  {
    key: "purchaseOrder.new",
    path: `/purchaseOrder/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/NewPo")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "purchaseOrder.edit",
    path: `/purchaseOrder/edit/:purchaseOrderId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/EditPo")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "purchaseOrder.list",
    path: `/purchaseOrder/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/PoList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "purchaseOrder.list",
    path: `/purchase/order/details/:purchaseId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/PoDetails")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "purchaseOrder.inward",
    path: `/purchase/order/inward/:purchaseOrderId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/Inward")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "purchaseOrder.inward.list",
    path: `/purchaseOrder/inward/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/InwardList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "purchaseOrder.inward.grn",
    path: `/inward/details/:grn`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/GRN")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  //Enquiry
  //*********START********* */
  {
    key: "enquiry.list",
    path: `/enquiry/List`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Sales/Enquiry/EnquiryList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },

  //*********END********* */

  //Quotation
  //*********START********* */
  {
    key: "quotation.list",
    path: `/quotation`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Sales/Quotation/QuotationList")
    ),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  //*********END********* */

  //Machine Breakdown
  //*********START********* */
  {
    key: "machine.list",
    path: `/machine/list`,
    component: React.lazy(() => import("../../view/SuperAdmin/machine")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  {
    key: "machine.breakdown",
    path: `/machine/breakdown`,
    component: React.lazy(() => import("../../view/SuperAdmin/breakdown")),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE],
  },
  //*********END********* */

  //Machine Breakdown
  //*********START********* */

  //*********END********* */
];

export default superAdminRoute;
