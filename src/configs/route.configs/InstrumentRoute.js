import React from 'react'
import {
  EXECUTIVE,
  SUPER_ADMIN,
  ADMIN,
  SUB_ADMIN
} from '../../constants/roles.constant'

const instrumentRoute = [
  //   {
  //     key: 'dashboard',
  //     path: `/super/admin/dashboard`,
  //     component: React.lazy(() => import('../../view/SuperAdmin/Dashboard')),
  //     authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN]
  //   },
  // SUPER ADMIN

  // **************START***************
  {
    key: 'instrument.list',
    path: `/instrument/list`,
    component: React.lazy(() => import('../../view/Instruments/Instrument')),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN]
  },
  {
    key: 'instrument.calibration',
    path: `/instrument/calibration`,
    component: React.lazy(() => import('../../view/Instruments/Calibration')),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN]
  }
  // **************END***************
]

export default instrumentRoute
