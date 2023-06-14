import React, {FC} from "react";
import styles from './DividerLine.module.css'
import {Col} from "react-bootstrap";

interface DividerLineProps {
  color?: string;
  title?: string;
}

export const DividerLine: FC<DividerLineProps> = ({color, title}) => {
  return (
    <Col md={12}>
      <div className={styles.divider}>
        <div className={styles.dividerLine}></div>
        {title && (
          <div className={styles.dividerTitle}>{title}</div>
        )}
        <div className={styles.dividerLine}></div>
      </div>
    </Col>
  )
}
