self.addEventListener('push', function(e) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const data = e.data?.json() ?? {};
  const title = data.title ?? 'test notification';
  const message = data.message ?? 'test message';
  const icon = data.icon ?? 'https://beta.todo-list.app/icon512.png';
  const actions = data.actions ?? [];
  const eventData = data.data ?? {};

  e.waitUntil(
    self.registration.showNotification(title, {
      body: message,
      icon: icon,
      actions: actions,
      data: eventData
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();

  let url = new URL(self.location.href)
  let development = url.searchParams.get("development")
  let testAgainstAddress = "https://beta.todo-list.app/"
  if (development) {
    testAgainstAddress = "http://localhost:3000/"
  }

  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      let windowExists = false;

      const hadWindowToFocus = clientList.some((client) => {
        if (client.url === testAgainstAddress && 'focus' in client) {
          windowExists = true;

          if (e.action === '' || e.action === undefined || e.action === 'open') {
            if (e.notification.data) {
              client.navigate('/task/?open=true&task=' + e.notification.data);
              return
            }
          }
          if (e.action === 'complete') {
            client.navigate('/task/?complete=true&task=' + e.notification.data);
            return
          }
        }
        client.focus();
        return true;
      })

      if (!hadWindowToFocus && !windowExists) {
        self.clients.openWindow(testAgainstAddress)
          .then((client) => (client ? client.focus() : null));
      }
    })
  )
});
