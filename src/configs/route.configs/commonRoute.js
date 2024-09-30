import React from 'react'
import { ADMIN, EXECUTIVE, SUPER_ADMIN } from '../../constants/roles.constant'

const commonRoute = [
  // COMMON ROUTES

  // ACCESS DENIED
  // **************START***************
  {
    key: 'access-denied',
    path: `/access-denied`,
    component: React.lazy(() => import('../../view/AccessDenied')),
    authority: [SUPER_ADMIN, EXECUTIVE, ADMIN]
  }
  // **************END***************
]

export default commonRoute
