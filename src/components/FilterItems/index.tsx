import React, {FC} from "react";
import {Box, Divider, Heading, Radio, Text} from "dracula-ui";
import {isFeatureImplemented} from "../../app.config";

interface FilterItemsProps {
  filterCallback?: (filter: string) => void;
}

export const FilterItems: FC<FilterItemsProps> = ({filterCallback}) => {
  return(
    <>
      {isFeatureImplemented({featureSet: "todo", featureName: "filterBy"}) && (
        <Box m={"sm"}>
          <Divider color={"orange"} />
          {isFeatureImplemented({featureSet: "todo", featureName: "filterByPriority"}) && (
            <>
              <Heading size={"xl"} p={"xs"}>
                <Text m={"sm"} color={"white"}>Priority</Text>
              </Heading>
              <Box>
                <Radio color={"green"} name={"priorityFilter"} value={"all"} defaultChecked={true} onChange={(e) => {
                  if (filterCallback) {
                    filterCallback(e.target.value);
                  }
                }} />
                <Text m={"sm"} color={"white"}>All</Text>
              </Box>
              <Box>
                <Radio color={"red"} name={"priorityFilter"} value={"urgent"} onChange={(e) => {
                  if (filterCallback) {
                    filterCallback(e.target.value);
                  }
                }} />
                <Text m={"sm"} color={"white"}>Urgent</Text>
              </Box>
              <Box>
                <Radio color={"purple"} name={"priorityFilter"} value={"high"} onChange={(e) => {
                  if (filterCallback) {
                    filterCallback(e.target.value);
                  }
                }} />
                <Text m={"sm"} color={"white"}>High</Text>
              </Box>
              <Box>
                <Radio color={"orange"} name={"priorityFilter"} value={"medium"} onChange={(e) => {
                  if (filterCallback) {
                    filterCallback(e.target.value);
                  }
                }} />
                <Text m={"sm"} color={"white"}>Medium</Text>
              </Box>
              <Box>
                <Radio color={"white"} name={"priorityFilter"} value={"low"} onChange={(e) => {
                  if (filterCallback) {
                    filterCallback(e.target.value);
                  }
                }} />
                <Text m={"sm"} color={"white"}>Low</Text>
              </Box>
            </>
          )}
          </Box>
        )}
    </>
  )
}
