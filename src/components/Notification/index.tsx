import React, {FC, useEffect, useRef, useState} from "react";
import BellIcon from "mdi-react/BellIcon";
import {appConfig, isFeatureImplemented} from "../../app.config";
import {useStorePersist} from "../../lib/storage"; // Import the bell icon component
import styles from "./Notification.module.css";
import {Box, Heading, List, Text} from "dracula-ui";

interface Notification {
  id: string;
  title: string;
  message?: string;
  read: boolean;
  priority: string;
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
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setShowBellIcon(false)
    const fetchNotifications = async () => {
      const response = await fetch(appConfig.services.api + "/notifications", {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Subject': Subject,
      }
    });
      const data = await response.json();
      if (data.length > 0) {
        setShowBellIcon(true);
      }
      setNotifications(data);
    };

    //fetchNotifications();

    let dummyData: Notification[] = [
      {
        id: '1',
        title: 'test1',
        message: 'This is a high priority message',
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        title: 'test2',
        message: 'This is a medium priority message',
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        title: 'test3',
        message: 'This is a low priority message',
        read: true,
        priority: 'low'
      }
    ];
    setNotifications(dummyData);
    setShowBellIcon(true);
  }, [Subject]);

  const handleIconClick = () => {
    // setSelectedNotification();
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isFeatureImplemented({featureSet: "notifications", featureName: "alert"}) && showBellIcon && (
        <BellIcon className={styles.showBell} onClick={handleIconClick} />
      )}

      {isFeatureImplemented({featureSet: "notifications", featureName: "modal"}) && showModal && (
        <div ref={modalRef}>
          <Box color="blackSecondary" borderColor="purple" display="block" className={styles.notificationBox}>
            <List className={styles.notificationList}>
              {notifications.map((notification) => (
                <li>
                  <Box>
                    <Heading>{notification.title}</Heading>
                    <Text>{notification.message}</Text>
                  </Box>
                </li>
              ))}
            </List>
          </Box>
        </div>
      )}
    </>
  );
};

export default Notification;
