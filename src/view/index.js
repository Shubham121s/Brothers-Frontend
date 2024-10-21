import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import appConfig from '../configs/app.config'
import ProtectedRoute from '../components/route/ProtectedRoute'
import AuthorityGuard from '../components/route/AuthorityGuard'
import AppRoute from '../components/route/AppRoute'
import PublicRoute from '../components/route/PublicRoute'
import { protectedRoutes, publicRoutes } from '../configs/route.configs'
import PageContainer from '../components/template/PageContainer'
import { useSelector } from 'react-redux'
import { Loading } from '../components/shared'

const { authenticatedEntryPath } = appConfig
const AllRoutes = (props) => {
  const userAuthority = useSelector((state) => state.auth.user.authority)
  // to={`/${authenticatedEntryPath}`}
  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute />}
      >
        <Route
          path="/"
          element={
            <Navigate
              replace
              to={`${authenticatedEntryPath}`}
            />
          }
        />
        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <AuthorityGuard
                userAuthority={userAuthority}
                authority={route.authority}
              >
                <PageContainer
                  {...props}
                  {...route.meta}
                >
                  <AppRoute
                    routeKey={route.key}
                    component={route.component}
                    {...route.meta}
                  />
                </PageContainer>
              </AuthorityGuard>
            }
          />
        ))}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Route>
      <Route
        path="/"
        element={<PublicRoute />}
      >
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  )
}

const View = (props) => {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <AllRoutes {...props} />
    </Suspense>
  )
}

export default View
