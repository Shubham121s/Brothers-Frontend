import React from 'react'
import {
  EXECUTIVE,
  SUPER_ADMIN,
  ADMIN,
  SUB_ADMIN
} from '../../constants/roles.constant'

const instrumentRoute = [
  {
    key: 'dashboard',
    path: `/instrument/dashboard`,
    component: React.lazy(() => import('../../view/Instruments/Dashboard')),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE]
  },

  // **************START***************
  {
    key: 'instrument.list',
    path: `/instrument/list`,
    component: React.lazy(() => import('../../view/Instruments/Instrument')),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE]
  },
  {
    key: 'instrument.calibration',
    path: `/instrument/calibration`,
    component: React.lazy(() => import('../../view/Instruments/Calibration')),
    authority: [SUPER_ADMIN, ADMIN, SUB_ADMIN, EXECUTIVE]
  }
  // **************END***************
]

export default instrumentRoute
