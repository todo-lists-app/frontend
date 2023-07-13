import React, {FC, useEffect, useState} from "react";
import {Box} from "dracula-ui";
import {TodoItem, TodoList} from "../../lib/todo";
import styles from "./TodoListItems.module.css";
import {DividerLine} from "../DividerLine";
import {TodoListItem} from "../TodoListItem";

interface TodoListItemsProps {
  items: TodoItem[];
  todos: TodoList;
  todoSetter: React.Dispatch<React.SetStateAction<TodoList>>
  pagination?: boolean;
}

export const TodoListItems: FC<TodoListItemsProps> = ({
                                                        items,
                                                        todos,
                                                        todoSetter,
                                                        pagination}) => {
  let itemsPerPage = 9999;
  if (pagination) {
    itemsPerPage = 5;
  }

  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(items.length / itemsPerPage);
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsForPage = items.slice(start, end);

  const [visibility, setVisibility] = useState<Record<string, boolean>>(() => {
    const initialVisibility: Record<string, boolean> = {};
    itemsForPage.forEach((item) => {
      initialVisibility[item.id] = true;
    })
    return initialVisibility;
  });
  useEffect(() => {
    let newItemsExist = false;
    const newVisibility: Record<string, boolean> = {...visibility};
    itemsForPage.forEach((item) => {
      if (!newVisibility.hasOwnProperty(item.id)) {
        newVisibility[item.id] = true;
        newItemsExist = true;
      }
    });
    if (newItemsExist) {
      setVisibility(newVisibility);
    }
  }, [currentPage, itemsForPage, visibility]);

  const toggleVisibility = (id: string) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [id]: !prevVisibility[id]
    }))
  }


  return(
    <>
      {itemsForPage.map((item) => {
        return (
          <Box key={item.id}>
            <TodoListItem
              key={item.id}
              item={item}
              todos={todos}
              todoSetter={todoSetter}
            />
            {item.subTasks && item.subTasks.length > 0 && (
              <Box className={styles.subtasks} key={"subtasks" + item.parentId}>
                <DividerLine title={"[" + item.title + "] Sub-Tasks"} key={"subtasks_divider" + item.parentId} hideCallback={() => toggleVisibility(item.id)} initialShow={visibility[item.id]} />
                {visibility[item.id] && item.subTasks.map((subTask) => (
                  <TodoListItem
                    key={subTask.id}
                    item={subTask}
                    todos={todos}
                    todoSetter={todoSetter}
                  />
                ))}
              </Box>
            )}
          </Box>
        )
      })}
      <div className={styles.pagination}>
        {[...Array(pages)].map((_, i) => (
          <div key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? styles.activeDot : styles.dot}></div>
        ))}
      </div>
    </>
  )
}
