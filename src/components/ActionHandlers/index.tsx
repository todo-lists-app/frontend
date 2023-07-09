import React, {FC, useState, useEffect, Fragment, useMemo} from "react";
import {useAuth} from "react-oidc-context";
import {AddItemToList, TodoFormData, TodoItem, TodoList, UpdateItemInList, UpdateList} from "../../lib/todo";
import {useStorePersist} from "../../lib/storage";

// Add Item
interface AddItemProps {
  formData: TodoFormData;
  todos: TodoList;
  todoSetter: React.Dispatch<React.SetStateAction<TodoList>>
}
export const HandleAddItem: FC<AddItemProps> = ({formData, todos, todoSetter}) => {
  const {UserSubject, Salt} = useStorePersist();

  if (Salt && UserSubject) {
    AddItemToList(formData, UserSubject, Salt, todos, todoSetter);
  }

  return null;
}

// Archive
interface ArchiveProps {
  item: TodoItem;
  todos: TodoList;
  todoSetter: React.Dispatch<React.SetStateAction<TodoList>>
}
export const HandleArchive: FC<ArchiveProps> = ({item, todos, todoSetter}) => {
  const {UserSubject, Salt} = useStorePersist();

  if (Salt && UserSubject) {
    item.archived = !item.archived
    todoSetter({...todos, items: todos.items.map(i => i.id === item.id ? item : i)})
    UpdateList(UserSubject, Salt, todos)
  }

  return null;
}

// Delete
interface DeleteProps {
  item: TodoItem;
  todos: TodoList;
  todoSetter: React.Dispatch<React.SetStateAction<TodoList>>
}
export const HandleDelete: FC<DeleteProps> = ({item, todos, todoSetter}) => {
  const {UserSubject, Salt} = useStorePersist();

  if (!Salt && !UserSubject) {
    return null
  }

  if (item.parentId) {
    let todoItem = todos.items.find(i => i.id === item.parentId);
    if (!todoItem) {
      return null;
    }

    todoItem.subTasks = todoItem.subTasks?.filter(i => i.id !== item.id);
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

  const newTodos = todos.items.filter(i => i.id !== item.id)
  todoSetter({items: newTodos})
  UpdateList(UserSubject, Salt, {items: newTodos})

  return null;
}

// Edit
export function HandleEdit(formData: TodoFormData, item: TodoItem, UserSubject: string, Salt: string, todos: TodoList, todoSetter: React.Dispatch<React.SetStateAction<TodoList>>) {
  if (!Salt && !UserSubject) {
    return null
  }

  UpdateItemInList(formData, UserSubject, Salt, item, todos, todoSetter);
}

// interface EditProps {
//   formData: TodoFormData;
//   item: TodoItem;
//   todos: TodoList;
//   todoSetter: React.Dispatch<React.SetStateAction<TodoList>>
// }
// export const HandleEdit: FC<EditProps> = ({formData, item, todos, todoSetter}) => {
//   const {UserSubject, Salt} = useStorePersist();
//
//   if (!Salt && !UserSubject) {
//     return null
//   }
//
//   UpdateItemInList(formData, UserSubject, Salt, item, todos, todoSetter);
//
//   return null
// }

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
  if (!Salt && !UserSubject) {
    return todos
  }

  const updatedItem = {...item, completed: !item.completed}
  const updatedTodos = {...todos, items: todos.items.map(i => i.id === item.id ? updatedItem : i) }
  UpdateList(UserSubject, Salt, todos)

  return updatedTodos
}

