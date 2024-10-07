import authRoute from './authRoute'
import commonRoute from './commonRoute'
import superAdminRoute from './superAdminRoute'
import instrumentRoute from './InstrumentRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
  ...superAdminRoute,
  ...commonRoute,
  ...instrumentRoute
]
