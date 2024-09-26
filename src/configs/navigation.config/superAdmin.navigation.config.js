import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_COLLAPSE
} from '../../constants/navigation.constant'
import { SUPER_ADMIN, ADMIN, SUB_ADMIN } from '../../constants/roles.constant'

const superAdminNavigationConfig = [
  {
    key: 'pages',
    path: '',
    title: 'PAGES',
    translateKey: 'nav.pages',
    icon: 'pages',
    type: NAV_ITEM_TYPE_TITLE,
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
    subMenu: [
      {
        key: 'dashboard',
        path: `/super/admin/dashboard`,
        title: 'Dashboard',
        translateKey: 'nav.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
        subMenu: []
      },
      {
        key: 'user',
        path: `/super/admin/company/user`,
        title: 'User',
        translateKey: 'nav.user',
        icon: 'user',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: []
      },
      {
        key: 'customer',
        path: '',
        title: 'Customer',
        translateKey: 'nav.customer',
        icon: 'customer',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
        subMenu: [
          {
            key: 'customer.list',
            path: `/super/admin/customer/list`,
            title: 'Customer List',
            translateKey: 'nav.customer.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
            subMenu: []
          },
          {
            key: 'customer.new',
            path: `/super/admin/customer/new`,
            title: 'New Customer',
            translateKey: 'nav.customer.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
            subMenu: []
          }
        ]
      },
      {
        key: 'product',
        path: '',
        title: 'Product',
        translateKey: 'nav.dashboard',
        icon: 'product',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
        subMenu: [
          {
            key: 'product.list',
            path: `/super/admin/product/list`,
            title: 'Product List',
            translateKey: 'nav.product.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
            subMenu: []
          },
          {
            key: 'product.new',
            path: `/super/admin/product/new`,
            title: 'New Product',
            translateKey: 'nav.product.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
            subMenu: []
          },
          {
            key: 'product.setting',
            path: `/super/admin/product/settings`,
            title: 'Settings',
            translateKey: 'nav.product.setting',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
            subMenu: []
          }
        ]
      },
      {
        key: 'stock',
        path: `/super/admin/master/stock`,
        title: 'Stock',
        translateKey: 'nav.stock',
        icon: 'stock',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: []
      },
      {
        key: 'purchase.order',
        path: '',
        title: 'Order Management',
        translateKey: 'nav.purchase.order',
        icon: 'orders',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: [
          {
            key: 'purchase.order.list',
            path: `/super/admin/po/list`,
            title: 'Order List',
            translateKey: 'nav.purchase.order.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'purchase.order.new',
            path: `super/admin/po/new`,
            title: 'New Order',
            translateKey: 'nav.purchase.order.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'purchase.settings',
            path: `super/admin/po/setting`,
            title: 'Settings',
            translateKey: 'nav.purchase.settings',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          }
        ]
      },
      // {
      //     key: 'order',
      //     path: '',
      //     title: 'Order',
      //     translateKey: 'nav.order.order',
      //     icon: 'order',
      //     type: NAV_ITEM_TYPE_COLLAPSE,
      //     authority: [SUPER_ADMIN,ADMIN],
      //     subMenu: [
      //         {
      //             key: 'order.dispatch.list',
      //             path: `/order/dispatch/list`,
      //             title: 'Dispatch List',
      //             translateKey: 'nav.order.list',
      //             type: NAV_ITEM_TYPE_ITEM,
      //             authority: [SUPER_ADMIN,ADMIN],
      //             subMenu: [],
      //         },
      //     ],
      // },
      {
        key: 'invoice',
        path: '',
        title: 'Invoices',
        translateKey: 'nav.invoice',
        icon: 'invoice',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: [
          {
            key: 'foreign.new',
            path: `/super/admin/dispatch/foreign/new`,
            title: 'Foreign Invoice',
            translateKey: 'nav.foreign.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'domestic.new',
            path: `/super/admin/dispatch/domestic/new`,
            title: 'Domestic Invoice',
            translateKey: 'nav.domestic.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'pattern.new',
            path: `/super/admin/dispatch/pattern/new`,
            title: 'Pattern Invoice',
            translateKey: 'nav.pattern.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          // {
          //   key: 'invoice.setting',
          //   path: `/super/admin/dispatch/invoice/setting`,
          //   title: 'Settings',
          //   translateKey: 'nav.foreign.setting',
          //   type: NAV_ITEM_TYPE_ITEM,
          //   authority: [SUPER_ADMIN, ADMIN],
          //   subMenu: []
          // },
          {
            key: 'invoice.list',
            path: `/super/admin/dispatch-list`,
            title: 'Invoice List',
            translateKey: 'nav.invoice.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          }
        ]
      },
      {
        key: 'master.planner',
        path: `/super/admin/master/product/planner`,
        title: 'Master PP',
        translateKey: 'nav.master.planner',
        icon: 'master',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN],
        subMenu: []
      },
      {
        key: 'workers',
        path: `/super/admin/workers`,
        title: 'HR',
        translateKey: 'nav.workers',
        icon: 'worker',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: []
      },
      {
        key: 'purchase.order',
        path: '',
        title: 'Purchase Order',
        translateKey: 'nav.purchase.order',
        icon: 'purchase',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: [
          {
            key: 'purchase.order.list',
            path: `/super/admin/purchaseOrder/list`,
            title: 'PO List',
            translateKey: 'nav.purchase.order.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'purchase.order.new',
            path: `super/admin/purchaseOrder/new`,
            title: 'New PO',
            translateKey: 'nav.purchase.order.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'purchase.order.inward',
            path: `super/admin/purchaseOrder/inward/list`,
            title: 'Inward List',
            translateKey: 'nav.purchase.order.inward',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          }
        ]
      },
      {
        key: 'sales',
        path: '',
        title: 'Sales',
        translateKey: 'nav.sales',
        icon: 'purchase',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: [
          {
            key: 'enquiry.list',
            path: `/super/admin/enquiry/List`,
            title: 'Enquiry List',
            translateKey: 'nav.enquiry.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'enquiry.new',
            path: `/super/admin/enquiry/new`,
            title: 'New Enquiry',
            translateKey: 'nav.enquiry.new',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'quotation.list',
            path: `/super/admin/quotation`,
            title: 'Quotation',
            translateKey: 'nav.quotation.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          }
        ]
      },
      {
        key: 'machines',
        path: '',
        title: 'Machines',
        translateKey: 'nav.sales',
        icon: 'purchase',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: [
          {
            key: 'machine.list',
            path: `/super/admin/machine/List`,
            title: 'Machines',
            translateKey: 'nav.machine.list',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          },
          {
            key: 'machine.breakdown',
            path: `/super/admin/machine/breakdown`,
            title: 'Machine Breakdown',
            translateKey: 'nav.machine.breakdown',

            type: NAV_ITEM_TYPE_ITEM,
            authority: [SUPER_ADMIN, ADMIN],
            subMenu: []
          }
        ]
      },

      {
        key: 'annual.calibration',
        path: `/super/admin/annual/calibration`,
        title: 'Anual Calibration',
        translateKey: 'nav.annual.calibration',
        icon: 'purchase',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [SUPER_ADMIN, ADMIN],
        subMenu: []
      }
    ]
  }
]

export default superAdminNavigationConfig
