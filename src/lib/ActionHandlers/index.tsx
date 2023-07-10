import React, {FC, useState, useEffect, Fragment, useMemo} from "react";
import {
  CreateList,
  TodoFormData,
  TodoItem,
  TodoList,
  UpdateItemInList,
  UpdateList
} from "../todo";
import {useStorePersist} from "../storage";

// Add Item
export function HandleAdd(formData: TodoFormData, todos: TodoList, accessToken: string, UserSubject: string, Salt: string) {
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

  let addedTodos = {...todos}
  if (formData.parentId) {
    const parentIndex = todos.items.findIndex(i => i.id === formData.parentId)
    if (parentIndex !== -1) {
      const parentTodo = {...todos.items[parentIndex]}
      newTodo.parentId = formData.parentId
      parentTodo.subTasks = parentTodo.subTasks ? [...parentTodo.subTasks, newTodo] : [newTodo]
      addedTodos.items = [...todos.items.slice(0, parentIndex), parentTodo, ...todos.items.slice(parentIndex + 1)];
    } else {
      addedTodos = {...todos, items: todos.items.concat(newTodo)}
    }
  } else {
    addedTodos = {...todos, items: todos.items.concat(newTodo)}
  }

  if (todos.items.length === 0) {
    CreateList(accessToken, UserSubject, Salt, todos, newTodo);
  } else {
    UpdateList(accessToken, UserSubject, Salt, addedTodos)
  }

  return addedTodos
}

export function HandleArchive(item: TodoItem, todos: TodoList, accessToken: string, UserSubject: string, Salt: string) {
  function archiveItemAndSubtasks(i: TodoItem): TodoItem {
    if (i.id === item.id) {
      // If this is the item to be archived, archive it and all its subtasks
      const updatedItem = {...i, archived: !i.archived};
      if (updatedItem.subTasks) {
        updatedItem.subTasks = updatedItem.subTasks.map(archiveItemAndSubtasks);
      }
      return updatedItem;
    } else if (i.subTasks) {
      // If this item has subtasks, check them for the item to be archived
      return {...i, subTasks: i.subTasks.map(archiveItemAndSubtasks)};
    } else {
      // If this item is not the one to be archived and has no subtasks, return it as is
      return i;
    }
  }

  const updatedTodos = {
    ...todos,
    items: todos.items.map(archiveItemAndSubtasks),
  };

  UpdateList(accessToken, UserSubject, Salt, updatedTodos);

  return updatedTodos;
}


// Delete
export function HandleDelete(item: TodoItem, todos: TodoList, accessToken: string, UserSubject: string, Salt: string) {
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
    UpdateList(accessToken, UserSubject, Salt, {items: newTodos})

    return {items: newTodos}
  }

  const newTodos = todos.items.filter(i => i.id !== item.id)
  UpdateList(accessToken, UserSubject, Salt, {items: newTodos})

  return {items: newTodos};
}

// Edit
export function HandleEdit(formData: TodoFormData, item: TodoItem, accessToken: string, UserSubject: string, Salt: string, todos: TodoList, todoSetter: React.Dispatch<React.SetStateAction<TodoList>>) {
  if (!Salt && !UserSubject) {
    return null
  }

  UpdateItemInList(formData, accessToken, UserSubject, Salt, item, todos, todoSetter);
}

// Complete
export function HandleComplete(item: TodoItem, todos: TodoList, accessToken: string, UserSubject: string, Salt: string) {
  function completeItemAndSubtasks(i: TodoItem): TodoItem {
    if (i.id === item.id) {
      // If this is the item to be archived, archive it and all its subtasks
      const updatedItem = {...i, completed: !i.completed};
      if (updatedItem.subTasks) {
        updatedItem.subTasks = updatedItem.subTasks.map(completeItemAndSubtasks);
      }
      return updatedItem;
    } else if (i.subTasks) {
      // If this item has subtasks, check them for the item to be archived
      return {...i, subTasks: i.subTasks.map(completeItemAndSubtasks)};
    } else {
      // If this item is not the one to be archived and has no subtasks, return it as is
      return i;
    }
  }

  const updatedTodos = {
    ...todos,
    items: todos.items.map(completeItemAndSubtasks),
  };

  UpdateList(accessToken, UserSubject, Salt, updatedTodos);

  return updatedTodos;
}

