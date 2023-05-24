import React, {FC, useState} from "react";
import {Avatar, Box, Button, List} from "dracula-ui";
import {useAuth} from "react-oidc-context";
import gravatarUrl from "gravatar-url";

import styles from "./AccountMenu.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGears, faRightFromBracket, faUserPen} from "@fortawesome/free-solid-svg-icons";

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

  const [isOpen, setIsOpen] = useState(false);
  const avatarClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Box className={styles.accountBox}>
      <Avatar title={given_name} src={picture} onClick={avatarClick} className={`${styles.accountBox} drac-avatar`}/>
      {isOpen && (
        <Box color="blackSecondary" borderColor="purple" display="block" className={styles.accountMenu}>
          <List className={styles.accountMenuList}>
            <li>
              <Button color="purple" size="sm" as="a" href="/profile">
                <FontAwesomeIcon icon={faUserPen} />&nbsp;Profile
              </Button>
              </li>
            <li className={styles.accountItems}>
              <Button color="purple" size="sm" as="a" href="/settings">
                <FontAwesomeIcon icon={faGears} />&nbsp;Settings
              </Button>
            </li>
            <li className={styles.accountItems}>
              <Button color="pink" size="sm" onClick={() => auth.signoutSilent()}>
                <FontAwesomeIcon icon={faRightFromBracket} />&nbsp;Logout
              </Button>
            </li>
          </List>
        </Box>
      )}
    </Box>
  );
}
