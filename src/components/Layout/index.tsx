import React, {FC, ReactElement} from "react";
import {Box} from "dracula-ui";
import {NavMenu} from "../NavMenu";
import {Footer} from "../Footer";

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box>
      <NavMenu />
      <Box>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
