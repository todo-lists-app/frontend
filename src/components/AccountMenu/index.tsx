import React, {FC, useEffect, useRef, useState} from "react";
import {Avatar, Box, Button, List} from "dracula-ui";
import {useAuth} from "react-oidc-context";
import gravatarUrl from "gravatar-url";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGears, faRightFromBracket, faUserPen} from "@fortawesome/free-solid-svg-icons";

import styles from "./AccountMenu.module.css";
import {isFeatureImplemented} from "../../app.config";
import {useStorePersist} from "../../lib/storage";

export const AccountMenu: FC = () => {
  const auth = useAuth();
  const given_name = auth?.user?.profile.given_name || "";
  let picture = auth?.user?.profile.picture || "";
  if (picture === "") {
    const email = auth?.user?.profile.email || "";
    if (email !== "") {
      picture = gravatarUrl(email, {size: 200});
    }
  }

  const [showModal, setShowModal] = useState(false);
  const {setSalt} = useStorePersist();
  const avatarClick = () => {
    setShowModal(!showModal);
  }
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && event.target instanceof Element && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [modalRef]);

  return (
    <Box className={styles.accountBox}>
      <Avatar title={given_name} src={picture} onClick={avatarClick} className={`${styles.accountBox} drac-avatar`}/>
      {showModal && (
        <div ref={modalRef}>
          <Box color="blackSecondary" borderColor="purple" display="block" className={styles.accountMenu}>
            <List className={styles.accountMenuList}>
              {isFeatureImplemented({featureSet: "account", featureName: "update"}) && (
                <li>
                  <Button color="purple" size="sm" as="a" href="/profile">
                    <FontAwesomeIcon icon={faUserPen} />&nbsp;Profile
                  </Button>
                </li>
              )}
              {isFeatureImplemented({featureSet: "notifications", featureName: "update"}) && (
                <li className={styles.accountItems}>
                  <Button color="purple" size="sm" as="a" href="/settings">
                    <FontAwesomeIcon icon={faGears} />&nbsp;Notfications
                  </Button>
                </li>
              )}
              <li className={styles.accountItems}>
                <Button color="pink" size="sm" onClick={() => {
                  setSalt("");
                  auth.signoutSilent()
                }}>
                  <FontAwesomeIcon icon={faRightFromBracket} />&nbsp;Logout
                </Button>
              </li>
            </List>
          </Box>
        </div>
      )}
    </Box>
  );
}
