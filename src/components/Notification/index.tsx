import React, {FC, useEffect, useState} from "react";
import BellIcon from "mdi-react/BellIcon";
import {appConfig} from "../../app.config";
import {useStorePersist} from "../../lib/storage"; // Import the bell icon component

type Notification = {
  id: string;
  message: string;
  read: boolean;
};

interface NotificationProps {
  Subject: string;
}

const Notification: FC<NotificationProps> = ({Subject}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showBellIcon, setShowBellIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const {UserSubject} = useStorePersist();

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(appConfig.apiURL + "/notifications", {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Subject': Subject,
      }
    });
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, [Subject]);

  useEffect(() => {
    setShowBellIcon(notifications.length > 0 && document.hasFocus());
    const handleVisibilityChange = () => {
      setShowBellIcon(notifications.length > 0 && document.hasFocus());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up event listener when component is unmounted
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [notifications]);

  const handleIconClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showBellIcon && <BellIcon onClick={() => handleIconClick(notifications[0])} />}

      {showModal && selectedNotification && (
        <div className="modal">
          <h2>Notification</h2>
          <p>{selectedNotification.message}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
