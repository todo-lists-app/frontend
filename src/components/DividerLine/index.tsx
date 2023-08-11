import React, {FC} from "react";
import styles from './DividerLine.module.css'
import {Col} from "react-bootstrap";
import ExpandMoreIcon from "mdi-react/ExpandMoreIcon";
import ExpandLessIcon from "mdi-react/ExpandLessIcon";

interface DividerLineProps {
  color?: string;
  title?: string;
  hideCallback?: React.Dispatch<React.SetStateAction<boolean>>;
  initialShow?: boolean;
}

export const DividerLine: FC<DividerLineProps> = ({
                                                    color,
                                                    title,
                                                    hideCallback,
                                                    initialShow}) => {
  const [show, setShow] = React.useState(initialShow);

  const styleColor = color ? { backgroundColor: color } : {};

  return (
    <Col md={12}>
      <div className={styles.divider}>
        <div className={styles.dividerLine} style={styleColor}></div>
        {title && (
          <div className={styles.dividerTitle}>{title}</div>
        )}
        <div className={styles.dividerLine} style={styleColor}></div>
        {hideCallback && (
          <div className={styles.hideOption} onClick={() => {
            setShow(!show)
            hideCallback(!show)
          }}>
            {show ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </div>
        )}
      </div>
    </Col>
  )
}
