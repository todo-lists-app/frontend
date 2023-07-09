import React, {FC, FormEvent, useState} from "react";
import {Box, Button, Heading, Text, Input, Select, Textarea, Divider} from "dracula-ui";
import {Container} from "react-bootstrap";

import styles from "./TodoForm.module.css";
import {TodoFormData, TodoItem, TodoList} from "../../lib/todo";
import {DividerLine} from "../DividerLine";
import {Tooltip} from "../Tooltip";
import {HandleAdd, HandleEdit} from "../../lib/ActionHandlers";
import {useStorePersist} from "../../lib/storage";

interface TodoFormProps {
  modalRef?: React.RefObject<HTMLDivElement>;
  cancelCallback?: () => void;
  openCallback?: (isOpen: boolean) => void;
  completeCallback?: (todoItem: TodoItem) => void;

  todoItem?: TodoItem;
  parentItem?: TodoItem;

  todoSetter?: React.Dispatch<React.SetStateAction<TodoList>>
  todos?: TodoList;
  editMode?: boolean;
}

export const TodoForm: FC<TodoFormProps> = ({
                                              openCallback,
                                              todoItem,
                                              parentItem,
                                              cancelCallback,
                                              completeCallback,
                                              todoSetter,
                                              todos,
                                              editMode,
                                              modalRef
}) => {
  const [formError, setFormError] = useState<string | null>(null);
  const {UserSubject, Salt} = useStorePersist();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError(null)

    if (!titleRef.current?.value) {
      setFormError("Title is required");
      return;
    }

    const formData = {
      title: titleRef.current?.value,
      content: contentRef.current?.value,
      dueDate: dueDateRef.current?.value,
      priority: priorityRef.current?.value,
      dueTime: dueTimeRef.current?.value,
      parentId: parentItem?.id,
    } as TodoFormData;
    if (openCallback) {
      openCallback(false);
    }

    if (editMode) {
      if (todoItem && todos && todoSetter) {
        HandleEdit(formData, todoItem, UserSubject, Salt, todos, todoSetter);
        return;
      }
    } else {
      if (todos && todoSetter) {
        const newTodos = HandleAdd(formData, todos, UserSubject, Salt);
        todoSetter(newTodos)
        return;
      }
    }
  }
  const handleCancel = () => {
    if (openCallback) {
      openCallback(false);
    }
    if (cancelCallback) {
      cancelCallback();
    }
  }

  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const contentRef = React.useRef<HTMLTextAreaElement | null>(null);
  const dueDateRef = React.useRef<HTMLInputElement | null>(null);
  const priorityRef = React.useRef<HTMLSelectElement | null>(null);
  const dueTimeRef = React.useRef<HTMLInputElement | null>(null);

  let priorityValue = "low";
  let titleValue = "";
  let contentValue = "";
  let dueDateValue = "";
  let dueTimeValue = "";
  let pageTitle = "Add Item";
  if (todoItem) {
    if (todoItem.priority) {
      priorityValue = todoItem.priority;
    }
    if (todoItem.title) {
      titleValue = todoItem.title;
    }
    if (todoItem.content) {
      contentValue = todoItem.content;
    }
    if (todoItem.dueDate) {
      dueDateValue = todoItem.dueDate;
    }
    if (todoItem.dueTime) {
      dueTimeValue = todoItem.dueTime;
    }
    pageTitle = "Edit Item";
  }
  if (parentItem) {
    pageTitle = "Add Subtask";
  }

  return (
    <Container ref={modalRef}>
      <Box className={styles.formBox} p="sm" color="purpleCyan" rounded="lg">
        <Heading>{pageTitle}</Heading>
        {formError && (
          <Box color="red" borderColor="red" rounded="sm" p="sm" m="sm">
            <Text>{formError}</Text>
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <Container>
            <Input placeholder={"Title"} name={"title"} m={"xs"} ref={titleRef} defaultValue={titleValue} />
            <Textarea placeholder={"Content"} name={"content"} m={"xs"} ref={contentRef} defaultValue={contentValue} />

            <Divider />
            <Select defaultValue={priorityValue} name={"priority"} m={"xs"} title={"Priority"} ref={priorityRef}>
              <option value={"low"} disabled={true}>Optional Priority</option>
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"high"}>High</option>
              <option value={"urgent"}>Urgent</option>
            </Select>

            <DividerLine title={"Due Date"} />
            <Input type={"date"} name={"dueDate"} m={"xs"} title={"Due Date"} ref={dueDateRef} defaultValue={dueDateValue} />
            <Input type={"time"} name={"dueTime"} m={"xs"} title={"dueTime"} ref={dueTimeRef} defaultValue={dueTimeValue} />

            <Box className={styles.formButtons}>
              <Button type="submit" m={"sm"} color={"purple"}>Submit</Button>
              {completeCallback && todoItem && (
                <Button onClick={(e) => {
                  e.preventDefault();
                  completeCallback(todoItem)
                }} m={"sm"} color={"animated"}>Complete</Button>
              )}
              <Button onClick={handleCancel} m={"sm"} color={"red"}>Cancel</Button>
            </Box>
          </Container>
        </form>
      </Box>
    </Container>
  )
}
