import React, {FC} from "react";
import {Box, Heading, Radio, Select} from "dracula-ui";

export const FilterItems: FC = () => {
  return(
    <Box p={"xs"}>
      <Select name={"filter"} id={"filter"} defaultValue={"filterBy"} color={"purple"} variant={"outline"}>
        <option value={"filterBy"} disabled={true}>Filter By</option>
        <option value={"all"}>All</option>
        <option value={"low"}>Low</option>
        <option value={"medium"}>Medium</option>
        <option value={"high"}>High</option>
        <option value={"urgent"}>Urgent</option>
      </Select>
    </Box>
  )
}
