import React, {FC} from "react";
import {Link} from "react-router-dom";
import {Box, Anchor, Button} from "dracula-ui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "react-oidc-context";

import styles from "./NavMenu.module.css";
import {faClipboardList, faHouse} from "@fortawesome/free-solid-svg-icons";
import {AccountMenu} from "./AccountMenu";
import {appConfig} from "../../app.config";

export const NavMenu: FC = () => {
  const auth = useAuth();
  const given_name = auth?.user?.profile.given_name;
  let menuFloor = ""
  if (given_name) {
    menuFloor = styles.navItemsFloor;
  }

  if (auth?.user?.profile) {
    let subject = auth?.user?.profile.email;
    if (subject !== undefined) {
      fetch(appConfig.apiURL + `/account`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Subject': subject,
        }
      }).then(res => res.json())
        .then(data => console.log("return data", data))
        .catch(err => console.log("error", err))
    }
  }

  return (
    <Box className={`${styles.topBarContainer} drac-bg-black`}>
      <Anchor href={"/"} className={styles.logo}>
        <FontAwesomeIcon icon={faClipboardList} size="2x" />&nbsp;
        <h1 className="drac-box">Todo-List.app</h1>
      </Anchor>
      <Box className={`${styles.navItems} ${menuFloor}`}>
        <Button color="purple" variant="outline">
          <Link to={"/"} className={`${styles.item}`}>
            <FontAwesomeIcon icon={faHouse} />&nbsp;Home
          </Link>
        </Button>

        {given_name ? (
          <AccountMenu />
          ) : (
            <>
              <Button color="purple" as="button" onClick={() => auth.signinRedirect()}>Login</Button>
            </>
        )}
      </Box>
    </Box>
  );
}
