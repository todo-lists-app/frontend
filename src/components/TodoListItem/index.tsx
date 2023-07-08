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
import PlusIcon from "mdi-react/PlusIcon";
import {TodoForm} from "../TodoForm";
import remarkGfm from "remark-gfm";
import {Tooltip} from "../Tooltip";

interface TodoListItemProps {
  item: TodoItem;
  doneCallback?: (item: TodoItem) => void;
  editCallback?: (formData: any, todoItem: TodoItem) => void;
  deleteCallback?: (item: TodoItem) => void;
  archiveCallback?: (item: TodoItem) => void;
  subTaskCallback?: (item: TodoItem) => void;
}
interface TodoListItemsProps {
  items: TodoItem[];
  doneCallback?: (item: TodoItem) => void;
  editCallback?: (formData: any, todoItem: TodoItem) => void;
  deleteCallback?: (item: TodoItem) => void;
  archiveCallback?: (item: TodoItem) => void;
  subtaskCallback?: (item: TodoItem) => void;
}

export const TodoListItems: FC<TodoListItemsProps> = ({
                                                        items,
                                                        doneCallback,
                                                        editCallback,
                                                        deleteCallback,
                                                        archiveCallback,
                                                        subtaskCallback
}) => {
  return(
    <>
      {items.map((item) => (
        <Box key={item.id}>
          <TodoListItem
            key={item.id}
            item={item}
            doneCallback={doneCallback}
            editCallback={editCallback}
            deleteCallback={deleteCallback}
            archiveCallback={archiveCallback}
            subTaskCallback={subtaskCallback}
          />
          {item.subTasks && item.subTasks.length > 0 && (
            <Box className={styles.subtasks}>
              {item.subTasks.map((subTask) => (
                <TodoListItem
                  key={subTask.id}
                  item={subTask}
                  doneCallback={doneCallback}
                  editCallback={editCallback}
                  deleteCallback={deleteCallback}
                  archiveCallback={archiveCallback}
                />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </>
  )
}

export const TodoListItem: FC<TodoListItemProps> = ({
                                                      item,
                                                      doneCallback,
                                                      editCallback,
                                                      deleteCallback,
                                                      archiveCallback,
                                                      subTaskCallback
}) => {
  const priorityColor = item.priority === "urgent" ? "red" : item.priority === "high" ? "purple" : item.priority === "medium" ? "orange" : "blackSecondary";
  if (item.priority === null || item.priority === undefined) {
    item.priority = "low";
  }

  let archiveImage = <PackageVariantClosedIcon color={"#9580ff"} />;
  let archiveTitle = "Archive";
  if (item.archived) {
    archiveImage = <PackageVariantIcon color={"#9580ff"} />;
    archiveTitle = "Un-Archive";
  }
  let completedStyle = ''
  if (item.completed) {
    completedStyle = styles.completed
  }

  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const [subTaskFormOpen, setSubTaskFormOpen] = React.useState(false);

  return (
    <>
    {editFormOpen && (
      editCallback && <TodoForm
        editProcessor={editCallback}
        openCallback={setEditFormOpen}
        todoItem={item}
      />
    )}
    {subTaskFormOpen && (
      subTaskCallback && <TodoForm
        addProcessor={subTaskCallback}
        openCallback={setSubTaskFormOpen}
        parentItem={item}
      />
    )}
    <Box p="sm" color={"black"} borderColor={"purple"} rounded={"lg"} key={item.id} className={styles.itemBox} m={"sm"} alt={item.id}>
      <Box className={styles.doneButton}>
        {doneCallback ? (
          <Checkbox checked={item.completed} color={item.completed ? "cyan" : "green"}  onChange={(e) => {
            doneCallback(item);
          }} />
        ) : (
          <Checkbox checked={item.completed} color={"red"} />
        )}
      </Box>
      <Box className={styles.info}>
        <Box className={styles.content}>
          <Heading size="sm" className={`${styles.title} ${completedStyle}`}>
            <Text m={"md"} weight={"bold"} size={"lg"}>{item.title}</Text>
          </Heading>
          {item.content && (
            <Text className={`${styles.description} ${completedStyle}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown>
            </Text>
          )}
        </Box>
        <Box className={styles.additionalWrapper}>
          <Box className={styles.tagWrapper}>
            {item.dueDate && (
              <Card color={"blackSecondary"} rounded={"lg"} p={"xs"} m={"xs"} className={styles.dueDateTag}>
                {item.dueTime ? (
                  <Text>Due: {item.dueDate} {item.dueTime}</Text>
                ) : (
                  <Text>Due Date: {item.dueDate}</Text>
                )}
              </Card>
            )}
            <Card color={priorityColor} rounded={"lg"} p={"xs"} m={"xs"} className={styles.priorityTag}>
              <Text className={styles.priorityLabel}>Priority: {item.priority}</Text>
            </Card>
          </Box>
          <Box className={styles.buttonWrapper}>
            <Card color={"blackSecondary"} rounded={"lg"} p={"xs"} m={"xs"} className={styles.priorityTag}>
              {isFeatureImplemented({featureSet: "todo", featureName: "archive"}) && (
                <Tooltip text={archiveTitle}>
                  <Button className={styles.itemButtons} as={"button"} m={"sm"} onClick={(e) => {
                    e.preventDefault()
                    if (archiveCallback) {
                      archiveCallback(item)
                    }
                  }}>{archiveImage}</Button>
                </Tooltip>
              )}
              {isFeatureImplemented({featureSet: "todo", featureName: "edit"}) && (
                !item.archived && !item.completed && (
                  <Tooltip text={"Edit"}>
                    <Button className={styles.itemButtons} as={"button"} m={"sm"} onClick={(e) => {
                      e.preventDefault()
                      if (editCallback) {
                        setEditFormOpen(true)
                      }
                    }}><PencilOutlineIcon color={"#80ffea"} /></Button>
                  </Tooltip>
                )
              )}
              {isFeatureImplemented({featureSet: "todo", featureName: "delete"}) && (
                item.archived && (
                  <Tooltip text={"Delete"}>
                    <Button className={styles.itemButtons} as="button" m={"sm"} onClick={(e) => {
                      e.preventDefault()
                      if (deleteCallback) {
                        deleteCallback(item)
                      }
                    }}><DeleteForeverIcon color={"#ff80bf"} /></Button>
                  </Tooltip>
                )
              )}

              {isFeatureImplemented({featureSet: "todo", featureName: "subTasks"}) && (
                !item.archived && !item.completed && !item.parentId && (
                  <Tooltip text={"Add Subtask"}>
                    <Button className={styles.itemButtons} as="button" m={"sm"} onClick={(e) => {
                      e.preventDefault()
                      if (subTaskCallback) {
                        setSubTaskFormOpen(true)
                      }
                    }}><PlusIcon color={"#80ffea"} /></Button>
                  </Tooltip>
                )
              )}
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
}
