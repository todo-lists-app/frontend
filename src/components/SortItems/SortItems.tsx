import React, {FC} from "react";
import {Box, Divider, Heading, Text, Radio} from "dracula-ui";
import {isFeatureImplemented} from "../../app.config";
import styles from "./SortItems.module.css";

interface SortItemsProps {
  sortCallback?: (sort: string) => void;
}

export const SortItems: FC<SortItemsProps> = ({sortCallback}) => {
  return(
    <>
      {isFeatureImplemented({featureSet: "todo", featureName: "sortBy"}) && (
        <Box>
          <Divider color={"orange"} />
          <Heading size={"xl"} p={"xs"} m={"lg"} className={styles.sortByTitle}>
            <Text color={"white"}>Sort By</Text>
          </Heading>
          <Box className={styles.sortBy}>
            {isFeatureImplemented({featureSet: "todo", featureName: "sortByCreationDate"}) && (
              <Box className={styles.sortByBox}>
                <Radio color={"green"} name={"sortBy"} value={"creationDate"} onChange={(e) => {
                  if (sortCallback) {
                    sortCallback(e.target.value)
                  }
                }} defaultChecked={true} />
                <Text m={"sm"} size="sm" color={"white"}>Creation Date</Text>
              </Box>
            )}
            {isFeatureImplemented({featureSet: "todo", featureName: "sortByUpdatedDate"}) && (
              <Box>
                <Radio color={"green"} name={"sortBy"} value={"updatedDate"} onChange={(e) => {
                  if (sortCallback) {
                    sortCallback(e.target.value)
                  }
                }} />
                <Text m={"sm"} size="sm" color={"white"}>Updated Date</Text>
              </Box>
            )}
            {isFeatureImplemented({featureSet: "todo", featureName: "sortByPriority"}) && (
              <Box>
                <Radio color={"green"} name={"sortBy"} value={"priority"} onChange={(e) => {
                  if (sortCallback) {
                    sortCallback(e.target.value)
                  }
                }} />
                <Text m={"sm"} size="sm" color={"white"}>Priority</Text>
              </Box>
            )}
            {isFeatureImplemented({featureSet: "todo", featureName: "sortByDueDate"}) && (
              <Box>
                <Radio color={"green"} name={"sortBy"} value={"dueDate"} onChange={(e) => {
                  if (sortCallback) {
                    sortCallback(e.target.value)
                  }
                }} />
                <Text m={"sm"} size="sm" color={"white"}>Due Date</Text>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}
