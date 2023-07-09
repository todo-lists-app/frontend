import React, {FC, useState, useEffect, Fragment, useMemo} from "react";
import {useAuth} from "react-oidc-context";
import {Box, Heading, Text, Button, Input} from "dracula-ui";

import {AddItemToList, TodoFormData, TodoItem, TodoList, UpdateList, UpdateItemInList} from "../../lib/todo";
import {TodoListItems} from "../../components/TodoListItem";
import {AddItem} from "../../components/AddItem";
import {Col, Row} from "react-bootstrap";
import {DividerLine} from "../../components/DividerLine";
import {SortItems} from "../../components/SortItems";
import {FilterItems} from "../../components/FilterItems";
import styles from "./Todo.module.css";
import {getEncryptedData} from "../../lib/cryption";
import {useStorePersist} from "../../lib/storage";

export const TodoPage: FC = () => {
  const auth = useAuth();
  const {UserSubject, setUserSubject, Salt, setSalt} = useStorePersist();
  const [todos, setTodos] = useState<TodoList>({items: []});
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("updatedDate");

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
  function sortTodos(todos: TodoItem[], sortOrder: string): TodoItem[] {
    let sortedTodos = [...todos];

    switch (sortOrder) {
      case "priority":
        sortedTodos.sort((a, b) =>  prioritySort(b.priority) - prioritySort(a.priority));
        break;
      case "dueDate":
        sortedTodos.sort((a, b) => {
          let aDate = a.dueDate && a.dueDate !== "" ? new Date(a.dueDate) : new Date(a.createdAt);
          let bDate = b.dueDate && b.dueDate !== "" ? new Date(b.dueDate) : new Date(b.createdAt);
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
  }

  useEffect(() => {
    setUserSubject(auth?.user?.profile.sub || "");
    getEncryptedData(UserSubject, Salt, setTodos, setSalt);
  }, [auth, Salt, UserSubject, setSalt, setUserSubject]);

  const handleSaltFormSubmit = () => {
    let saltElem = document.getElementById("salt") as HTMLInputElement;
    if (saltElem) {
      setSalt(saltElem.value);
    }
  };

  const handleSubTaskCallback = (item: TodoItem) => {
    if (!item.parentId) {
      return;
    }

    let todoItem = todos.items.find(i => i.id === item.parentId);
    if (!todoItem) {
      return;
    }

    let subtask : TodoItem = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      title: item.title,
      content: item.content,
      completed: false,
      priority: item.priority,
      createdAt: new Date().toISOString(),
      dueDate: item.dueDate,
      parentId: item.parentId,
    }

    todoItem.subTasks = todoItem.subTasks ? [...todoItem.subTasks, subtask] : [subtask];
    let newTodos = todos.items.map(i => {
      // Map function's scope will now get an 'undefined' safe `todoItem.id`
      if (i.id === todoItem!.id) {
        return todoItem;
      }
      return i;
    }) as TodoItem[];
    setTodos({
      ...todos,
      items: newTodos
    });
    UpdateList(UserSubject, Salt, todos);
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
    filteredItems = sortTodos(filteredItems, sortOrder)
    return filteredItems
  }, [todos.items, priorityFilter, sortOrder])
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
        {!Salt || Salt === '' ? (
          <Box p="lg" borderColor="purple" color={"black"} rounded={"lg"}>
            <Heading size="sm">Enter your list password</Heading>
            <Text>Enter your password to encrypt/decrypt your todo list</Text>
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
                            subtaskCallback={handleSubTaskCallback}
                          />
                        </>
                      )}
                      {completedItems.length > 0 && (
                        <>
                          <DividerLine title={"Completed"} />
                          <TodoListItems
                            items={completedItems}
                            todos={todos}
                            todoSetter={setTodos}
                          />
                        </>
                      )}
                      {archivedItems.length > 0 && (
                        <>
                          <DividerLine title={"Archived"} />
                          <TodoListItems
                            items={archivedItems}
                            todos={todos}
                            todoSetter={setTodos}
                          />
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
