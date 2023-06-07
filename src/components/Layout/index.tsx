import React, {FC, ReactElement} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Layout.module.css";
import {NavMenu} from "../NavMenu";
import {Footer} from "../Footer";
import {Box} from "dracula-ui";

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box className={styles.mainArea}>
      <NavMenu />
      <Box className={styles.contentArea}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
