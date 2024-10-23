import { useSelector, useDispatch } from 'react-redux'
import appConfig from '../../configs/app.config'
import { REDIRECT_URL_KEY } from '../../constants/app.constant'
import { apiSignInRequest } from '../../services/AuthService'
import {
  onSignInSuccess,
  onSignOutSuccess
} from '../../store/auth/sessionSlice'
import { initialState, setUser } from '../../store/auth/userSlice'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { apiGetNavigation } from '../../services/AuthService'

function useAuth() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const query = useQuery()

  const { token, signedIn } = useSelector((state) => state.auth.session)
  const { entryPath } = useSelector((state) => state.auth.user)

  const signIn = async (values) => {
    try {
      const resp = await apiSignInRequest(values)

      if (resp.data) {
        const { token } = resp.data
        dispatch(onSignInSuccess(token))
        if (resp.data?.data) {
          dispatch(
            setUser({
              ...resp.data.data,
              authority: resp.data.authority
            })
          )
        } else {
          dispatch(
            setUser({
              avatar: '',
              userName: 'Anonymous',
              authority: ['USER'],
              email: ''
            })
          )
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY)
        // console.log(redirectUrl)
        //redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
        // window.location.reload(entryPath)

        // navigate(entryPath)
        return {
          status: 'success',
          message: ''
        }
      }
    } catch (errors) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString()
      }
    }
  }

  const handleSignOut = () => {
    dispatch(onSignOutSuccess())
    dispatch(setUser(initialState))
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    handleSignOut()
  }

  return {
    authenticated: token && signedIn,
    signIn,
    signOut
  }
}

export default useAuth
