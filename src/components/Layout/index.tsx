import React, {FC, ReactElement} from "react";
import {Box} from "dracula-ui";

import styles from "./Layout.module.css";
import {NavMenu} from "../NavMenu";
import {Footer} from "../Footer";

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box className={styles.mainArea}>
      <NavMenu />
      <Box scrollbar={true} className={styles.contentArea}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
