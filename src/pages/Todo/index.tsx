import React, {FC, useState, useEffect, Fragment, useMemo, useCallback} from "react";
import {useAuth} from "react-oidc-context";
import {Box, Heading, Text, Button, Input} from "dracula-ui";

import {TodoItem, TodoList} from "../../lib/todo";
import {TodoListItems} from "../../components/TodoListItems";
import {AddItem} from "../../components/AddItem";
import {Col, Row} from "react-bootstrap";
import {DividerLine} from "../../components/DividerLine";
import {SortItems} from "../../components/SortItems";
import {FilterItems} from "../../components/FilterItems";
import styles from "./Todo.module.css";
import {getEncryptedListData} from "../../lib/cryption";
import {useStorePersist} from "../../lib/storage";
import {isFeatureImplemented} from "../../app.config";
import {importTodoTxt} from "../../lib/imports/todotxt";

export const TodoPage: FC = () => {
  const auth = useAuth();
  const {UserSubject, setUserSubject, Salt, setSalt} = useStorePersist();
  const [todos, setTodos] = useState<TodoList>({items: []});
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("updatedDate");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [passwordAttempted, setPasswordAttempted] = useState<boolean>(false);

  const [importTodoTxtOpen, setImportTodoTxtOpen] = useState<boolean>(false);

  function prioritySort(priority: string) {
    switch (priority) {
      case "high":
        return 3;
      case "medium":
        return 2;
      case "low":
        return 1;
      default:
        return 4; //urgent
    }
  }

  const sortTodos = useCallback((todos: TodoItem[], sortOrder: string): TodoItem[] => {
    let sortedTodos = [...todos];

    switch (sortOrder) {
      case "priority":
        sortedTodos.sort((a, b) =>  prioritySort(b.priority) - prioritySort(a.priority));
        break;
      case "dueDate":
        sortedTodos.sort((a, b) => {
          let aDate = a.dueDateTime && a.dueDateTime !== "" ? new Date(a.dueDateTime) : new Date(a.createdAt);
          let bDate = b.dueDateTime && b.dueDateTime !== "" ? new Date(b.dueDateTime) : new Date(b.createdAt);
          return bDate.getTime() - aDate.getTime();
        });
        break;
      case "creationDate":
        sortedTodos.sort((a, b) => {
          let aDate = a.createdAt && a.createdAt !== "" ? new Date(a.createdAt) : new Date(a.createdAt);
          let bDate = b.createdAt && b.createdAt !== "" ? new Date(b.createdAt) : new Date(b.createdAt);
          return bDate.getTime() - aDate.getTime();
        });
        break;
      default:
        sortedTodos.sort((a, b) => {
          let aDate = a.updatedAt && a.updatedAt !== "" ? new Date(a.updatedAt) : new Date(a.createdAt);
          let bDate = b.updatedAt && b.updatedAt !== "" ? new Date(b.updatedAt) : new Date(b.createdAt);
          return bDate.getTime() - aDate.getTime();
        });
        break;
    }

    return sortedTodos;
  }, []);

  useEffect(() => {
    setUserSubject(auth?.user?.profile.sub || "");
    let accessToken = auth.user?.access_token || "";
    getEncryptedListData(accessToken, UserSubject, Salt, setTodos, setSalt, setPasswordAttempted);
  }, [auth, Salt, UserSubject, setSalt, setUserSubject, setPasswordAttempted]);

  const handleSaltFormSubmit = () => {
    let saltElem = document.getElementById("salt") as HTMLInputElement;
    if (saltElem) {
      setSalt(saltElem.value);
    }
  };

  const completedItems = useMemo(() => {
    let filteredItems = todos.items.filter(i => i.completed)
    if (filteredItems.length > 0) {
      filteredItems = filteredItems.filter(i => !i.archived)
    }
    if (priorityFilter !== "all") {
      filteredItems = filteredItems.filter(i => i.priority === priorityFilter)
    }
    return filteredItems
  }, [todos.items, priorityFilter])
  const activeItems = useMemo(() => {
    let filteredItems = todos.items.filter(i => !i.completed && !i.archived)
    if (priorityFilter !== "all") {
      filteredItems = filteredItems.filter(i => i.priority === priorityFilter)
    }
    filteredItems = sortTodos(filteredItems, sortOrder)
    return filteredItems
  }, [todos.items, priorityFilter, sortOrder, sortTodos])
  const archivedItems = useMemo(() => {
    let filteredItems = todos.items.filter(i => i.archived)
    if (priorityFilter !== "all") {
      filteredItems = filteredItems.filter(i => i.priority === priorityFilter)
    }
    return filteredItems
  }, [todos.items, priorityFilter])

  return (
    <>
      {importTodoTxtOpen && (
        <Box className={styles.importBox}>
          <Heading>Import Todo.txt</Heading>
          <Box className={styles.importButtons}>
            <Input type={"file"} id={"fileImport"}></Input>
            <Button onClick={() => {
              let accessToken = auth.user?.access_token || "";
              importTodoTxt(accessToken, UserSubject, Salt);
              setImportTodoTxtOpen(false);
            }}>Import</Button>
          </Box>
        </Box>
      )}

      <Heading m={"md"}>Todo List</Heading>
      <Box>
        {!Salt || Salt === '' ? (
          <Box p="lg" borderColor="purple" color={"black"} rounded={"lg"}>
            <Heading size="lg">Enter your list password</Heading>
            {passwordAttempted ? (
              <Text color="red">Incorrect password</Text>
            ) : (
              <>
                <Text>Enter your password to encrypt/decrypt your todo list</Text>
                <br />
                <Text>You need to create a password the first time you create an account</Text>
              </>
            )}
            <Box display="flex">
              <form onSubmit={handleSaltFormSubmit}>
                <Input type="password" id="salt" variant="outline" borderSize="md" color="purple" m="sm"/>
                <Button type="submit" m="sm">Submit</Button>
              </form>
            </Box>
          </Box>
        ) : (
          <Box>
            <Row>
              <Col md={9} xl={10} sm={1}>
                <Fragment>
                  {todos.items.length === 0 ? (
                    <Box>
                      <Text size="sm">No items in list</Text>

                      {isFeatureImplemented({featureSet: "todo", featureName: "import"}) && (
                        <>
                        <DividerLine title={"Import"} />
                        {isFeatureImplemented({featureSet: "export", featureName: "todotxt"}) && (
                          <>
                            <Button onClick={() => setImportTodoTxtOpen(true)}>Import from todo.txt</Button>
                          </>
                        )}
                        </>
                      )}
                    </Box>
                  ) : (
                    <>
                      {activeItems.length > 0 && (
                        <>
                          <DividerLine title={"Active"} />
                          <TodoListItems
                            items={activeItems}
                            todoSetter={setTodos}
                            todos={todos}
                            pagination={true}
                          />
                        </>
                      )}
                      {completedItems.length > 0 && (
                        <>
                          <DividerLine title={"Completed"} hideCallback={setShowCompleted} />
                          {showCompleted && (
                            <TodoListItems
                              items={completedItems}
                              todos={todos}
                              todoSetter={setTodos}
                            />
                          )}
                        </>
                      )}
                      {archivedItems.length > 0 && (
                        <>
                          <DividerLine title={"Archived"} hideCallback={setShowArchived} />
                          {showArchived && (
                            <TodoListItems
                              items={archivedItems}
                              todos={todos}
                              todoSetter={setTodos}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </Fragment>
              </Col>
              <Col md={2} xl={2} sm={1}>
                <Box color="black" borderColor="purple" className={styles.sideBar} rounded={"lg"}>
                  <AddItem
                    todoSetter={setTodos}
                    todos={todos}
                  />
                  <SortItems sortCallback={setSortOrder} />
                  <FilterItems filterCallback={setPriorityFilter} />
                </Box>
              </Col>
            </Row>
          </Box>
        )}
      </Box>
    </>
  );
}
