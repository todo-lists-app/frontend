// NOTE: This relies on the service worker already having been registered in index.tsx

const pushServerPublicKey =  "BIZS8VXZKiWXGjcIAt2EA-2s4aY9w87rRu1cVshjWx7yzl_jrPvhAbL9X3WpdaNa_1fgpUbjk1I6C-OPscEwR5k"

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * checks if Push notification and service workers are supported by your browser
 */
export function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
export async function askUserPermission() {
  return await Notification.requestPermission();
}
/**
 * shows a notification
 */
export function sendNotification(title: string, options: NotificationOptions) {
  navigator.serviceWorker.ready.then(function(serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
}

/**
 *
 * using the registered service worker creates a push notification subscription and returns it
 *
 */
export async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;

  console.log('worker ready');
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(pushServerPublicKey)
  });
}

/**
 * returns the subscription if present or nothing
 */
export function getUserSubscription() {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function(serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function(pushSubscription) {
      return pushSubscription;
    });
}
