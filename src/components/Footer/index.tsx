import React, {Box} from "dracula-ui";
import {FC} from "react";

import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <Box className={`${styles.footerContainer} drac-bg-black`}>
      Footer
    </Box>
  );
};
