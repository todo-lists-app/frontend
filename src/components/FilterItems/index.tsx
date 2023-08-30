import React, {FC} from "react";
import {Box, Heading, Radio, Text} from "dracula-ui";

interface FilterItemsProps {
  filterCallback?: (filter: string) => void;
}

export const FilterItems: FC<FilterItemsProps> = ({filterCallback}) => {
  return(
    <>
      <Box m={"sm"}>
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
      </Box>
    </>
  )
}
