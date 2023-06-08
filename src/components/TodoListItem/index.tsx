import React, {FC} from "react";
import {Box, Badge, Checkbox, Heading, Text, Card, Button} from "dracula-ui";

import {TodoItem} from "../../lib/todo";
import styles from "./TodoListItem.module.css";
import {isFeatureImplemented} from "../../app.config";
import ReactMarkdown from "react-markdown";

interface TodoListItemProps {
  item: TodoItem;
  doneCallback?: () => void;
  editCallback?: () => void;
}

export const TodoListItem: FC<TodoListItemProps> = ({item, doneCallback, editCallback}) => {
  const priorityColor = item.priority === "urgent" ? "red" : item.priority === "high" ? "purple" : item.priority === "medium" ? "orange" : "blackSecondary";
  if (item.priority === null || item.priority === undefined) {
    item.priority = "low";
  }

  return (
    <Box>
      {item.completed ? (
        <Box p="sm" color={"black"} rounded={"lg"} key={item.id} className={styles.itemBox}>
          <Heading size="sm" className={styles.completed}>
            <Checkbox checked={item.completed} onChange={doneCallback} />
            <Text weight={"bold"} size={"md"}>{item.title}</Text>
          </Heading>
          {item.content && (
            <Text className={styles.completed}>{item.content}</Text>
          )}
        </Box>
      ) : (
        <Box p="sm" color={"black"} borderColor={"purple"} rounded={"lg"} key={item.id} className={styles.itemBox}>
          {isFeatureImplemented({featureSet: "todo", featureName: "done"}) && (
            <Box className={styles.doneButton}>
              <Checkbox color={"white"} onChange={doneCallback} />
            </Box>
          )}
          <Box className={styles.info}>
            <Box className={styles.content}>
              <Heading size="sm" className={styles.title}>
                <Text m={"md"} weight={"bold"} size={"lg"}>{item.title}</Text>
              </Heading>
              {item.content && (
                <Text className={styles.description}>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </Text>
              )}
            </Box>
            <Box className={styles.additionalWrapper}>
              <Box className={styles.tagWrapper}>
                {item.dueDate && (
                  <Card color={"blackSecondary"} rounded={"lg"} p={"xs"} m={"xs"} className={styles.dueDateTag}>
                    <Text>Due Date: {item.dueDate}</Text>
                  </Card>
                )}
                <Card color={priorityColor} rounded={"lg"} p={"xs"} m={"xs"} className={styles.priorityTag}>
                  <Text>Priority: {item.priority}</Text>
                </Card>
              </Box>
              <Box className={styles.buttonWrapper}>
                {isFeatureImplemented({featureSet: "todo", featureName: "archive"}) && (
                  <Button m={"sm"}>Archive</Button>
                )}
                {isFeatureImplemented({featureSet: "todo", featureName: "edit"}) && (
                  <Button m={"sm"}>Edit</Button>
                )}
                {isFeatureImplemented({featureSet: "todo", featureName: "delete"}) && (
                  <Button m={"sm"}>Delete</Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <br />
    </Box>
  );
}
