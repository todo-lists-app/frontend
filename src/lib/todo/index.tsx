import React, {Dispatch, SetStateAction} from "react";
import {arrayBufferToBase64, encryptData, uint8ArrayToBase64} from "../cryption";
import {appConfig} from "../../app.config";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: keyof typeof priorities;
  createdAt: string;

  archived?: boolean;
  dueDate?: string;
  dueTime?: string;
  content?: string;
  updatedAt?: string;

  subTasks?: TodoItem[];
  parentId?: string;
}

export interface TodoList {
  items: TodoItem[];
}

export type TodoFormData = {
  id?: string;
  title: string;
  content?: string;
  dueDate?: string;
  dueTime?: string;
  parentId?: string;
  priority?: keyof typeof priorities;
}

export declare const priorities: {
  urgent: string;
  high: string;
  medium: string;
  low: string;
}

export const AddItemToList = (
  formData: TodoFormData,
  accessToken: string,
  subject: string,
  salt: string,
  todos: TodoList,
  setTodos: Dispatch<SetStateAction<TodoList>>
) => {
  const todoCount = todos.items.length;
  if (formData.priority === undefined) {
    formData.priority = "low";
  }

  if (formData.dueTime !== undefined) {
    if (formData.dueDate === undefined) {
      formData.dueDate = new Date().toISOString();
    }
  }

  let newTodo: TodoItem = {
    id: Math.random().toString(36).substring(2, 15),
    title: formData.title,
    content: formData.content,
    dueDate: formData.dueDate,
    dueTime: formData.dueTime,
    priority: formData.priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  setTodos({items: [...todos.items, newTodo]});
  if (todoCount === 0) {
    return CreateList(accessToken, subject, salt, todos, newTodo);
  }

  return AddToUpdateList(accessToken, subject, salt, todos, newTodo);
}

export const UpdateItemInList = (
  formData: TodoFormData,
  accessToken: string,
  subject: string,
  salt: string,
  item: TodoItem,
  todos: TodoList,
  setTodos: Dispatch<SetStateAction<TodoList>>
) => {
  item.title = formData.title
  item.content = formData.content
  if (formData.priority !== undefined) {
    item.priority = formData.priority
  }
  if (formData.dueDate !== undefined) {
    item.dueDate = formData.dueDate
  }
  if (formData.dueTime !== undefined) {
    item.dueTime = formData.dueTime
    if (item.dueDate === undefined) {
      item.dueDate = new Date().toISOString()
    }
  }
  item.updatedAt = new Date().toISOString()
  setTodos({...todos, items: todos.items.map(i => i.id === item.id ? item : i)})
  return UpdateList(accessToken, subject, salt, todos)
}

export const CreateList = (accessToken: string, subject: string, salt: string, todos: TodoList, newTodo: TodoItem) => {
  encryptData(subject, salt, {items: [...todos.items, newTodo]}).then((data) => {
      fetch(appConfig.services.api + `/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Subject': subject,
          'X-User-Access-Token': accessToken,
        },
        body: JSON.stringify({
          data: arrayBufferToBase64(data.data),
          iv: uint8ArrayToBase64(data.iv),
        })
      }).then(res => {
        if (res.status !== 200) {
          throw new Error("CreateList failed")
        }
      })
    }).catch(err => console.log("encrypt error", err));
  return;
}

const AddToUpdateList = (accessToken: string, subject: string, salt: string, todos: TodoList, newTodo: TodoItem) => {
  return UpdateList(accessToken, subject, salt, {items: [...todos.items, newTodo]});
}

export const UpdateList = (accessToken: string, subject: string, salt: string, todos: TodoList) => {
  encryptData(subject, salt, todos).then((data) => {
    fetch(appConfig.services.api + `/list`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Subject': subject,
        'X-User-Access-Token': accessToken,
      },
      body: JSON.stringify({
        data: arrayBufferToBase64(data.data),
        iv: uint8ArrayToBase64(data.iv),
      })
    }).then(res => {
      if (res.status !== 200) {
        throw new Error("UpdateList failed")
      }
    })
  }).catch(err => console.log("encrypt error", err));
}
