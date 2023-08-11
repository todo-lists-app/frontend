import { useEffect } from "react";
import {appConfig} from "../app.config";
import {useAuth} from "react-oidc-context";

const usePushNotifications = (subject: string) => {
  const auth = useAuth();
  const accessToken = auth?.user?.access_token || "";

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register(appConfig.notification.address).then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }

    const subscribeUser = (subject: string) => {
      navigator.serviceWorker.ready.then(function(registration) {
        if (!registration.pushManager) {
          console.log('Push manager unavailable.');
          return;
        }

        registration.pushManager.getSubscription().then(function(existedSubscription) {
          if (existedSubscription === null) {
            console.log('No subscription detected, make a request.');
            registration.pushManager.subscribe({
              applicationServerKey: appConfig.notification.key,
              userVisibleOnly: true,
            }).then(function(newSubscription) {
              if (subject === null || subject === undefined || subject === '') {
                return;
              }
              // Send this subscription to your server to store and use to send push notifications
              fetch(appConfig.services.api + '/notifications/subscribe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-User-Subject': subject,
                  'X-User-Access-Token': accessToken,
                },
                body: JSON.stringify(newSubscription),
              });
            }).catch(function(e) {
              if (Notification.permission !== 'granted') {
                console.info('Permission was not granted.');
              } else {
                console.error('An error ocurred during the subscription process.', e);
              }
            });
          } else {
            registration.update().catch(function(e) {
                console.error('An error ocurred during the update process.', e);
            });
          }
        });
      })
      .catch(function(e) {
        console.error('An error ocurred during Service Worker registration.', e);
      });
    };

    subscribeUser(subject);
  }, [subject, accessToken]);
};

export default usePushNotifications;
