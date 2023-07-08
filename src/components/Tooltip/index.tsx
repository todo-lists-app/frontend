import React, {FC, ReactNode} from "react";
import {Text, Box} from "dracula-ui";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({text, children}) => {
  return (
    <Box className={styles.tooltipContainer}>
      {children}
      <Text className={styles.tooltipText}>{text}</Text>
    </Box>
  );
}
