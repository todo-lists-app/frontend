import React, {FC} from "react";
import {Box, Checkbox, Heading, Text, Card, Button} from "dracula-ui";
import {TodoItem} from "../../lib/todo";
import styles from "./TodoListItem.module.css";
import {isFeatureImplemented} from "../../app.config";
import ReactMarkdown from "react-markdown";
import DeleteForeverIcon from "mdi-react/DeleteForeverIcon";
import PencilOutlineIcon from "mdi-react/PencilOutlineIcon";
import PackageVariantIcon from "mdi-react/PackageVariantIcon";
import PackageVariantClosedIcon from "mdi-react/PackageVariantClosedIcon";

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

  let archiveTitle = <PackageVariantClosedIcon />;
  if (item.archived) {
    archiveTitle = <PackageVariantIcon />;
  }
  let completedStyle = ''
  if (item.completed) {
    completedStyle = styles.completed
  }

  return (
    <Box p="sm" color={"black"} borderColor={"purple"} rounded={"lg"} key={item.id} className={styles.itemBox} m={"sm"}>
      <Box className={styles.doneButton}>
        {doneCallback ? (
          <Checkbox checked={item.completed} color={"green"} onChange={(e) => {
            doneCallback(item);
          }} />
        ) : (
          <Checkbox checked={item.completed} color={"green"} />
        )}
      </Box>
      <Box className={styles.info}>
        <Box className={styles.content}>
          <Heading size="sm" className={`${styles.title} ${completedStyle}`}>
            <Text m={"md"} weight={"bold"} size={"lg"}>{item.title}</Text>
          </Heading>
          {item.content && (
            <Text className={`${styles.description} ${completedStyle}`}>
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
                <Button className={styles.itemButtons} as={"button"} m={"sm"} onClick={(e) => {
                  e.preventDefault()
                  if (archiveCallback) {
                    archiveCallback(item)
                  }
                }}>{archiveTitle}</Button>
              )}
              {isFeatureImplemented({featureSet: "todo", featureName: "edit"}) && (
                !item.archived && !item.completed && (
                  <Button className={styles.itemButtons} as={"button"} m={"sm"} onClick={(e) => {
                    e.preventDefault()
                    if (editCallback) {
                      editCallback(item)
                    }
                  }}><PencilOutlineIcon /></Button>
                )
              )}
              {isFeatureImplemented({featureSet: "todo", featureName: "delete"}) && (
                item.archived && (
                  <Button className={styles.itemButtons} as="button" m={"sm"} onClick={(e) => {
                    e.preventDefault()
                    if (deleteCallback) {
                      deleteCallback(item)
                    }
                  }}><DeleteForeverIcon /></Button>
                )
              )}
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
