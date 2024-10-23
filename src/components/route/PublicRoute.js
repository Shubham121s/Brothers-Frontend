import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import appConfig from '../../configs/app.config'
import useAuth from '../../utils/hooks/useAuth'
import store from '../../store'
const state = store.getState()
const { entryPath } = state.auth.user

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
  const { authenticated } = useAuth()
  // const authenticated=true //todo
  return authenticated ? <Navigate to={entryPath} /> : <Outlet />
}

export default PublicRoute
