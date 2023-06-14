import React, {FC} from "react";
import {Select} from "dracula-ui";
import {isFeatureImplemented} from "../../app.config";

export const SortItems: FC = () => {
  return(
    <>
      {isFeatureImplemented({featureSet: "todo", featureName: "sortBy"}) && (
      <Select name={"sort"} id={"sort"} defaultValue={"sortBy"} color={"purple"} variant={"outline"}>
        <option value={"sortBy"} disabled={true}>Sort By</option>
        {isFeatureImplemented({featureSet: "todo", featureName: "sortByCompletedDate"}) && (
          <option value={"completedDate"}>Completed Date</option>
        )}
        {isFeatureImplemented({featureSet: "todo", featureName: "sortByDueDate"}) && (
          <option value={"dueDate"}>Due Date</option>
        )}
        {isFeatureImplemented({featureSet: "todo", featureName: "sortByPriority"}) && (
          <option value={"priority"}>Priority</option>
        )}
      </Select>
      )}
    </>
  )
}
