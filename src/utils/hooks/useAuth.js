import { useSelector, useDispatch } from "react-redux";
import appConfig from "../../configs/app.config";
import { REDIRECT_URL_KEY } from "../../constants/app.constant";
import { apiSignInRequest } from "../../services/AuthService";
import {
  onSignInSuccess,
  onSignOutSuccess,
} from "../../store/auth/sessionSlice";
import { initialState, setUser } from "../../store/auth/userSlice";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";
import { apiGetNavigation } from "../../services/AuthService";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  const { token, signedIn } = useSelector((state) => state.auth.session);
  const { entryPath } = useSelector((state) => state.auth.user);

  const signIn = async (values) => {
    try {
      const resp = await apiSignInRequest(values);

      if (resp.data) {
        // const { token } = resp.data;
        const { token: accessToken, refreshToken } = resp.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(onSignInSuccess(accessToken));

        if (resp.data?.data) {
          dispatch(
            setUser({
              ...resp.data.data,
              authority: resp.data.authority,
            })
          );
        } else {
          dispatch(
            setUser({
              avatar: "",
              userName: "Anonymous",
              authority: ["USER"],
              email: "",
            })
          );
        }
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        // console.log(redirectUrl)
        //redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
        // window.location.reload(entryPath)

        // navigate(entryPath)
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("lastActivity");
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    handleSignOut();
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      signOut();
      return;
    }

    try {
      const res = await fetch(
        `${appConfig.apiPrefix}v1/web/company/user/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      const data = await res.json();

      if (res.ok && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(onSignInSuccess(data.accessToken));
      } else {
        signOut();
      }
    } catch (err) {
      signOut();
    }
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signOut,
    refreshAccessToken,
  };
}

export default useAuth;
