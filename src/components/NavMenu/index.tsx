import React, {FC} from "react";
import {Box, Anchor, Button} from "dracula-ui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "react-oidc-context";

import styles from "./NavMenu.module.css";
import {faClipboardList, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import {AccountMenu} from "../AccountMenu";

export const NavMenu: FC = () => {
  const auth = useAuth();
  const given_name = auth?.user?.profile.given_name;
  const subject = auth?.user?.profile.sub;
  let menuFloor = ""
  if (given_name) {
    menuFloor = styles.navItemsFloor;
  }

  return (
    <Box className={`${styles.topBarContainer} drac-bg-black`}>
      <Anchor href={"/"} className={styles.logo}>
        <FontAwesomeIcon icon={faClipboardList} size="2x" />&nbsp;
        <h1 className="drac-box">Todo-List.app</h1>
      </Anchor>
      <Box className={`${styles.navItems} ${menuFloor}`}>
        <Button color="purple" as="a" href={"/"}>
          <FontAwesomeIcon icon={faHouse} />&nbsp;Home
        </Button>

        {given_name ? (
          <>
            <AccountMenu />
          </>
        ) : (
          <>
            <Button color="purple" as="button" onClick={() => auth.signinRedirect()}>
              <FontAwesomeIcon icon={faUser} />&nbsp;Login
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
