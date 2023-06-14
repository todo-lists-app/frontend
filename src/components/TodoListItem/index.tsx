import React, {FC} from "react";
import {Box, Badge, Checkbox, Heading, Text, Card, Button} from "dracula-ui";

import {TodoItem} from "../../lib/todo";
import styles from "./TodoListItem.module.css";
import {isFeatureImplemented} from "../../app.config";
import ReactMarkdown from "react-markdown";

interface TodoListItemProps {
  item: TodoItem;
  doneCallback?: (item: TodoItem) => void;
  editCallback?: (item: TodoItem) => void;
  deleteCallback?: (item: TodoItem) => void;
  archiveCallback?: (item: TodoItem) => void;
}
interface TodoListItemsProps {
  items: TodoItem[];
  doneCallback?: (item: TodoItem) => void;
  editCallback?: (item: TodoItem) => void;
  deleteCallback?: (item: TodoItem) => void;
  archiveCallback?: (item: TodoItem) => void;
}

export const TodoListItems: FC<TodoListItemsProps> = ({
                                                        items,
                                                        doneCallback,
                                                        editCallback,
                                                        deleteCallback,
                                                        archiveCallback
}) => {
  return(
    <>
      {items.map((item) => (
        <TodoListItem
          key={item.id}
          item={item}
          doneCallback={doneCallback}
          editCallback={editCallback}
          deleteCallback={deleteCallback}
          archiveCallback={archiveCallback}
        />
      ))}
    </>
  )
}

export const TodoListItem: FC<TodoListItemProps> = ({
                                                      item,
                                                      doneCallback,
                                                      editCallback,
                                                      deleteCallback,
                                                      archiveCallback
}) => {
  const priorityColor = item.priority === "urgent" ? "red" : item.priority === "high" ? "purple" : item.priority === "medium" ? "orange" : "blackSecondary";
  if (item.priority === null || item.priority === undefined) {
    item.priority = "low";
  }

  return (
    <Box>
      {item.completed ? (
        <Box p="sm" color={"black"} rounded={"lg"} key={item.id} className={styles.itemBox}>
          <Heading size="sm" className={styles.completed}>
            {doneCallback && (
              <Checkbox checked={true} onChange={(e) => {
                e.preventDefault()
                doneCallback(item)
              }} />
            )}
            <Text weight={"bold"} size={"md"}>{item.title}</Text>
          </Heading>
          {item.content && (
            <Text className={styles.completed}>{item.content}</Text>
          )}
        </Box>
      ) : (
        <Box p="sm" color={"black"} borderColor={"purple"} rounded={"lg"} key={item.id} className={styles.itemBox}>
          {isFeatureImplemented({featureSet: "todo", featureName: "complete"}) && (
            <Box className={styles.doneButton}>
              {doneCallback && (
                <Checkbox onChange={(e) => {
                  e.preventDefault()
                  doneCallback(item)
                }} color={"white"} />
              )}
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
                <Card color={"blackSecondary"} rounded={"lg"} p={"xs"} m={"xs"} className={styles.priorityTag}>
                  {isFeatureImplemented({featureSet: "todo", featureName: "archive"}) && (
                    <Button as={"button"} m={"sm"} onClick={(e) => {
                      e.preventDefault()
                      if (archiveCallback) {
                        archiveCallback(item)
                      }
                    }}>Archive</Button>
                  )}
                  {isFeatureImplemented({featureSet: "todo", featureName: "edit"}) && (
                    !item.archived && (
                      <Button as={"button"} m={"sm"} onClick={(e) => {
                        e.preventDefault()
                        if (editCallback) {
                          editCallback(item)
                        }
                      }}>Edit</Button>
                    )
                  )}
                  {isFeatureImplemented({featureSet: "todo", featureName: "delete"}) && (
                    item.archived && (
                      <Button m={"sm"} as={"button"} onClick={(e) => {
                        e.preventDefault()
                        if (deleteCallback) {
                          deleteCallback(item)
                        }
                      }}>Delete</Button>
                    )
                  )}
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <br />
    </Box>
  );
}
