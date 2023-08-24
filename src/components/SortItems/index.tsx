import React, {FC} from "react";
import {Box, Divider, Heading, Text, Radio, Select} from "dracula-ui";
import styles from "./SortItems.module.css";

interface SortItemsProps {
  sortCallback?: (sort: string) => void;
}

export const SortItems: FC<SortItemsProps> = ({sortCallback}) => {
  return(
    <>
      <Box>
        <Divider color={"orange"} />
        <Box className={styles.sortBy}>
          <Select defaultValue={"default"} onChange={(e) => {
              if (sortCallback) {
                sortCallback(e.target.value)
              }
            }}>
            <option value={"default"} disabled={true}>Sort By</option>
            <option value={"updatedDate"}>Updated Date</option>
            <option value={"creationDate"}>Creation Date</option>
            <option value={"priority"}>Priority</option>
            <option value={"dueDate"}>Due Date</option>
          </Select>
        </Box>
      </Box>
    </>
  )
}
