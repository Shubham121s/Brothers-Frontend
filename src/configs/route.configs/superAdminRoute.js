import React from "react";
import { EXECUTIVE, SUPER_ADMIN } from "../../constants/roles.constant";

const superAdminRoute = [
  {
    key: "dashboard",
    path: `/super/admin/dashboard`,
    component: React.lazy(() => import("../../view/SuperAdmin/Dashboard")),
    authority: [SUPER_ADMIN],
  },
  // SUPER ADMIN

  // USER
  // **************START***************
  {
    key: "user.list",
    path: `/super/admin/company/user`,
    component: React.lazy(() => import("../../view/SuperAdmin/User")),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // CUSTOMER
  // **************START***************
  {
    key: "customer.new",
    path: `/super/admin/customer/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/NewCustomer")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "customer.list",
    path: `/super/admin/customer/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/CustomerList")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "customer.details",
    path: `/super/admin/customer-details/:customerId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/CustomerDetails")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "customer.edit",
    path: `/super/admin/customer/edit/:customerId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Customer/EditCustomer")
    ),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // PO
  // **************START*************
  {
    key: "po.new",
    path: `/super/admin/po/new`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/NewPo")),
    authority: [SUPER_ADMIN],
  },
  {
    key: "po.new",
    path: `/super/admin/po/list`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/PoList")),
    authority: [SUPER_ADMIN],
  },
  {
    key: "po.new",
    path: `/super/admin/po-details/:poId`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/PoDetails")),
    authority: [SUPER_ADMIN],
  },
  {
    key: "po.edit",
    path: `/super/admin/po-Edit/:poId`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/EditPo")),
    authority: [SUPER_ADMIN],
  },
  {
    key: "po.setting",
    path: `/super/admin/po/setting`,
    component: React.lazy(() => import("../../view/SuperAdmin/Po/PoSetting")),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // PRODUCT
  // **************START***************
  {
    key: "product.settings",
    path: `/super/admin/product/settings`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/ProductSetting")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "product.list",
    path: `/super/admin/product/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/ProductList")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "product.new",
    path: `/super/admin/product/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/NewProduct")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "product.edit",
    path: `/super/admin/product/edit/:productId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/EditProduct")
    ),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // DRAWING
  // **************START***************
  {
    key: "product.drawing.list",
    path: `/super/admin/product/drawing/:productId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Product/Drawing/DrawingList")
    ),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // FOREIGN DISPATCH
  // **************START***************
  {
    key: "invoice.dispatch.new",
    path: `/super/admin/dispatch/foreign/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Foreign/NewDispatch")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "invoice.dispatch.edit",
    path: `/super/admin/dispatch/foreign/edit/:invoiceId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Foreign/EditDispatch")
    ),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // DOMESTIC DISPATCH
  // **************START***************
  {
    key: "invoice.dispatch.new",
    path: `/super/admin/dispatch/domestic/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Domestic/NewDispatch")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "invoice.dispatch.edit",
    path: `/super/admin/dispatch/domestic/edit/:invoiceId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Domestic/EditDispatch")
    ),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // PATTERN DISPATCH
  // **************START***************
  {
    key: "invoice.pattern.new",
    path: `/super/admin/dispatch/pattern/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/Pattern/NewPattern")
    ),
    authority: [SUPER_ADMIN],
  },
  // {
  //   key: "invoice.dispatch.edit",
  //   path: `/super/admin/dispatch/domestic/edit/:invoiceId`,
  //   component: React.lazy(() =>
  //     import("../../view/SuperAdmin/Dispatch/Domestic/EditDispatch")
  //   ),
  //   authority: [SUPER_ADMIN],
  // },
  // **************END***************

  // DISPATCH
  // **************START***************
  {
    key: "invoice.dispatch.list",
    path: `/super/admin/dispatch-list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Dispatch/InvoiceList")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "invoice.domestic.view",
    path: `/super/admin/domestic/invoice/view/:invoiceId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Invoice/Dispatch/Domestic")
    ),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  // TEST
  // **************START***************
  {
    key: "invoice.dispatch.list",
    path: `/test`,
    component: React.lazy(() => import("../../view/SuperAdmin/Test")),
    authority: [SUPER_ADMIN],
  },
  // **************END***************

  {
    key: "master.planner",
    path: `/super/admin/master/product/planner`,
    component: React.lazy(() => import("../../view/SuperAdmin/ProductPlanner")),
    authority: [SUPER_ADMIN],
  },

  // TEST
  // **************START***************
  {
    key: "workers",
    path: `/super/admin/workers`,
    component: React.lazy(() => import("../../view/SuperAdmin/worker")),
    authority: [SUPER_ADMIN],
  },

  {
    key: "workers",
    path: `/super/admin/worker/attendance`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/worker/workerAttendence")
    ),
    authority: [SUPER_ADMIN],
  },

  {
    key: "workersLedger",
    path: `super/admin/worker/details`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/worker/workerLedger")
    ),
    authority: [SUPER_ADMIN],
  },

  // **************END***************
  {
    key: "stock",
    path: `super/admin/master/stock`,
    component: React.lazy(() => import("../../view/SuperAdmin/stock")),
    authority: [SUPER_ADMIN],
  },

  {
    key: "purchaseOrder.new",
    path: `/super/admin/purchaseOrder/new`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/NewPo")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "purchaseOrder.edit",
    path: `/super/admin/purchaseOrder/edit/:purchaseOrderId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/EditPo")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "purchaseOrder.list",
    path: `/super/admin/purchaseOrder/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/PoList")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "purchaseOrder.list",
    path: `/super/admin/purchase/order/details/:purchaseId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/PoDetails")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "purchaseOrder.inward",
    path: `/purchase/order/inward/:purchaseOrderId`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/Inward")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "purchaseOrder.inward.list",
    path: `/super/admin/purchaseOrder/inward/list`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/InwardList")
    ),
    authority: [SUPER_ADMIN],
  },
  {
    key: "purchaseOrder.inward.grn",
    path: `/super/admin/inward/details/:grn`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/PurchaseOrder/GRN")
    ),
    authority: [SUPER_ADMIN],
  },
  //Enquiry
  //*********START********* */
  {
    key: "enquiry.list",
    path: `/super/admin/enquiry/List`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Sales/Enquiry/EnquiryList")
    ),
    authority: [SUPER_ADMIN],
  },

  //*********END********* */

  //Quotation
  //*********START********* */
  {
    key: "quotation.list",
    path: `/super/admin/quotation`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Sales/Quotation/QuotationList")
    ),
    authority: [SUPER_ADMIN],
  },
  //*********END********* */

  //Machine Breakdown
  //*********START********* */
  {
    key: "machine.list",
    path: `/super/admin/machine/list`,
    component: React.lazy(() => import("../../view/SuperAdmin/machine")),
    authority: [SUPER_ADMIN],
  },
  {
    key: "machine.breakdown",
    path: `/super/admin/machine/breakdown`,
    component: React.lazy(() => import("../../view/SuperAdmin/breakdown")),
    authority: [SUPER_ADMIN],
  },
  //*********END********* */

  //Machine Breakdown
  //*********START********* */
  {
    key: "annual.calibration",
    path: `/super/admin/annual/calibration`,
    component: React.lazy(() =>
      import("../../view/SuperAdmin/Annual-calibration-plan")
    ),
    authority: [SUPER_ADMIN],
  },
  //*********END********* */
];

export default superAdminRoute;
