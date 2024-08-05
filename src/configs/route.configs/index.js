import authRoute from './authRoute'
import commonRoute from './commonRoute'
import superAdminRoute from './superAdminRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...superAdminRoute,
    ...commonRoute
]
