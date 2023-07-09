import React, {FC} from "react";
import {Box, Divider, Heading, Text, Radio} from "dracula-ui";
import styles from "./SortItems.module.css";

interface SortItemsProps {
  sortCallback?: (sort: string) => void;
}

export const SortItems: FC<SortItemsProps> = ({sortCallback}) => {
  return(
    <>
      <Box>
        <Divider color={"orange"} />
        <Heading size={"xl"} p={"xs"} m={"lg"} className={styles.sortByTitle}>
          <Text color={"white"}>Sort By</Text>
        </Heading>
        <Box className={styles.sortBy}>
          <Box>
            <Radio color={"green"} name={"sortBy"} value={"updatedDate"} onChange={(e) => {
              if (sortCallback) {
                sortCallback(e.target.value)
              }
            }} defaultChecked={true} />
            <Text m={"sm"} color={"white"}>Updated Date</Text>
          </Box>
          <Box className={styles.sortByBox}>
            <Radio color={"green"} name={"sortBy"} value={"creationDate"} onChange={(e) => {
              if (sortCallback) {
                sortCallback(e.target.value)
              }
            }} />
            <Text m={"sm"} color={"white"}>Creation Date</Text>
          </Box>
          <Box>
            <Radio color={"green"} name={"sortBy"} value={"priority"} onChange={(e) => {
              if (sortCallback) {
                sortCallback(e.target.value)
              }
            }} />
            <Text m={"sm"} color={"white"}>Priority</Text>
          </Box>
          <Box>
            <Radio color={"green"} name={"sortBy"} value={"dueDate"} onChange={(e) => {
              if (sortCallback) {
                sortCallback(e.target.value)
              }
            }} />
            <Text m={"sm"} color={"white"}>Due Date</Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}
