import React, {Dispatch, SetStateAction, useState} from "react";
import {arrayBufferToBase64, encryptData, uint8ArrayToBase64} from "../cryption";
import {appConfig} from "../../app.config";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  archived?: boolean;
  dueDate?: string;
  priority?: keyof typeof priorities;
  content?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TodoList {
  items: TodoItem[];
}

export type TodoFormData = {
  title: string;
  content?: string;
  dueDate?: string;
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
  subject: string,
  salt: string,
  todos: TodoList, setTodos: Dispatch<SetStateAction<TodoList>>
) => {
  const todoCount = todos.items.length;

  let newTodo: TodoItem = {
    id: Math.random().toString(36).substring(2, 15),
    title: formData.title,
    content: formData.content,
    dueDate: formData.dueDate,
    priority: formData.priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  setTodos({items: [...todos.items, newTodo]});
  if (todoCount === 0) {
    return CreateList(subject, salt, todos, newTodo);
  }

  return AddToUpdateList(subject, salt, todos, newTodo);
}

const CreateList = (subject: string, salt: string, todos: TodoList, newTodo: TodoItem) => {
  encryptData(subject, salt, {items: [...todos.items, newTodo]}).then((data) => {
      fetch(appConfig.apiURL + `/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Subject': subject,
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

const AddToUpdateList = (subject: string, salt: string, todos: TodoList, newTodo: TodoItem) => {
  return UpdateList(subject, salt, {items: [...todos.items, newTodo]});
}

export const UpdateList = (subject: string, salt: string, todos: TodoList) => {
  encryptData(subject, salt, todos).then((data) => {
    fetch(appConfig.apiURL + `/list`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Subject': subject,
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
