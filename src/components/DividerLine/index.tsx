import React, {FC} from "react";
import styles from './DividerLine.module.css'
import {Col} from "react-bootstrap";
import ExpandMoreIcon from "mdi-react/ExpandMoreIcon";
import ExpandLessIcon from "mdi-react/ExpandLessIcon";

interface DividerLineProps {
  color?: string;
  title?: string;
  hideCallback?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DividerLine: FC<DividerLineProps> = ({color, title, hideCallback}) => {
  const [show, setShow] = React.useState(true);

  return (
    <Col md={12}>
      <div className={styles.divider}>
        <div className={styles.dividerLine}></div>
        {title && (
          <div className={styles.dividerTitle}>{title}</div>
        )}
        <div className={styles.dividerLine}></div>
        {hideCallback && (
          <div className={styles.hideOption} onClick={() => {
            setShow(!show)
            hideCallback(show)
          }}>
            {show ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
        </div>
        )}
      </div>
    </Col>
  )
}
