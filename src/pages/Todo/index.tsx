import React, {FC, useState, useEffect, Fragment, useMemo} from "react";
import {useAuth} from "react-oidc-context";
import {Box, Heading, Text, Button, Input} from "dracula-ui";

import {
  decryptData,
  base64ToArrayBuffer,
  base64ToUint8Array
} from "../../lib/cryption";
import {AddItemToList, TodoFormData, TodoItem, TodoList, UpdateList} from "../../lib/todo";
import {appConfig} from "../../app.config";
import {TodoListItems} from "../../components/TodoListItem";
import {AddItem} from "../../components/AddItem";
import {Col, Row} from "react-bootstrap";
import {DividerLine} from "../../components/DividerLine/DividerLine";
import {SortItems} from "../../components/SortItems/SortItems";
import {FilterItems} from "../../components/FilterItems/FilterItems";
import styles from "./Todo.module.css";

export const TodoPage: FC = () => {
  const auth = useAuth();
  const [salt, setSalt] = useState<string | null>(localStorage.getItem('salt') || null);
  const [todos, setTodos] = useState<TodoList>({items: []});
  const [userSubject, setUserSubject] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  useEffect(() => {
    if (auth?.user?.profile) {
      let subject = auth?.user?.profile.sub || "";

      if (subject !== undefined && subject !== "" && salt) {
        setUserSubject(subject);
        fetch(appConfig.apiURL + `/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Subject': subject,
          }
        }).then(res => res.json())
          .then(data => {
            if (data.data === "" || data.data === undefined) {
              return;
            }
            if (salt) {
              // console.log("decrypting data", data);
              decryptData(subject, salt, base64ToArrayBuffer(data.data), base64ToUint8Array(data.iv)).then((decryptedData) => {
                setTodos(decryptedData)
              }).catch(err => {
                if (err instanceof DOMException) {
                  if (err.message.includes('operation-specific reason')) {
                    setSalt(null)
                    localStorage.removeItem('salt')
                  }
                } else {
                  console.log("decrypt error", err)
                }
              })
            }
          })
          .catch(err => console.log("fetch list error", err));
        }
    }
  }, [auth?.user?.profile, salt]);

  const handleSaltFormSubmit = () => {
    let saltElem = document.getElementById("salt") as HTMLInputElement;
    if (saltElem) {
      setSalt(saltElem.value);
      localStorage.setItem("salt", saltElem.value);
    }
  };

  const handleAddItem = (formData: TodoFormData, subject: string, salt: string) => {
    AddItemToList(formData, subject, salt, todos, setTodos);
  }

  const handleCompleteItem = (item: TodoItem) => {
    if (salt) {
      item.completed = !item.completed
      setTodos({...todos, items: todos.items.map(i => i.id === item.id ? item : i)})
      UpdateList(userSubject, salt, todos)
    }
  }

  const handleArchiveCallback = (item: TodoItem) => {
    if (salt) {
      item.archived = !item.archived
      setTodos({...todos, items: todos.items.map(i => i.id === item.id ? item : i)})
      UpdateList(userSubject, salt, todos)
    }
  }

  const handleDeleteCallback = (item: TodoItem) => {
    if (salt) {
      const newTodos = todos.items.filter(i => i.id !== item.id)
      setTodos({items: newTodos})
      UpdateList(userSubject, salt, {items: newTodos})
    }
  }

  const handleEditCallback = (item: TodoItem) => {
    console.info("edit", item)
  }

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
    return filteredItems
  }, [todos.items, priorityFilter])
  const archivedItems = useMemo(() => {
    let filteredItems = todos.items.filter(i => i.archived)
    if (priorityFilter !== "all") {
      filteredItems = filteredItems.filter(i => i.priority === priorityFilter)
    }
    return filteredItems
  }, [todos.items, priorityFilter])

  return (
    <>
      <Heading m={"md"}>Todo List</Heading>
      <Box>
        {!salt ? (
          <Box p="lg" borderColor="purple" color={"black"} rounded={"lg"}>
            <Heading size="sm">Enter your list password</Heading>
            <Text>Enter your password to encrypt/decrypt your todo list</Text>
            <Box display="flex">
              <Input type="password" id="salt" variant="outline" borderSize="md" color="purple" m="sm"/>
              <Button onClick={handleSaltFormSubmit} m="sm">Submit</Button>
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
                    </Box>
                  ) : (
                    <>
                      {activeItems.length > 0 && (
                          <>
                          <DividerLine title={"Active"} />
                          <TodoListItems
                            items={activeItems}
                            doneCallback={handleCompleteItem}
                            editCallback={handleEditCallback}
                            archiveCallback={handleArchiveCallback}
                          />
                        </>
                      )}
                      {completedItems.length > 0 && (
                        <>
                          <DividerLine title={"Completed"} />
                          <TodoListItems
                            items={completedItems}
                            doneCallback={handleCompleteItem}
                            editCallback={handleEditCallback}
                            archiveCallback={handleArchiveCallback}
                          />
                        </>
                      )}
                      {archivedItems.length > 0 && (
                        <>
                          <DividerLine title={"Archived"} />
                          <TodoListItems
                            items={archivedItems}
                            doneCallback={handleCompleteItem}
                            editCallback={handleEditCallback}
                            archiveCallback={handleArchiveCallback}
                            deleteCallback={handleDeleteCallback}
                          />
                        </>
                      )}
                    </>
                  )}
                </Fragment>
              </Col>
              <Col md={2} xl={2} sm={1}>
                <Box color="black" borderColor="purple" className={styles.sideBar} rounded={"lg"} p={"sm"}>
                  <AddItem
                    processor={handleAddItem}
                    userSubject={userSubject}
                    userSalt={salt}
                    itemsExist={true}
                  />
                  <SortItems />
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
