import { useEffect, useState } from "react";

const useInactivityLogout = (authenticated, logoutCallback, refreshTokenFn) => {
  const threshold = 20 * 60 * 1000; // 20 minutes
  const checkInterval = 60 * 1000; // 1 minute
  const warningThreshold = 1 * 60 * 1000; // 1 minute before logout

  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!authenticated) return;

    const updateLastActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
      setShowWarning(false); // Hide warning when user becomes active
    };

    const checkInactivity = async () => {
      const lastStr = localStorage.getItem("lastActivity");
      const last = lastStr ? parseInt(lastStr, 10) : null;

      if (!last || isNaN(last)) {
        logoutCallback();
        return;
      }

      const now = Date.now();
      const inactiveTime = now - last;

      if (inactiveTime >= threshold) {
        logoutCallback();
      } else {
        // Show warning if close to threshold
        if (threshold - inactiveTime <= warningThreshold) {
          setShowWarning(true);
        }
        await refreshTokenFn();
      }
    };

    const interval = setInterval(checkInactivity, checkInterval);

    document.addEventListener("mousemove", updateLastActivity);
    document.addEventListener("keydown", updateLastActivity);

    updateLastActivity();

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", updateLastActivity);
      document.removeEventListener("keydown", updateLastActivity);
    };
  }, [authenticated, logoutCallback, refreshTokenFn]);

  return {
    showWarning,
  };
};

export default useInactivityLogout;
