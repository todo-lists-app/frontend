// eslint-disable-next-line
import React, {FC, useEffect, useRef, useState} from "react";
import BellIcon from "mdi-react/BellIcon";
import {appConfig, isFeatureImplemented} from "../../app.config";
import {useStorePersist} from "../../lib/storage"; // Import the bell icon component
import styles from "./Notification.module.css";
import {Box, Heading, List, Text, Divider, backgroundColors} from "dracula-ui";
import {useNavigate} from "react-router-dom";

interface NotificationItem {
  id: string;
  title: string;
  read: boolean;
  priority: string;
  priorityColor: keyof typeof backgroundColors;

  message?: string;
};

interface NotificationProps {
  Subject: string;
}

const Notification: FC<NotificationProps> = ({Subject}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showBellIcon, setShowBellIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {UserSubject} = useStorePersist();
  const navigate = useNavigate()

  const modalRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && event.target instanceof Element && !modalRef.current.contains(event.target)) {
          setShowModal(false);
        }
      }
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
  })

  useEffect(() => {
    setShowBellIcon(false)
    const fetchNotifications = async () => {
      const response = await fetch(appConfig.services.api + "/notifications", {
        headers: {
          'Content-Type': 'application/json',
          'X-User-Subject': UserSubject,
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        setShowBellIcon(true);

        for (let i = 0; i < data.length; i++) {
          const notification = data[i];
          switch (notification.priority) {
            case 'high':
              notification.priorityColor = 'purple';
              break;
            case 'medium':
              notification.priorityColor = 'orange';
              break;
            case 'low':
              notification.priorityColor = 'cyan';
              break;
          }
        }
      }

      setNotifications(data);
    };

    fetchNotifications().catch((error) => {
      console.error(error);
    });
  }, [UserSubject]);

  const handleIconClick = () => {
    // setSelectedNotification();
    setShowModal(!showModal);
  };

  const clickItem = (notification: NotificationItem) => {
    setShowModal(false)
    navigate('/task/?open=true&task=' + notification.id)
  }


  return (
    <>
      {isFeatureImplemented({featureSet: "notifications", featureName: "alert"}) && showBellIcon && (
        <BellIcon className={styles.showBell} onClick={handleIconClick} />
      )}

      {isFeatureImplemented({featureSet: "notifications", featureName: "modal"}) && showModal && (
        <div ref={modalRef}>
          <Box color="blackSecondary" borderColor="purple" display="block" className={styles.notificationBox}>
            <List className={styles.notificationList}>
              {notifications.map((notification, index) => (
                <li key={notification.id}>
                  <Box>
                    <Box onClick={() => {
                        clickItem(notification)
                    }} className={styles.notificationLink}>
                      <Box className={styles.NotificationTitleBox}>
                        <Heading className={styles.notificationTitle}>{notification.title}</Heading>
                        <Box color={notification.priorityColor} className={styles.priority}>
                          {notification.priority}
                        </Box>
                      </Box>
                      <Text>{notification.message}</Text>
                    </Box>
                    {index !== notifications.length - 1 && <Divider color="green" />}
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
