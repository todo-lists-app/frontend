import React, {FC, useState, useEffect, Fragment, useMemo} from "react";
import {
  CreateList,
  TodoFormData,
  TodoItem,
  TodoList,
  UpdateItemInList,
  UpdateList
} from "../../lib/todo";
import {useStorePersist} from "../../lib/storage";

// Add Item
export function HandleAdd(formData: TodoFormData, todos: TodoList, UserSubject: string, Salt: string) {
  let newTodo: TodoItem = {
    id: Math.random().toString(36).substring(2, 15),
    title: formData.title,
    content: formData.content,
    dueDate: formData.dueDate,
    dueTime: formData.dueTime,
    priority: formData.priority || "low",
    completed: false,
    createdAt: new Date().toISOString(),
  };
  const addedTodos: {items: TodoItem[]} = {...todos, items: todos.items.concat(newTodo)}

  if (todos.items.length === 0) {
    CreateList(UserSubject, Salt, todos, newTodo);
  } else {
    UpdateList(UserSubject, Salt, addedTodos)
  }

  return addedTodos
}

// Archive
export function HandleArchive(item: TodoItem, todos: TodoList, UserSubject: string, Salt: string) {
  const updatedItem = {...item, archived: !item.archived}
  const updatedTodos = {...todos, items: todos.items.map(i => i.id === item.id ? updatedItem : i) }
  UpdateList(UserSubject, Salt, updatedTodos)

  return updatedTodos
}

// Delete
export function HandleDelete(item: TodoItem, todos: TodoList, UserSubject: string, Salt: string) {
  if (item.parentId) {
    let todoItem = todos.items.find(i => i.id === item.parentId);
    if (!todoItem) {
      return todos;
    }

    todoItem.subTasks = todoItem.subTasks?.filter(i => i.id !== item.id);
    let newTodos = todos.items.map(i => {
      if (i.id === todoItem!.id) {
        return todoItem;
      }
      return i;
    }) as TodoItem[];
    UpdateList(UserSubject, Salt, {items: newTodos})

    return {items: newTodos}
  }

  const newTodos = todos.items.filter(i => i.id !== item.id)
  UpdateList(UserSubject, Salt, {items: newTodos})

  return {items: newTodos};
}

// Edit
export function HandleEdit(formData: TodoFormData, item: TodoItem, UserSubject: string, Salt: string, todos: TodoList, todoSetter: React.Dispatch<React.SetStateAction<TodoList>>) {
  if (!Salt && !UserSubject) {
    return null
  }

  UpdateItemInList(formData, UserSubject, Salt, item, todos, todoSetter);
}

// SubTask
interface SubTaskProps {
  formData: TodoFormData;
  item: TodoItem;
  todos: TodoList;
  todoSetter: React.Dispatch<React.SetStateAction<TodoList>>
}
export const HandleSubTask: FC<SubTaskProps> = ({formData, item, todos, todoSetter}) => {
  const {UserSubject, Salt} = useStorePersist();

  if (!Salt && !UserSubject) {
    return null
  }

  let todoItem = todos.items.find(i => i.id === item.parentId);
  if (!todoItem) {
    return null;
  }

  const subTask: TodoItem = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    title: formData.title,
    content: formData.content,
    archived: false,
    parentId: item.parentId,
    completed: false,
    priority: formData.priority ? formData.priority : todoItem.priority,
    createdAt: new Date().toISOString(),
    dueDate: formData.dueDate,
  }
  todoItem.subTasks = todoItem.subTasks ? [...todoItem.subTasks, subTask] : [subTask];
  let newTodos = todos.items.map(i => {
    if (i.id === todoItem!.id) {
      return todoItem;
    }
    return i;
  }) as TodoItem[];
  todoSetter({items: newTodos})
  UpdateList(UserSubject, Salt, {items: newTodos})

  return null
}

// Complete
export function HandleComplete(item: TodoItem, todos: TodoList, UserSubject: string, Salt: string) {
  const updatedItem = {...item, completed: !item.completed}
  const updatedTodos = {...todos, items: todos.items.map(i => i.id === item.id ? updatedItem : i) }
  UpdateList(UserSubject, Salt, todos)

  return updatedTodos
}

