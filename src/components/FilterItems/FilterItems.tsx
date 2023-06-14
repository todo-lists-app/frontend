import React, {FC} from "react";
import {Box, Heading, Radio, Select} from "dracula-ui";
import {isFeatureImplemented} from "../../app.config";

export const FilterItems: FC = () => {
  return(
    <>
    {isFeatureImplemented({featureSet: "todo", featureName: "filterBy"}) && (
      <Box m={"sm"}>
        {isFeatureImplemented({featureSet: "todo", featureName: "filterByPriority"}) && (
          <Select name={"priorityFilter"} id={"priorityFilter"} defaultValue={"priorityFilter"} color={"purple"} variant={"outline"}>
            <option value={"priorityFilter"} disabled={true}>Filter By</option>
            <option value={"all"}>All</option>
            <option value={"low"}>Low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
            <option value={"urgent"}>Urgent</option>
          </Select>
        )}
        </Box>
      )}
    </>
  )
}
