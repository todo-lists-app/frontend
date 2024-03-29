import React, {FC} from "react";
import {Box, Checkbox, Heading, Text, Card, Button} from "dracula-ui";
import {TodoItem, TodoList} from "../../lib/todo";
import styles from "./TodoListItem.module.css";
import ReactMarkdown from "react-markdown";
import DeleteForeverIcon from "mdi-react/DeleteForeverIcon";
import PencilOutlineIcon from "mdi-react/PencilOutlineIcon";
import PackageVariantIcon from "mdi-react/PackageVariantIcon";
import PackageVariantClosedIcon from "mdi-react/PackageVariantClosedIcon";
import PlusIcon from "mdi-react/PlusIcon";
import {TodoForm} from "../TodoForm";
import remarkGfm from "remark-gfm";
import {Tooltip} from "../Tooltip";
import {HandleArchive, HandleComplete, HandleDelete} from "../../lib/ActionHandlers";
import {useStorePersist} from "../../lib/storage";
import {useAuth} from "react-oidc-context";

interface TodoListItemProps {
  item: TodoItem;
  todos: TodoList;
  todoSetter: React.Dispatch<React.SetStateAction<TodoList>>
}

export const TodoListItem: FC<TodoListItemProps> = ({
                                                      item,
                                                      todos,
                                                      todoSetter}) => {
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
  const {UserSubject, Salt} = useStorePersist();
  const auth = useAuth();
  const accessToken = auth.user?.access_token || "";

  let displayDate = ""
  let displayTime = ""
  if (item.dueDateTime) {
    const dd = new Date(item.dueDateTime);
    displayDate = dd.toLocaleDateString();
    displayTime = dd.toLocaleTimeString();
  }

  return (
    <>
    {editFormOpen && (
      <TodoForm
        todos={todos}
        todoSetter={todoSetter}
        openCallback={setEditFormOpen}
        todoItem={item}
        editMode={true}
      />
    )}
    {subTaskFormOpen && (
      <TodoForm
        openCallback={setSubTaskFormOpen}
        todos={todos}
        todoSetter={todoSetter}
        parentItem={item}
      />
    )}
    <Box p="sm" color={"black"} borderColor={"purple"} rounded={"lg"} key={item.id} className={styles.itemBox} m={"sm"} alt={item.id}>
      <Box className={styles.doneButton}>
        {!item.archived ? (
          <Checkbox checked={item.completed} color={item.completed ? "cyan" : "green"} onChange={(e) => {
            const updateTodos = HandleComplete(item, todos, accessToken, UserSubject, Salt)
            todoSetter(updateTodos)
          }} />
        ) : (
          <Checkbox checked={item.completed} color={"red"} disabled={true} />
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
            {item.dueDateTime && (
              <Card color={"blackSecondary"} rounded={"lg"} p={"xs"} m={"xs"} className={styles.dueDateTag}>
                {item.dueDateTime && (
                  <Text>Due: {displayDate} {displayTime}</Text>
                )}
              </Card>
            )}
            <Card color={priorityColor} rounded={"lg"} p={"xs"} m={"xs"} className={styles.priorityTag}>
              <Text className={styles.priorityLabel} color={"black"}>Priority: {item.priority}</Text>
            </Card>
          </Box>
          <Box className={styles.buttonWrapper}>
            <Card color={"blackSecondary"} rounded={"lg"} p={"xs"} m={"xs"} className={styles.priorityTag}>
              <Tooltip text={archiveTitle}>
                <Button className={styles.itemButtons} as={"button"} m={"sm"} onClick={(e) => {
                  e.preventDefault()
                  let newTodos = HandleArchive(item, todos, accessToken, UserSubject, Salt)
                  todoSetter(newTodos)
                }}>{archiveImage}</Button>
              </Tooltip>
              {!item.archived && !item.completed && (
                <Tooltip text={"Edit"}>
                  <Button className={styles.itemButtons} as={"button"} m={"sm"} onClick={(e) => {
                    e.preventDefault()
                    setEditFormOpen(true)
                  }}><PencilOutlineIcon color={"#80ffea"} /></Button>
                </Tooltip>
              )}
              {item.archived && (
                <Tooltip text={"Delete"}>
                  <Button className={styles.itemButtons} as="button" m={"sm"} onClick={(e) => {
                    e.preventDefault()
                    let newTodos = HandleDelete(item, todos, accessToken, UserSubject, Salt)
                    todoSetter(newTodos)
                  }}><DeleteForeverIcon color={"#ff80bf"} /></Button>
                </Tooltip>
              )}

              {!item.archived && !item.completed && !item.parentId && (
                <Tooltip text={"Add Subtask"}>
                  <Button className={styles.itemButtons} as="button" m={"sm"} onClick={(e) => {
                    e.preventDefault()
                    setSubTaskFormOpen(true)
                  }}><PlusIcon color={"#80ffea"} /></Button>
                </Tooltip>
              )}
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
}
