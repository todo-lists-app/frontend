// eslint-disable-next-line
import React, { FC, useEffect, useRef } from "react";
import {appConfig} from "../../app.config";
import {useStorePersist} from "../../lib/storage";
import {useAuth} from "react-oidc-context";

const PING_INTERVAL = 300000; // Ping every 5 minutes (300000ms)

const ServicePing: FC = () => {
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const {UserSubject} = useStorePersist();
  const auth = useAuth();
  const accessToken = auth?.user?.access_token || "";

  useEffect(() => {
    // Function to ping the server
    const pingServer = () => {
      fetch(appConfig.services.ping + "/ping", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-User-Subject": UserSubject,
          'X-User-Access-Token': accessToken,
        },
      })
      .catch(error => console.error("Error:", error));
    };

    // Event listener for user interactions
    const userActivity = () => {
      // Ping the server when user interacts with the app
      pingServer();

      // Reset the idle timer
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
      idleTimer.current = setTimeout(pingServer, PING_INTERVAL);
    };

    // Set initial idle timer
    idleTimer.current = setTimeout(pingServer, PING_INTERVAL);

    // Add event listeners for various user interactions
    window.addEventListener("click", userActivity);

    return () => {
      // Cleanup event listeners and timers when component unmounts
      window.removeEventListener("click", userActivity);
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, [UserSubject]);

  return null;
}

export default ServicePing;
