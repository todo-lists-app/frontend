import React, {Anchor, Box, Heading, List} from "dracula-ui";
import {FC} from "react";

import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <Box className={`${styles.footerContainer} drac-bg-black`}>
      <Box>
        <Heading size="md">Company</Heading>
        <List>
          <li><Anchor href="/company/about">About</Anchor></li>
          <li><Anchor href="/company/contact">Contact</Anchor></li>
          <li><Anchor href="/company/careers">Careers</Anchor></li>
        </List>
      </Box>
      <Box>
        <Heading size="md">Policies</Heading>
        <List>
          <li><Anchor href="/policy/privacy">Privacy</Anchor></li>
          <li><Anchor href="/policy/security">Security</Anchor></li>
          <li><Anchor href="/policy/terms">Terms</Anchor></li>
        </List>
      </Box>
      <Box>
        <Heading size="md">Resources</Heading>
        <List>
          <li><Anchor href="/apps">Apps</Anchor></li>
          <li><Anchor href="https://uptime.chewedfeed.com/status/todo-list">Status</Anchor></li>
        </List>
      </Box>
    </Box>
  );
};
