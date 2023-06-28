import React, { FC, useEffect, useRef } from "react";
import {appConfig} from "../../app.config";
import {useStorePersist} from "../../lib/storage";

const PING_INTERVAL = 300000; // Ping every 5 minutes (300000ms)

interface PingProps {
  Subject: string;
}

const ServicePing: FC<PingProps> = ({Subject: string}) => {
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const {UserSubject} = useStorePersist();

  useEffect(() => {
    // Function to ping the server
    const pingServer = () => {
      fetch(appConfig.services.ping + "/ping", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-User-Subject": UserSubject,
        },
      })
      .then(response => response.json())
      .then(data => console.log(data))
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
  }, []);

  return null;
}

export default ServicePing;
