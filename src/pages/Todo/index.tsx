import React, {FC, useState, useEffect, Fragment} from "react";
import {useAuth} from "react-oidc-context";
import {Box, Card, Heading, Text, Button, Input} from "dracula-ui";

import {
  encryptData,
  decryptData,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  uint8ArrayToBase64,
  base64ToUint8Array
} from "../../lib/cryption";
import {TodoFormData, TodoItem, TodoList} from "../../lib/todo";
import {appConfig} from "../../app.config";
import {TodoListItem} from "../../components/TodoListItem";
import {AddItem} from "../../components/AddItem";
import {Col, Container, Row} from "react-bootstrap";

export const TodoPage: FC = () => {
  const auth = useAuth();
  const [salt, setSalt] = useState<string | null>(localStorage.getItem('salt') || null);
  const [todos, setTodos] = useState<TodoList>({items: []});
  const [userSubject, setUserSubject] = useState<string>("");

  console.log("appConfig", appConfig);
  console.log("process.env", process.env);

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
                setTodos(decryptedData);
              }).catch(err => console.log("decrypt error", err))
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
    let newTodo: TodoItem = {
      id: Math.random().toString(36).substring(2, 15),
      title: formData.title,
      content: formData.content,
      dueDate: formData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos({items: [...todos.items, newTodo]});
    encryptData(subject, salt, {items: [...todos.items, newTodo]}).then((data) => {
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
        if (res.status === 200) {
          console.log("success")
        }
      })
    }).catch(err => console.log("encrypt error", err));
  }

  return (
    <Box>
      {!salt ? (
        <Box p="lg" borderColor="purple">
          <Heading size="sm">Enter your password</Heading>
          <Text>Enter your password to encrypt/decrypt your todo list</Text>
          <Box display="flex">
            <Input type="password" id="salt" variant="outline" borderSize="md" color="purple" m="sm"/>
            <Button onClick={handleSaltFormSubmit} m="sm">Submit</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Row>
            <Col md={8}>
              <Heading>Todo List</Heading>
            </Col>
          </Row>
          <Row>
            <Col md={1} xl={10}>
              <Fragment>
                {todos.items.length === 0 ? (
                  <Box>
                    <Text size="sm">No items in list</Text>
                  </Box>
                ) : (
                  todos.items.map((item) => (
                    <TodoListItem item={item} key={item.id} />
                  ))
                )}
              </Fragment>
            </Col>
            <Col md={1} xl={2}>
              <AddItem processor={handleAddItem} userSubject={userSubject} userSalt={salt} />
            </Col>
          </Row>
        </Box>
      )}
    </Box>
  );
}
