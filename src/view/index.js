import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import appConfig from '../configs/app.config'
import ProtectedRoute from '../components/route/ProtectedRoute'
import AuthorityGuard from '../components/route/AuthorityGuard'
import AppRoute from '../components/route/AppRoute'
import PublicRoute from '../components/route/PublicRoute'
import { protectedRoutes, publicRoutes } from '../configs/route.configs'
import PageContainer from '../components/template/PageContainer'
import { useSelector, useDispatch } from 'react-redux'
import { Loading } from '../components/shared'
import { apiGetNavigation } from '../services/AuthService'
import { setUserConfigs } from '../store/auth/userSlice'
import { useNavigate } from 'react-router-dom'

const { authenticatedEntryPath } = appConfig
const AllRoutes = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userAuthority = useSelector((state) => state.auth.user.authority)
  const { entryPath, user_id } = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user_id) {
      fetchData()
    }
  }, [])

  const fetchData = async () => {
    const resp = await apiGetNavigation({ user_id: user_id })
    if (resp.data.data) {
      dispatch(
        setUserConfigs({
          navigationConfigs: resp.data.data.navigationRoute,
          entryPath: resp.data.data.entryPath
        })
      )
    } else {
      navigate('/sign-in')
    }
  }

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
              to={`${entryPath}`}
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
