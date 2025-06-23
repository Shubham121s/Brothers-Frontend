import React, { Suspense, useMemo } from "react";
import { Loading } from "../components/shared";
import useAuth from "../utils/hooks/useAuth";
import useInactivityLogout from "../utils/hooks/useInactivityLogout";
import { Toast } from "../components/ui";
import Notification from "../components/template/Notification";

const Layout = () => {
  const { authenticated, signOut, refreshAccessToken } = useAuth();

  const { showWarning } = useInactivityLogout(
    authenticated,
    signOut,
    refreshAccessToken
  );

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return React.lazy(() => import("./main"));
    }

    return React.lazy(() => import("./authLayout"));
  }, [authenticated]);

  return (
    <>
      {showWarning &&
        Toast.push(
          <Notification title={"Warning"} type={"warning"} duration={2500}>
            You will be logged out soon due to inactivity.
          </Notification>,
          {
            placement: "top-center",
          }
        )}
      <Suspense
        fallback={
          <div className="flex flex-auto flex-col h-[100vh]">
            <Loading loading={true} />
          </div>
        }
      >
        <AppLayout />
      </Suspense>
    </>
  );
};

export default Layout;
