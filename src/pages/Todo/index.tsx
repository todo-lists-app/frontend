import React, { FC } from "react";
import {useAuth} from "react-oidc-context";
import {TodoItem, TodoList} from "../../lib/todo";

import {
  encryptData,
  decryptData,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  uint8ArrayToBase64,
  base64ToUint8Array
} from "../../lib/cryption";
import {appConfig} from "../../app.config";

export const TodoPage: FC = () => {
  const auth = useAuth();

  if (auth?.user?.profile) {
    let subject = auth?.user?.profile.email || "";
    let salt = auth?.user?.profile.sub || "";

    if (subject !== undefined && subject !== "") {
      fetch(appConfig.apiURL + `/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Subject': subject,
        }
      }).then(res => res.json())
        .then(data => console.log("return data", data))
        .catch(err => console.log("error", err))

      let todos: TodoItem[] = [
  {
    id: '1',
    title: 'Todo Item 1',
    completed: true,
    dueDate: new Date('2023-06-01'),
    content: 'This is the content for Todo Item 1',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-05-02'),
  },
  {
    id: '2',
    title: 'Todo Item 2',
    completed: false,
    createdAt: new Date('2023-05-02'),
  },
  {
    id: '3',
    title: 'Todo Item 3',
    completed: true,
    dueDate: new Date('2023-06-02'),
    content: 'This is the content for Todo Item 3',
    createdAt: new Date('2023-05-02'),
    updatedAt: new Date('2023-05-03'),
  },
  {
    id: '4',
    title: 'Todo Item 4',
    completed: false,
    createdAt: new Date('2023-05-03'),
  },
  {
    id: '5',
    title: 'Todo Item 5',
    completed: true,
    dueDate: new Date('2023-06-03'),
    content: 'This is the content for Todo Item 5',
    createdAt: new Date('2023-05-03'),
    updatedAt: new Date('2023-05-04'),
  },
  {
    id: '6',
    title: 'Todo Item 6',
    completed: false,
    createdAt: new Date('2023-05-04'),
  },
  {
    id: '7',
    title: 'Todo Item 7',
    completed: true,
    dueDate: new Date('2023-06-04'),
    content: 'This is the content for Todo Item 7',
    createdAt: new Date('2023-05-04'),
    updatedAt: new Date('2023-05-05'),
  },
  {
    id: '8',
    title: 'Todo Item 8',
    completed: false,
    createdAt: new Date('2023-05-05'),
  },
  {
    id: '9',
    title: 'Todo Item 9',
    completed: true,
    dueDate: new Date('2023-06-05'),
    content: 'This is the content for Todo Item 9',
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-05-06'),
  },
  {
    id: '10',
    title: 'Todo Item 10',
    completed: false,
    createdAt: new Date('2023-05-06'),
  },
];

      let todoList: TodoList = {
        items: todos
      }
      console.log("todoList", todoList)

      encryptData(subject, salt, todoList).then((data) => {
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
        }).then(res => res.json())
          .then(ret => {
            let data = base64ToArrayBuffer(ret.data);
            let iv = base64ToUint8Array(ret.iv);

            decryptData(subject, salt, data, iv).then((data) => {
              console.log("decrypted", data);
            })

            console.log("return create data", data)
          })
          .catch(err => console.log("error", err))
      });
    }
  }

  return (
    <div>
      <h1>Todo!</h1>
    </div>
  );
}
